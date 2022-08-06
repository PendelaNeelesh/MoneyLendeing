//Package imports
const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
//Written Code Imports
const Lender = require("../Models/Lender")
const Barrower = require("../Models/Barrower")
const { lenderRegisterValidation, barrowerRegisterValidation, loginValidation } = require("../validation")
const authtoken = require("./verifyTokens")

//Routes
const router = express.Router();


router.post('/lender', async (req, res) => {
    //Validation
    console.log(req.body)
    const { error } = lenderRegisterValidation(req.body)
    if (error) return res.json({ "message": error.details[0].message })
    //Check unique
    const existUser = await Lender.findOne({ mail: req.body.mail })
    const existUser1 = await Barrower.findOne({ mail: req.body.mail })
    if (existUser != null || existUser1 != null) return res.json({ "message": "User exists" })

    //Hash Password
    const salt = await bcrypt.genSalt(10)
    const hashPass = bcrypt.hashSync(req.body.pass, salt)

    //Saving user
    const data = { ...req.body }
    data.pass = hashPass
    const user = new Lender(data)
    try {
        const saveUser = await user.save()
        return res.json({ "message": "Created" })
    } catch (err) {
        res.json({ "message": "Try again" })
    }
})


router.post('/barrower', async (req, res) => {
    //Validation
    const { error } = barrowerRegisterValidation(req.body)
    if (error) {
        return res.json({ "message": error.details[0].message })
    }

    //Check unique
    const existUser = await Barrower.findOne({ mail: req.body.mail })
    const existUser1 = await Lender.findOne({ mail: req.body.mail })
    if (existUser != null || existUser1 != null) return res.json({ 'message': 'User Exists' })

    //Hash Password
    const salt = await bcrypt.genSalt(10)
    const hashPass = bcrypt.hashSync(req.body.pass, salt)

    //Saving user
    const data = { ...req.body }
    data.pass = hashPass
    data.credScore = Math.floor((Math.random() * 1000) + 1)
    const user = new Barrower(data)
    try {
        const saveUser = await user.save()
        res.json({
            "message": 'Created'
        })
    } catch (err) {
        res.json({
            'message': 'Please try after some time'
        })
    }
})

router.post('/login', async (req, res) => {
    //Validation
    const { error } = loginValidation(req.body)
    if (error) return res.json({ "message": "Mail or Password is wrong" })
    //Check Existance
    const barrowerExist = await Barrower.findOne({ mail: req.body.mail })
    const lenderExist = await Lender.findOne({ mail: req.body.mail })
    if (!(barrowerExist || lenderExist)) return res.json({ "message": "Mail or Password is wrong" })
    const user = barrowerExist || lenderExist
    //Authorization
    const validPass = bcrypt.compareSync(req.body.pass, user.pass)
    if (!validPass) return res.json({ "message": "Mail or Password is wrong" })

    //Token Generation
    var ncalib = 0
    if (user.who === 'Lender') {
        ncalib = user.messages.length - user.nomessages
    } else {
        ncalib = user.messages.length - user.nomessages + user.request.length
    }
    var token = ''
    if (user.who == "Lender") token = jwt.sign({ _id: user._id, who: user.who, mail: user.mail, balance: user.balance, ncalib: ncalib }, "qwerty1!#%$25f6fu7^*7fudyv8ggvc", { expiresIn: '1h' })
    if (user.who == "Barrower") token = jwt.sign({ _id: user._id, who: user.who, mail: user.mail, money: user.money, ncalib: ncalib, balance: user.balance }, "qwerty1!#%$25f6fu7^*7fudyv8ggvc", { expiresIn: '1h' })
    res.json({
        "authtoken": token
    })
})

router.get('/logout', authtoken, (req, res) => {
    res.json({
        "authtoken": ''
    })
})
router.get('/mymessages', authtoken, async (req, res) => {
    let who = req.user.who
    if (who == "Lender") {
        try {
            const user = await Lender.findOne({ "_id": new mongoose.Types.ObjectId(req.user._id) })
            let messages = user.messages || []
            let requests = user.request || []
            let calib = messages.length + requests.length
            const updateUser = await Lender.updateOne({
                "_id": new mongoose.Types.ObjectId(req.user._id)
            }, { $set: { nomessages: calib } })
            return res.json({
                "messages": messages,
                "requests": requests,
                "mail": user.mail,
                "name": user.name,
                "phone": user.phone,
                "balance": user.balance,
                "in": user.in,
                "out": user.out
            })
        } catch (err) {
            return res.status(404).json({
                "message": "Please try again"
            })
        }
    }
    if (who == "Barrower") {
        try {
            const user = await Barrower.findOne({ "_id": new mongoose.Types.ObjectId(req.user._id) })
            let messages = user.messages || []
            let requests = user.request || []
            console.log(requests)
            let calib = messages.length + requests.length
            const updateUser = await Barrower.updateOne({
                "_id": new mongoose.Types.ObjectId(req.user._id)
            }, { $set: { nomessages: calib } })
            return res.json({
                "messages": messages,
                "requests": requests,
                "mail": user.mail,
                "name": user.name,
                "phone": user.phone,
                "balance": user.balance,
                "in": user.in,
                "out": user.out
            })
        } catch (err) {
            console.log(err)
            return res.status(404).json({
                "message": "Please try again"
            })
        }
    }
})

