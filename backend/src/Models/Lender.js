const mongoose = require('mongoose')
const Schema = mongoose.Schema



const lender = new Schema({
    who: {
        type: String,
        default: "Lender"
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
        type: String,
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
        type: String,
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
        type: String,
        required: true
    },
    nomessages: {
        type: Number,
        default: 0
    },
    request: {
        type: Array,
        default: []
    }

}, { timestamps: true });

const Lender = mongoose.model('Lender', lender);

module.exports = Lender;


