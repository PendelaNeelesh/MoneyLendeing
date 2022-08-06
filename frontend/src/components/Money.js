import React, { useState, useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { userContext } from "../contextApis/UserdetailsContext"
import "../css/money.css"

const Money = () => {
    const history = useHistory();
    const [user] = useContext(userContext)
    const [money, setMoney] = useState(0)
    useEffect(() => {
        document.getElementById('footer').style.display = 'none'
        return () => {
            document.getElementById('footer').style.display = 'flex'
        }
    }, [])
    return (
        <div className='money-cnt'>
            <div className='money-text'>From here you can change the money you requested while registration.</div>
            <input className='reg-input-field' id='money-1' placeholder='Money to be requested' onChange={(e) => {
                setMoney(e.target.value)
            }} />
            <div className='btn-div'>
                <button className='update-btn' onClick={() => {
                    fetch('http://localhost:8000/user/increasemymoney', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                            'authtoken': user
                        },
                        body: JSON.stringify({
                            "money": money
                        })
                    }).then(res => res.json())
                        .then(data => {
                            if (data.message === "Updated") history.push('/transacsuccess')
                            else if (data.message === "Invalid Request") window.alert("Invalid Request")
                            else {
                                window.alert('Please login again')
                                history.push('/login')
                            }
                        }).catch(err => {
                            window.alert('Please login again')
                            history.push('/login')
                        })
                }}>Update</button>
            </div>
        </div>
    )
}

export default Money
