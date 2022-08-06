const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
    console.log('To verify')
    const token = req.header('authtoken');
    if (!token) return res.json({ "message": "Acess Denied" })

    try {
        const verified = jwt.verify(token, "qwerty1!#%$25f6fu7^*7fudyv8ggvc")
        req.user = verified;
        console.log(verified)
        next()
    } catch (err) {
        return res.json({ "message": "Acess Denied" })
    }
}