const usersDB = {
    users: require('../model/users.json'),
    setUsers: function (data) { this.users = data }
}
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fsPromises = require('fs').promises;
const path = require('path');

const handleLogin = async (req, res) => {
    const { user, pwd } = req.body;
    if (!user || !pwd) return res.status(400).json({ 'message': 'Username and Password are required.' });
    const foundUser = usersDB.users.find(person => person.username === user);
    if (!foundUser) return res.sendStatus(401); // unauthorized

    // evaluate password
    const math = await bcrypt.compare(pwd, foundUser.password);
    if (math) {
        const roles = Object.values(foundUser.roles);
        // create JWTs
        const accessToken = jwt.sign(
            { 
                "UserInfo" : {
                    "username": foundUser.username,
                    "roles": roles
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '30s' }
        )
        const refreshToken = jwt.sign(
            { username: foundUser.username },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        )
        // saving refreshToken with current user
        const otherUsers = usersDB.users.filter(person => person.username !== foundUser.username);
        const currentUsers = { ...foundUser, refreshToken };
        usersDB.setUsers([...otherUsers, currentUsers]);
        await fsPromises.writeFile(path.join(__dirname, '..', 'model', 'users.json'), JSON.stringify(usersDB.users));
        console.log(usersDB.users);
        res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });
        res.json({ accessToken });
    } else {
        res.sendStatus(401);
    }
}

module.exports = { handleLogin };