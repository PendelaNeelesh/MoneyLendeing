const router = require('express').Router()
const authenticate = require('./verifyTokens')
const bcrypt = require('bcryptjs')
const Lender = require("../Models/Lender")
const Barrower = require("../Models/Barrower")
router.post('/sendmoney', authenticate, (req, res) => {

})

router.post('/reqmoney', authenticate, async (req, res) => {
    // input format 
    // {
    //     amount
    //     token as header
    // }
    if (req.user.who == 'Lender') {
        try {
            const user = await Lender.findOne({ "mail": req.user.mail })
            const inmessage = [...user.in]
            const balance = user.balance
            const message = user.messages
            message.push(`Added ${req.body.amount} to your account`)
            inmessage.push({
                "from": "Admin",
                "Amount": `${req.body.amount}`,
                "on": new Date()
            })
            const userUpdate = await Lender.updateOne({ "_id": req.user._id }, {
                $set: {
                    "in": inmessage,
                    "messages": message,
                    "balance": Number(balance) + Number(req.body.amount)
                }
            })
            return res.json({
                "message": "Amount added"
            })
        } catch (err) {
            console.log(err)
            return res.json({
                "message": "Please try again"
            })
        }
    } else {
        try {
            const user = await Barrower.findOne({ "mail": req.user.mail })
            const inmessage = [...user.in]
            const balance = user.balance
            const message = user.messages
            message.push(`Added ${req.body.amount} to your account`)
            inmessage.push({
                "from": "Admin",
                "Amount": `${req.body.amount}`,
                "on": new Date()
            })
            const userUpdate = await Barrower.updateOne({ "_id": req.user._id }, {
                $set: {
                    "in": inmessage,
                    "messages": message,
                    "balance": Number(balance) + Number(req.body.amount)
                }
            })
            return res.json({
                "message": "Amount added"
            })
        } catch (err) {
            console.log(err)
            return res.json({
                "message": "Please try again"
            })
        }
    }
})

router.post('/withdraw', authenticate, async (req, res) => {
    // input format: {
    //     token as header,
    //     amount
    // }
    if (req.user.who == "Lender") {
        try {
            const user = await Lender.findOne({ "_id": req.user._id })
            if (user.balance < req.body.amount) {
                return res.json({
                    "message": "No required balance",
                    "balance": user.balance
                })
            } else {
                const out = [...user.out, {
                    "to": "Account",
                    "amount": `${req.body.amount}`,
                    "on": new Date()
                }]
                const message = [...user.messages, `You withdrew ${req.body.amount} on ${new Date()}`]
                const balance = Number(user.balance) - Number(req.body.amount)
                const updateUser = await Lender.updateOne({ "_id": req.user._id }, {
                    $set: {
                        "out": out,
                        "messages": message,
                        "balance": balance
                    }
                })
                return res.json({
                    "message": "success"
                })
            }

        } catch (err) {
            console.log(err)
            return res.json({
                "message": "Please try again"
            })
        }
    } else {
        const user = await Barrower.findOne({ "_id": req.user._id })
        if (user.balance < req.body.amount) {
            return res.json({
                "message": "No required balance",
                "balance": user.balance
            })
        } else {
            const out = [...user.out, {
                "to": "Account",
                "amount": `${req.body.amount}`,
                "on": new Date()
            }]
            const message = [...user.messages, `You withdrew ${req.body.amount} on ${new Date()}`]
            const balance = Number(user.balance) - Number(req.body.amount)
            const updateUser = await Barrower.updateOne({ "_id": req.user._id }, {
                $set: {
                    "out": out,
                    "messages": message,
                    "balance": balance
                }
            })
            return res.json({
                "message": "success"
            })
        }
    }
})

