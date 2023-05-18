const verifyRoles = (...allowRoles) => {
    return (req, res, next) => {
        if (!req?.roles) return res.sendStatus(401);
        const allowRoleArray = [...allowRoles];
        const result = req.roles.map(role => allowRoleArray.includes(role)).find(val => val === true);
        if (!result) return res.sendStatus(401);
        next();
    }
}

module.exports = verifyRoles;