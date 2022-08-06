import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { userContext } from '../contextApis/UserdetailsContext'

const Nav = () => {
    const location = useLocation();
    const [user, setUser, who, setWho, newmsg, setNewmsg] = useContext(userContext)
    const [activelink, setActivelink] = useState('')
    const clickFunc = () => {
        var elements = document.getElementsByClassName('navbar-links')
        for (let i = 0; i < elements.length; i++) {
            elements[i].classList.toggle('active');
        }
    }
    const logoutFunc = () => {
        let name = "authtoken"
        let value = ''
        console.log(user)
        document.cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);
        setUser('')
    }
    return (
        <div>
            <nav className="navbar">
                <div className="brand-title"><Link to='/' onClick={() => {
                    setActivelink('home')
                }}>GM</Link></div>
                <button className="toggle-button" onClick={clickFunc}>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </button>
                <div className="navbar-links">
                    <ul>
                        {!(user === '' || user === undefined) && <li id={activelink === 'profile' ? 'active-link' : ''}> <Link to='/profile' onClick={() => {
                            setActivelink('profile')
                            const url = 'http://localhost:8000/user/calib'
                            fetch(url, {
                                method: 'GET',
                                headers: {
                                    'content-type': 'application/json',
                                    'authtoken': user
                                }
                            }).then(res => res.json())
                                .then(data => {
                                    setNewmsg(0)
                                }).catch(err => console.log(err))
                        }}> Profile{newmsg !== 0 && <span className='msg-calib'>{newmsg}</span>}</Link> </li>}
                        {!(user === '' || user === undefined) && <li id={activelink === 'sendmoney' ? 'active-link' : ''}> <Link to='/sendmoney' onClick={() => {
                            setActivelink('sendmoney')
                        }}> Send Money</Link> </li>}
                        {(who === "Lender") && <li id={activelink === 'getbarrowers' ? 'active-link' : ''}> <Link to='/getbarrowers' onClick={() => {
                            setActivelink('getbarrowers')
                        }}> Borrowers</Link> </li>}
                        {(who === 'Barrower') && <li id={activelink === 'money' ? 'active-link' : ''}> <Link to='/updatemoney' onClick={
                            () => {
                                setActivelink('money')
                            }
                        }> Money</Link> </li>}
                        {(location.pathname === '/') && <li> <a href='#footer'> Calculator</a></li>}
                        {!(user === '' || user === undefined) && <li id='login' onClick={logoutFunc}> <Link to='/'> Logout</Link> </li>}
                        {(user === '' || user === undefined) && (location.pathname === '/') && <li id={activelink === 'about' ? 'active-link' : ''}> <a href='#about-1' onClick={() => {
                            setActivelink('about')
                        }}> About</a> </li>}
                        {(user === '' || user === undefined) && <li id='login'> <Link to='/login' onClick={() => {
                            setActivelink('login')
                        }}> Login</Link> </li>}
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default Nav