router.post('/exchange', authenticate, async (req, res) => {
    console.log("here")
    const u1 = await Lender.findOne({ 'mail': req.user.mail })
    console.log('u1 complete')
    const u2 = await Barrower.findOne({ 'mail': req.user.mail })
    console.log("u2 complete")
    const u3 = await Lender.findOne({ 'mail': req.body.mail })
    console.log("u3 complete")
    const u4 = await Barrower.findOne({ 'mail': req.body.mail })
    console.log("u4 complete")
    if (u4 === null && u3 === null) return res.json({ "message": "Req user dosent exist" })
    if (u1 === null && u2 === null) return res.json({ "message": "User dosent exist" })
    var to = u3 || u4
    var from = u1 || u2
    var amnt = req.body.amount
    var pass = req.body.pass
    const validPass = bcrypt.compareSync(pass, from.pass)
    console.log(`From sendmoney, user ${validPass}`)
    if (!validPass) return res.json({ "message": "Invalid password" })
    if (from.balance < amnt) return res.json({ "message": "Insufficent balance" })
    if (from.who === 'Lender' && to.who !== 'Lender') {
        const cut = await Lender.updateOne({ 'mail': req.user.mail }, {
            $set: {
                'balance': Number(u1.balance) - Number(amnt),
                'messages': [...u1.messages, `Sent money to ${req.body.mail} on ${new Date()}`],
                'out': [...u1.out, {
                    "to": req.body.mail,
                    "amount": amnt,
                    "on": new Date()
                }]
            }
        })
        const add = await Barrower.updateOne({ 'mail': req.body.mail }, {
            $set: {
                'balance': Number(u4.balance) + Number(amnt),
                'messages': [...u4.messages, `Received a total of ${amnt} from ${req.user.mail} on ${new Date()}`],
                'in': [...u4.in, {
                    "from": req.user.mail,
                    "Amount": amnt,
                    "on": new Date()
                }]
            }
        })
        console.log('Lender -> Barrower')
        return res.json({ "message": "success" })
    } if (from.who === 'Lender' && to.who === 'Lender') {
        const cut = await Lender.updateOne({ 'mail': req.user.mail }, {
            $set: {
                'balance': u1.balance - amnt,
                'messages': [...u1.messages, `Sent money to ${req.body.mail} on ${new Date()}`],
                'out': [...u1.out, {
                    "to": req.body.mail,
                    "amount": amnt,
                    "on": new Date()
                }]
            }
        })
        const add = await Lender.updateOne({ 'mail': req.body.mail }, {
            $set: {
                'balance': Number(u3.balance) + Number(amnt),
                'messages': [...u3.messages, `Received a total of ${amnt} from ${req.user.mail} on ${new Date()}`],
                'in': [...u3.in, {
                    "from": req.user.mail,
                    "Amount": amnt,
                    "on": new Date()
                }]
            }
        })
        console.log('Lender=> Lender')
        return res.json({ "message": "success" })
    } if (from.who !== 'Lender' && to.who === 'Lender') {
        const cut = await Barrower.updateOne({ 'mail': req.user.mail }, {
            $set: {
                'balance': u2.balance - amnt,
                'messages': [...u2.messages, `Sent money to ${req.body.mail} on ${new Date()}`],
                'out': [...u2.out, {
                    "to": req.body.mail,
                    "amount": amnt,
                    "on": new Date()
                }]
            }
        })
        const add = await Lender.updateOne({ 'mail': req.body.mail }, {
            $set: {
                'balance': Number(u3.balance) + Number(amnt),
                'messages': [...u3.messages, `Received a total of ${amnt} from ${req.user.mail} on ${new Date()}`],
                'in': [...u3.in, {
                    "from": req.user.mail,
                    "Amount": amnt,
                    "on": new Date()
                }]
            }
        })
        console.log('Barrower-> Lender')
        return res.json({ "message": "success" })
    } if (from !== 'Lender' && to !== 'Lender') {
        const cut = await Barrower.updateOne({ 'mail': req.user.mail }, {
            $set: {
                'balance': u2.balance - amnt,
                'messages': [...u2.messages, `Sent money to ${req.body.mail} on ${new Date()}`],
                'out': [...u2.out, {
                    "to": req.body.mail,
                    "amount": amnt,
                    "on": new Date()
                }]
            }
        })
        const add = await Barrower.updateOne({ 'mail': req.body.mail }, {
            $set: {
                'balance': Number(u4.balance) + Number(amnt),
                'messages': [...u4.messages, `Received a total of ${amnt} from ${req.user.mail} on ${new Date()}`],
                'in': [...u4.in, {
                    "from": req.user.mail,
                    "Amount": amnt,
                    "on": new Date()
                }]
            }
        })
        console.log('Barrower->Barrower')
        return res.json({ "message": "success" })
    }
})
module.exports = router