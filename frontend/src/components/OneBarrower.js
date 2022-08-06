import React, { useState, useContext } from 'react'
import '../css/barrower.css'
import { userContext } from '../contextApis/UserdetailsContext'

const OneBarrower = ({ name, phone, mail, money }) => {
    const [user] = useContext(userContext)
    const [rate, setRate] = useState(0)
    const [period, setPeriod] = useState(0)
    return (
        <div className='barrower-cnt'>
            <div className='name-cnt'>{name}</div>
            <div className='money1-cnt'>{money}</div>
            <div className='mail-cnt' onClick={() => {
                window.open(`mailto:${mail}`)
            }}>{mail}</div>
            <div className='phone-cnt' onClick={() => {
                window.open(`tel:${phone}`)
            }}>{phone}</div>
            <div id={`send-req-form-${mail}`} className='render-click'>
                <input className='reg-input-field' placeholder='rate' onChange={(e) => {
                    setRate(e.target.value)
                }} />
                <input className='reg-input-field' placeholder='period' onChange={(e) => {
                    setPeriod(e.target.value)
                }} />
                <button className='reg-btn' className='get-margin' onClick={(e) => {
                    e.preventDefault();
                    fetch(`http://localhost:8000/request/barrower/${mail}&${rate}&${period}`, {
                        method: 'GET',
                        headers: { 'authtoken': user }
                    }).then(res => res.json())
                        .then(data => {
                            if (data.message === "success") window.alert("Request sent, wait for the response")
                            else if (data.message === "No proper balance") window.alert('In sufficient balance')
                            else if (data.message === "Request already sent") window.location.reload()
                            else window.alert('Please log-in again')
                            document.getElementById(`send-req-form-${mail}`).style.display = 'none'
                            document.getElementById(`req-btn-${mail}`).style.display = 'block'
                        })
                }}>Submit</button>
                <button className='reg-btn' className='get-margin' onClick={() => {
                    document.getElementById(`send-req-form-${mail}`).style.display = 'none'
                    document.getElementById(`req-btn-${mail}`).style.display = 'block'
                }}>Close</button>
            </div>
            <button className='send-req-btn' id={`req-btn-${mail}`} onClick={() => {
                document.getElementById(`send-req-form-${mail}`).style.display = 'flex'
                document.getElementById(`req-btn-${mail}`).style.display = 'none'
            }}>Make Req</button>
        </div>
    )
}

export default OneBarrower
