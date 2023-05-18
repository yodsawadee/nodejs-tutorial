const usersDB = {
    users: require('../model/users.json'),
    setUsers: function (data) { this.users = data }
}
const jwt = require('jsonwebtoken');
require('dotenv').config();

const handleRefreshToken = (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    console.log(cookies.jwt);
    const refreshToeken = cookies.jwt;

    const foundUser = usersDB.users.find(person => person.refreshToeken === refreshToeken);
    if (!foundUser) return res.sendStatus(403); // forbidden

    // evaluate jwt
    jwt.verify(
        refreshToeken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || foundUser.username !== decoded.username) return res.sendStatus(403);
            const roles = Object.values(foundUser.roles);
            const accessToeken = jwt.sign(
                { 
                    "UserInfo" : {
                        "username": decoded.username,
                        "roles": roles
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '30s' }
            )
            res.json({ accessToeken});
        }
    )
}

module.exports = { handleRefreshToken };