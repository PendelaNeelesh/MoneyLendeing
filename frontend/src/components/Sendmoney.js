import React, { useContext, useEffect, useState } from 'react'
import { userContext } from '../contextApis/UserdetailsContext'
import { useHistory } from 'react-router-dom';

const Sendmoney = () => {
    const history = useHistory();
    const [user] = useContext(userContext)
    const [mail, setmail] = useState('')
    const [pass, setpass] = useState('')
    const [amount, setAmount] = useState('')
    return (
        <div className='login-cnt'>
            <div className='login-form-cnt'>
                <form className='form'>
                    <div id='err-cnt'></div>
                    <div className='form-set'>
                        <label className='label-field'>Receiver Mail</label>
                        <input className='input-field' type='text' onChange={(e) => {
                            setmail(e.target.value)
                        }} /> </div>
                    <div className='form-set'>
                        <label className='label-field'>Your-Password</label>
                        <input className='input-field' type='password' onChange={(e) => {
                            setpass(e.target.value)
                        }} /> </div>
                    <div className='form-set'>
                        <label className='label-field'>Amount</label>
                        <input className='input-field' type='number' onChange={(e) => {
                            setAmount(e.target.value)
                        }} /> </div>
                    <div className='submit-btn'>
                        <button className='login-btn' onClick={(e) => {
                            e.preventDefault();
                            fetch('http://localhost:8000/transac/exchange', {
                                method: 'POST',
                                headers: {
                                    'content-type': 'application/json',
                                    'authtoken': user
                                },
                                body: JSON.stringify({
                                    "mail": mail,
                                    "pass": pass,
                                    "amount": amount
                                })
                            }).then(res => res.json())
                                .then(data => {
                                    if (data.message === "Acess Denied") {
                                        window.alert('Please Login again')
                                        history.push('/login')
                                    } else {
                                        history.push('/transacSuccess')
                                    }
                                })
                                .catch(err => {
                                    window.alert('Please Login again')
                                    history.push('/login')
                                    console.log(err)
                                })
                        }}>Send</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Sendmoney
