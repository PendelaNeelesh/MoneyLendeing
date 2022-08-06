import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import { userContext } from '../contextApis/UserdetailsContext'
import '../css/Login.css'

const Login = () => {
    const history = useHistory();
    const [user, setUser] = useContext(userContext)
    const [mail, setmail] = useState('')
    const [pass, setpass] = useState('')

    return (
        <div className='login-cnt'>
            <div className='login-form-cnt'>
                <div className='text-div'>Login</div>
                <form className='form'>
                    <div id='err-cnt'></div>
                    <div className='form-set'>
                        <label className='label-field'>Email</label>
                        <input className='input-field' type='text' onChange={(e) => {
                            setmail(e.target.value)
                        }} /> </div>
                    <div className='form-set'>
                        <label className='label-field'>Password</label>
                        <input className='input-field' type='password' onChange={(e) => {
                            setpass(e.target.value)
                        }} /> </div>
                    <div className='submit-btn'>
                        <button className='login-btn' onClick={(e) => {
                            e.preventDefault();
                            const url = "http://localhost:8000/user/login"
                            fetch(url, {
                                method: "POST",
                                headers: { 'content-type': 'application/json' },
                                body: JSON.stringify({
                                    "mail": mail,
                                    "pass": pass
                                })
                            }).then(res => res.json())
                                .then(data => {
                                    if (data.message === "Mail or Password is wrong") document.getElementById('err-cnt').innerHTML = 'Mail or Password is wrong'
                                    else {
                                        let name = "authtoken"
                                        let value = data.authtoken
                                        document.cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);
                                        setUser(data.authtoken)
                                        history.push('/')
                                    }
                                })
                                .catch(err => console.log(err))
                        }}>Login</button>
                    </div>
                </form>
                <div className='register-cnt'>
                    <div className='form-message'>Don't have account? Register Here</div>
                    <div className='no-acc-btn'><Link to='/lendreg'>Lender</Link></div>
                    <div className='no-acc-btn'><Link to='/barreg'>Borrower</Link></div>
                </div>
            </div>
        </div>
    )
}

export default Login
