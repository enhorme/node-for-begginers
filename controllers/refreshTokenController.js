const usersDB = {
    users:require('../model/users.json'),
    setUsers: function (data) {
        this.users = data
    }
}

const jwt = require('jsonwebtoken')
require('dotenv').config();


const handleRefreshToken = (req,res) => {
     const cookies = req.cookies
    if(!cookies?.jwt) return res.sendStatus(401)

    const refreshToken = cookies.jwt

    const foundUser = usersDB.users.find(person=>person.refreshToken === refreshToken)
      console.log(foundUser)

    if(!foundUser) return res.sendStatus(403)

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err,decoded) => {
            if(err || decoded.userName !== foundUser.userName)   return res.sendStatus(403)
            const accessToken = jwt.sign(
                {userName:decoded.userName},
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn:'50s'});
            res.json({accessToken})
        }
    )

};

module.exports = {handleRefreshToken}