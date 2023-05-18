const User = require('../model/User');

const handleLogout = async (req, res) => {
    // On client, also delete the accessToken

    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204); // no content
    const refreshToken = cookies.jwt;

    // is refreshToken in db
    const foundUser = await User.findOne({ refreshToken }).exec();
    if (!foundUser) {
        // secure: true - remove out if testing within Thunser Client (only serves on https)
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None' });
        return res.sendStatus(204);
    }

    // delete refreshToken from db
    foundUser.refreshToken = '';
    const result = await foundUser.save();
    console.log(result);

    // secure: true - remove out if testing within Thunser Client (only serves on https)
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None' });
    res.sendStatus(204);
}

const handleLocalLogout = async (req, res) => {
    // On client, also delete the accessToken

    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204); // no content
    const refreshToken = cookies.jwt;

    // is refreshToken in db
    const foundUser = usersDB.users.find(person => person.refreshToken === refreshToken);
    if (!foundUser) {
        // secure: true - remove out if testing within Thunser Client (only serves on https)
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None' });
        return res.sendStatus(204);
    }

    // delete refreshToken from db
    const otherUsers = usersDB.users.filter(person => person.refreshToken !== foundUser.refreshToken);
    const currentUsers = { ...foundUser, refreshToken: '' };
    usersDB.setUsers([...otherUsers, currentUsers]);
    await fsPromises.writeFile(path.join(__dirname, '..', 'model', 'users.json'), JSON.stringify(usersDB.users));
    console.log(usersDB.users);

    // secure: true - remove out if testing within Thunser Client (only serves on https)
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None' });
    res.sendStatus(204);
}

module.exports = { handleLogout, handleLocalLogout };