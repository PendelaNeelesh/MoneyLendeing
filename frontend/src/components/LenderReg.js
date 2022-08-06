import React from 'react'
import '../css/reg.css'
import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
const LenderReg = () => {
    const history = useHistory();
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [pincode, setPincode] = useState('')
    const [address, setAddress] = useState('')
    const [age, setAge] = useState('')
    const [sex, setSex] = useState('')
    const [pan, setPan] = useState('')
    const [aadhar, setAadhar] = useState('')
    const [accno, setAccno] = useState('')
    const [mail, setMail] = useState('')
    const [pass, setPass] = useState('')
    const [cnfpass, setcnfPass] = useState('')
    return (
        <div className='reg-bar-cnt'>
            <div className='reg-bar-form-cnt'>
                <div className='reg-text-div'>Lender Register</div>
                <form className='reg-bar-form'>
                    <div className='reg-bar-form-set'>
                        <div id='err-cnt' className='err-sent'></div>
                        <input className='reg-input-field' placeholder='name' type='text' onChange={(e) => {
                            setName(e.target.value)
                        }} /> </div>
                    <div className='reg-bar-form-set'>
                        <input className='reg-input-field' placeholder='mail' type='text' onChange={(e) => {
                            setMail(e.target.value)
                        }} /> </div>
                    <div className='reg-bar-form-set'>
                        <input className='reg-input-field' placeholder='password' type='password' onChange={(e) => {
                            setPass(e.target.value)
                        }} /> </div>
                    <div className='reg-bar-form-set'>
                        <input className='reg-input-field' placeholder="Confirm Password" type='password' onChange={(e) => {
                            setcnfPass(e.target.value)
                        }} />
                        <div className='err-sent' id='pass-err'></div></div>
                    <div className='reg-bar-form-set'>
                        <div id='phone-err' className='err-sent'> </div>
                        <input className='reg-input-field' placeholder='phone' type='text' onChange={(e) => {
                            if (e.target.value.length !== 10) document.getElementById('phone-err').innerHTML = 'inValid Phone number'
                            else document.getElementById('phone-err').innerHTML = ''
                            setPhone(e.target.value)
                        }} /> </div>
                    <div className='reg-bar-form-set'>
                        <input className='reg-input-field' placeholder='Pincode' type='text' onChange={(e) => {
                            setPincode(e.target.value)
                        }} /> </div>
                    <div className='reg-bar-form-set'>
                        <input className='reg-input-field' placeholder='Address' type='text' onChange={(e) => {
                            setAddress(e.target.value)
                        }} /> </div>
                    <div className='reg-bar-form-set'>
                        <div id="age-err" className='err-sent'></div>
                        <input className='reg-input-field' placeholder='age' type='number' onChange={(e) => {
                            if (e.target.value < 18) document.getElementById('age-err').innerHTML = "Min Age is 18"
                            else document.getElementById('age-err').innerHTML = ''
                            setAge(e.target.value)
                        }} /> </div>
                    <div className='reg-bar-form-set'>
                        <input className='reg-input-field' placeholder='sex' type='text' onChange={(e) => {
                            setSex(e.target.value)
                        }} /> </div>
                    <div className='reg-bar-form-set'>
                        <input className='reg-input-field' placeholder='pan' type='text' onChange={(e) => {
                            setPan(e.target.value)
                        }} /> </div>
                    <div className='reg-bar-form-set'>
                        <input className='reg-input-field' placeholder='Aadhar' type='text' onChange={(e) => {
                            setAadhar(e.target.value)
                        }} /> </div>
                    <div className='reg-bar-form-set'>
                        <input className='reg-input-field' placeholder='AccNO' type='text' onChange={(e) => {
                            setAccno(e.target.value)
                        }} /> </div>
                    <div className='reg-submit-btn'>
                        <button className='reg-btn' onClick={(e) => {
                            e.preventDefault();
                            if (pass !== cnfpass) {
                                document.getElementById('pass-err').innerHTML = 'pass and cnfpass should be same'
                                setTimeout(() => {
                                    document.getElementById('pass-err').innerHTML = ''
                                }, 5000)
                            } else {
                                const url = 'http://localhost:8000/user/lender'
                                fetch(url, {
                                    method: 'POST',
                                    headers: { 'content-type': 'application/json' },
                                    body: JSON.stringify({
                                        'name': name,
                                        'mail': mail,
                                        'pass': pass,
                                        'phone': phone,
                                        'pincode': pincode,
                                        'address': address,
                                        'age': age,
                                        'sex': sex,
                                        'pan': pan,
                                        'aadhar': aadhar,
                                        'accno': accno
                                    })
                                }).then(res => res.json())
                                    .then(data => {
                                        if (data.message === 'Created') {
                                            document.getElementById('sucess').innerHTML = 'Login to Continue, Redirecting...'
                                            setTimeout(() => {
                                                history.push('/login')
                                            }, 5000)
                                        } else {
                                            document.getElementById('err-cnt').innerHTML = data.message
                                            setTimeout(() => {
                                                document.getElementById('err-cnt').innerHTML = ''
                                            }, 7000);
                                        }
                                    }).catch(err => {
                                        document.getElementById('err-cnt').innerHTML = 'Some thing went wrong, try again'
                                    })
                            }
                        }}>Submit</button>
                    </div>
                </form>
                <div className='register-cnt'>
                    <div id='sucess'></div>
                    <div className='form-message'>Have an account? Login Here</div>
                    <div className='no-acc-btn'><Link to='/login'>Login</Link></div>
                </div>
            </div>
        </div>
    )
}

export default LenderReg
