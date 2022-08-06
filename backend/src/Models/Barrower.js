const mongoose = require('mongoose')
const Schema = mongoose.Schema



const barrower = new Schema({
    who: {
        type: String,
        default: "Barrower"
    },
    mail: {
        type: String,
        required: true,
        unique: true
    },
    pass: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    pincode: {
        type: Number,
        required: true
    },
    credScore: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true
    },
    sex: {
        type: String,
        required: true,
    },
    pan: {
        type: String,
        required: true,
    },
    aadhar: {
        type: Number,
        required: true,
    },
    balance: {
        type: Number,
        default: 0
    },
    in: {
        type: Array,
        default: []
    },
    out: {
        type: Array,
        default: []
    },
    messages: {
        type: Array,
        default: ["Welcome to the site, search for Lenders/Barrowers from us"]
    },
    accno: {
        type: Number,
        required: true
    },
    money: {
        type: Number,
        default: 0
    },
    nomessages: {
        type: Number,
        default: 0
    },
    request: {
        type: Array,
        default: []
    },
    purpose: {
        type: String,
        required: true
    }

}, { timestamps: true });

const Barrower = mongoose.model('Barrower', barrower);

module.exports = Barrower;