router.get('/wallet', authtoken, async (req, res) => {
    console.log(req.user)
    if (req.user.who == "Lender") {
        try {
            const user = await Lender.findOne({ _id: new mongoose.Types.ObjectId(req.user._id) })
            return res.json({
                "name": user.name,
                "mail": user.mail,
                "balance": user.balance,
                "in": user.in,
                "out": user.out,
                "accno": user.accno,
                "phone": user.phone
            })
        } catch (err) {
            return res.json({
                "message": "Please try again"
            })
        }
    } else {
        try {
            const user = await Barrower.findOne({ _id: new mongoose.Types.ObjectId(req.user._id) })
            return res.json({
                "name": user.name,
                "mail": user.mail,
                "balance": user.balance,
                "in": user.in,
                "out": user.out,
                "accno": user.accno,
                "phone": user.phone,
                "purpose": user.purpose,
                "credscore": user.credscore,
                "money": user.money
            })
        } catch (err) {
            return res.json({
                "message": "Please try again"
            })
        }
    }
})

router.get('/getcalib', authtoken, async (req, res) => {
    const barrowerExist = await Barrower.findOne({ mail: req.user.mail })
    const lenderExist = await Lender.findOne({ mail: req.user.mail })
    if (!(barrowerExist || lenderExist)) return res.json({ "message": "Mail or Password is wrong" })
    const user = barrowerExist || lenderExist
    var ncalib = 0
    if (user.who === 'Lender') {
        ncalib = user.messages.length - user.nomessages
    } else {
        ncalib = user.messages.length - user.nomessages + user.request.length
    }
    return res.json({
        'ncalib': ncalib
    })

})

router.get('/calib', authtoken, async (req, res) => {
    if (req.user.who === 'Lender') {
        const user = await Lender.findOne({ 'mail': req.user.mail })
        let nomessages = user.messages.length
        Lender.updateOne({ 'mail': req.user.mail }, { $set: { 'nomessages': nomessages } })
            .then(result => {
                return res.json({
                    'succ-message': 'success'
                })
            }).catch(err => {
                return res.json({
                    'messsage': 'Try again'
                })
            })
    } else {
        const user = await Barrower.findOne({ 'mail': req.user.mail })
        let nomessages = user.messages.length + user.request.length
        Barrower.updateOne({ 'mail': req.user.mail }, { $set: { 'nomessages': nomessages } })
            .then(result => {
                return res.json({
                    'succ-message': 'success'
                })
            }).catch(err => {
                return res.json({
                    'messsage': 'Try again'
                })
            })
    }
})
router.get('/clrmsg', authtoken, async (req, res) => {
    if (req.user.who === "Lender") {
        const updateUser = await Lender.updateOne({ 'mail': req.user.mail }, {
            $set: {
                'messages': [`You cleared messages on ${new Date()}`]
            }
        })
        return res.json({ "message": "success" })
    }
    else {
        const updateUser = await Barrower.updateOne({ 'mail': req.user.mail }, {
            $set: {
                'messages': [`You cleared messages on ${new Date()}`]
            }
        })
        return res.json({ "message": "success" })
    }
})
router.get('/getbarrowers', authtoken, async (req, res) => {
    if (req.user.who !== 'Lender') return res.json({ 'data': {} })
    const data = await Barrower.find()
    console.log(data)
    res.json({ "data": data })
})
router.post('/increasemymoney', authtoken, async (req, res) => {
    if (req.user.who === "Lender") return res.json({ "message": "Invalid Request" })
    const user = await Barrower.findOne({ 'mail': req.user.mail })
    const update = await Barrower.updateOne({ 'mail': req.user.mail }, {
        $set: {
            'money': req.body.money,
            'messages': [...user.messages, `Updated the request Amount to ${req.body.money}`]
        }
    })
    return res.json({ "message": "Updated" })
})
module.exports = router