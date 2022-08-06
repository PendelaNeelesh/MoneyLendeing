import React, { useState, useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { userContext } from '../contextApis/UserdetailsContext'
import '../css/Home.css'
import Calculators from '../calculators/Calculators'
const Home = () => {
    const history = useHistory();
    const [user, setUser, who, setWho] = useContext(userContext)
    return (
        <div className='main-home'>
            <div className="home-container">
                <div className='img-cnt'>
                    <div className='img'></div>
                </div>
                <div className='reg-cnt'>
                    <div className='register-text'>Register As</div>
                    <div className='reg-btns-cnt'>
                        <button className='reg-btns' id='lend-btn' onClick={
                            () => {
                                history.push('/lendreg')
                            }
                        }>Lender</button>
                        <button className='reg-btns' id='bar-btn' onClick={() => {
                            history.push('/barreg')
                        }}>Borrower</button>
                    </div >
                </div>
                <div id='about-1' className='about-cnt'>
                    <div className='about-text'><b>About Us</b> <br />  <br /> <br /><br /></div>We at GM always try to help you with your loan calculations and ease your process of loan giving/getting. GM Calculators are world class and provide accurate output to help its users.
                    GM's Main goal is to reduce the interest rates as much as possible so that maximum participation can be seen from the borrowers. We value money and try
                    to make sure that the our organization does anything to help out its users because we know that every single rupee counts.
                </div>
                <div id='about-2' className='about-cnt'>
                    <br /> <br />GM(Get/Give Money)is one of the most popular peer to peer lending platforms in the modern times with the most number of users and highest rating among all its peers.
                    GM makes sure that the creditworthy borrowers acquire loans at a lower interest and that the trustworthy lenders get higher returns.
                    The main motto The GM team is always ready to help people out to understand the platform, understand the process of loan giving/loan getting.
                    GM is one of the easiest applications to use, people can easily give/get loans without the intervention of banks or any other traditional Thank You .
                </div>
                <div className='cal-img'>

                </div>
            </div >
            <div className='cal-cnts'>
                <Calculators />
            </div>
        </div>
    )
}

export default Home
