function lenderPost() {
    const url = "http://localhost:8000/user/lender"

    var user = [{
        who: "lender",
        mail: "pendelaabc",
        pass: "Pendela@123",
        phone: 9381695916,
        pincode: 522007,
        credScore: 900,
        address: "Guntur 123",
        fname: "Pendela",
        lname: "abc",
        age: 25,
        sex: "M",
        pan: "DFGH234Y",
        aadhar: 123456789

    }]
    fetch(url, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ "User": user })
    }).then(res => {
        console.log(res)
    }).catch(err => {
        console.log(err)
        console.log("Err happened")
    })
}

function borrPost() {
    const url = "http://localhost:8000/user/add-barrower"

    var user = [{
        who: "barrower",
        mail: "pendelac@gmail.com",
        pass: "Pendela@123",
        phone: 9381675916,
        pincode: 522006,
        credScore: 910,
        address: "Guntur 1234",
        fname: "Pendela",
        lname: "abc",
        age: 25,
        sex: "M",
        pan: "DFGH233Y",
        aadhar: 123456789

    }]
    fetch(url, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ "User": user })
    }).then(res => {
        console.log(res)
    }).catch(err => {
        console.log(err)
        console.log("Err happened")
    })
}

function transac() {
    const url = "http://localhost:8000/transac/sendmoney"
    fetch(url, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            fromMail: "pendelaneelesh@gmail.com",
            toMail: "pendelac@gmail.com",
            pass: "Pendela@123",
            amount: 100
        })
    }).then(res => {
        console.log(res)
    }).catch(err => {
        console.log(err)
    })
}

function login() {
    const url = "http://localhost:8000/user/login"
    fetch(url, {
        origin: "https://localhost:8000",
        method: "POST",
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
            "mail": "pendelaneelesh@gmail.com",
            pass: "Pendela@123"
        })
    }).then(res => res.json())
        .then(data => {
            let name = "authtoken"
            let value = data.authtoken
            document.cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);
        })
        .catch(err => console.log(err))
}

function getcookie() {
    const url = "http://localhost:8000/user/getcookie"
    fetch(url, { method: "GET" }).then(res => console.log(res)).catch(err => console.log(err))
}