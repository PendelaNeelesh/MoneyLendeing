import React, { useState, useEffect } from 'react'
import { isExpired } from 'react-jwt'
import "../css/wallet.css"

const Wallet = () => {
    const [name, setName] = useState('')
    const [mail, setMail] = useState('')
    const [phone, setPhone] = useState('')
    const [balance, setBalance] = useState('')
    const [intran, setIntran] = useState([])
    const [outtran, setOuttran] = useState([])
    const [messages, setMessages] = useState([])
    const [requests, setRequests] = useState([])
    const [amnt, setAmnt] = useState(0)
    const [use, setUse] = useState('')
    var tmp = 0;
    useEffect(() => {
        document.cookie.split(';').forEach(cook => {
            var name = cook.split('=')
            if (name[0] === ' authtoken') {
                if (name[1] !== '') {
                    if (isExpired(name[1])) {
                        window.alert('Login Again')
                    } else {
                        setUse(name[1])
                        fetch('http://localhost:8000/user/mymessages', {
                            method: 'GET',
                            headers: {
                                'content-type': 'application/json',
                                'authtoken': name[1]
                            }
                        }).then(res => res.json())
                            .then(data => {
                                setMessages(data.messages)
                                setRequests(data.requests)
                                setPhone(data.phone)
                                setMail(data.mail)
                                setName(data.name)
                                setBalance(data.balance)
                                setIntran(data.in)
                                setOuttran(data.out)
                                console.log(data.in)
                            }).catch(err => {
                                window.alert(err)
                            })
                    }
                }
            }
        })
    }, [])
    return (
        <div>
            {name === '' && <h2>Loading....</h2>}
            {name !== '' && <div className='wallet-cnt'>
                <div className='line-1-wallet'>
                    <div className='name-phone'><h2>{name}</h2> +91-{phone}</div>
                    <div className='wallet-balance'><div id='special-1'>Balance: {balance}</div></div>
                </div>
                <div className='line-2-wallet'>
                    Messages
                </div>
                <div className='line-3-wallet'>
                    {messages.map(msg => {
                        return <div className='line-3-wallet-child'> {'\u2022'} {msg} </div>
                    })}
                </div>
                {messages.length > 10 && <div id='message-btn' className='req-reject-btn' onClick={() => {
                    fetch('http://localhost:8000/user/clrmsg', {
                        method: 'GET',
                        headers: {
                            'authtoken': use
                        }
                    }).then(res => res.json())
                        .then(data => {
                            if (data.message === "success") window.location.reload();
                        })
                }}>Clear Messages</div>}
                {requests.length > 0 && <div className='line-2-wallet'> Requests </div>}
                {requests.length > 0 && requests.map(request => {
                    return <div className='request-cnt' id={`${request.from}-${request.rate}-${request.span}`}>
                        <div className='request-head'><div id='request'>Request</div></div>
                        <div className='req-frm'>From <b id='mail' onClick={() => {
                            window.open(`mailto:${request.from}`)
                        }}>{request.from}</b></div>
                        <div className='req-frm'>At an intrest of <b>{request.rate}%</b> per annum</div>
                        <div className='req-frm'>For a period of <b>{request.span}</b> months</div>
                        <div className='req-btn-cnt'>
                            <div className='req-accept-btn' onClick={() => {
                                fetch(`http://localhost:8000/request/lender/${request.from}&Accept&${request.rate}&${request.span}`, {
                                    method: 'GET',
                                    headers: { 'authtoken': use }
                                }).then(res => res.json())
                                    .then(data => {
                                        if (data.message === "success") {
                                            window.alert('Respose sent')
                                            document.getElementById(`${request.from}-${request.rate}-${request.span}`).style.display = 'none'
                                        }
                                    })
                            }}> Accept </div>
                            <div className='req-reject-btn' onClick={() => {
                                fetch(`http://localhost:8000/request/lender/${request.from}&Reject&${request.rate}&${request.span}`, {
                                    method: 'GET',
                                    headers: { 'authtoken': use }
                                }).then(res => res.json())
                                    .then(data => {
                                        if (data.message === "success") {
                                            window.alert('Respose sent')
                                            document.getElementById(`${request.from}-${request.rate}-${request.span}`).style.display = 'none'
                                        }
                                    })
                            }}> Reject </div>
                        </div>
                    </div>
                })}
                <div className='line-4-wallet'>Transcations</div>
                <div className='line-5-wallet'>
                    {intran.length > 0 && <h2 className='transac-head'>InFlow</h2>}
                    {intran.map(inp => {
                        return <div className='line-3-wallet-child'>{'\u2022'} Received a total of <b>{inp.Amount}</b> from <b>{inp.from}</b> on <b>{inp.on}</b></div>
                    })}
                </div>
                <div className='line-5-wallet'>
                    {outtran.length > 0 && <h2 className='transac-head-red' >OutFlow</h2>}
                    {outtran.map(inp => {
                        return <div className='line-3-wallet-child'>{'\u2022'} Sent a total of <b>{inp.amount}</b> to <b>{inp.to}</b> on <b>{inp.on}</b></div>
                    })}
                </div>
                {intran.length === 0 && outtran.length === 0 && <div className='line-3-wallet-child'>No Transactions at! </div>}
                <div className='line-4-wallet'>Add or WithDraw money</div>
                <div className='line-6-wallet'>
                    <input className='reg-input-field' id='special' type='number' placeholder='Enter the amount' onChange={(e) => {
                        setAmnt(e.target.value)
                    }} />
                    <div id='bal-err-sub'></div>
                    <button className='add-sub-btn' onClick={(e) => {
                        e.preventDefault();
                        fetch(`http://localhost:8000/transac/reqmoney`, {
                            method: "POST",
                            headers: {
                                'content-type': 'application/json',
                                'authtoken': use
                            },
                            body: JSON.stringify({
                                "amount": amnt
                            })
                        }).then(res => res.json())
                            .then(data => {
                                if (data.message === "Amount added") window.location.reload()
                                else window.alert('Please Login again')
                            }).catch(err => {
                                console.log(err)
                                window.alert('Please login again')
                            })
                    }}>Add Amount</button>
                    <button className='add-sub-btn' onClick={(e) => {
                        e.preventDefault();
                        fetch(`http://localhost:8000/transac/withdraw`, {
                            method: "POST",
                            headers: {
                                'content-type': 'application/json',
                                'authtoken': use
                            },
                            body: JSON.stringify({
                                "amount": amnt
                            })
                        }).then(res => res.json())
                            .then(data => {
                                if (data.message === "success") window.location.reload()
                                else if (data.message === "No required balance") {
                                    document.getElementById('bal-err-sub').innerHTML = `Your balance is only ${data.balance}`
                                }
                                else window.alert('Please Login again')
                            }).catch(err => {
                                console.log(err)
                                window.alert('Please login again')
                            })
                    }}>WithDraw Amount</button>
                </div>
            </div>}
        </div>
    )
}

export default Wallet
