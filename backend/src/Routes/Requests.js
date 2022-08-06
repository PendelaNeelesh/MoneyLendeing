const router = require('express').Router();
const Lender = require("../Models/Lender")
const Barrower = require("../Models/Barrower")
const authenticate = require('./verifyTokens')
router.get('/barrower/:barmail&:rate&:span', authenticate, async (req, res) => {
    if (req.user.who == "Barrower") return res.json({ "message": "Invalid Request" })
    const user = await Barrower.findOne({ "mail": req.params.barmail })
    if (user == null) return res.json({ "message": "User dosent exist" })
    if (req.user.balance < user.money) return res.json({ "message": "No proper balance" })
    let temp = user.request || []
    let messages = [...temp, {
        "from": req.user.mail,
        "rate": req.params.rate,
        "span": req.params.span
    }]
    let messages2 = temp.filter(ele => !(ele.from === req.user.mail && ele.rate === req.params.rate && ele.span === req.params.span))
    if ((temp.length !== messages2.length)) return res.json({
        "message": "Request already sent"
    })
    const updateUser = await Barrower.updateOne({ "mail": req.params.barmail }, {
        $set: {
            "request": messages
        }
    })
    const lenuser = await Lender.findOne({ 'mail': req.user.mail })
    let xyz = [...lenuser.messages, `Request sent to the user with mail ${req.params.barmail}`]
    console.log(xyz)
    const abc = await Lender.updateOne({ 'mail': req.user.mail }, {
        $set: {
            'messages': xyz
        }
    })
    res.json({ "message": "success" })
})

router.get('/lender/:lendmail&:stat&:rate&:span', authenticate, async (req, res) => {
    console.log('here')
    if (req.user.who == "Lender") return res.json({ "message": "Invalid Request" })
    const user = await Lender.findOne({ "mail": req.params.lendmail })
    var messages = []
    if (req.params.stat === 'Accept') messages = [...user.messages, `${req.user.mail} has accepted your offer you can send him ${req.user.money} at an intrest of ${req.params.rate}% per annum, for a span of ${req.params.span} months`]
    else messages = [...user.messages, `We are sorry that the user ${req.user.mail} rejected your request for a amount with an intrest of ${req.params.rate}% per annum, for a span of ${req.params.span} months`]
    const updateUser = await Lender.updateOne({ "mail": req.params.lendmail }, {
        $set: {
            'messages': messages
        }
    })
    const me = await Barrower.findOne({ 'mail': req.user.mail })
    let reqs = me.request.filter(ele => !(ele.from === req.params.lendmail && ele.rate === req.params.rate && ele.span === req.params.span))
    let tmp = me.request.length - reqs.length
    const meUpdat = await Barrower.updateOne({ 'mail': req.user.mail }, {
        $set: {
            'request': reqs,
            'nomessages': me.nomessages - tmp
        }
    })
    return res.json({
        "message": "success"
    })
})



module.exports = router