import React, { useState, useEffect, useContext } from 'react'
import { decodeToken, isExpired } from 'react-jwt'
import { userContext } from '../contextApis/UserdetailsContext'
import OneBarrower from './OneBarrower'
import '../css/barrower.css'
const AllBarrowers = () => {
    const [barrowers, setBarrowers] = useState([])
    useEffect(() => {
        document.getElementById('footer').style.display = 'none'
        return () => {
            document.getElementById('footer').style.display = 'flex'
        }
    }, [])
    useEffect(() => {
        document.cookie.split(';').forEach(cook => {
            var name = cook.split('=')
            if (name[0] === ' authtoken') {
                if (name[1] !== '') {
                    if (isExpired(name[1])) {
                        window.alert('Login Again')
                    } else {
                        fetch('http://localhost:8000/user/getbarrowers', {
                            method: 'GET',
                            headers: {
                                'content-type': 'application/json',
                                'authtoken': name[1]
                            }
                        }).then(res => res.json())
                            .then(data => {
                                console.log(data.data)
                                setBarrowers(data.data)
                            }).catch(err => {
                                window.alert(err)
                            })
                    }
                }
            }
        })
    }, [])
    return (
        <div className='barrowers-cnt'>
            {barrowers.length === 0 && <h2> Loading.... </h2>}
            {barrowers.length > 0 && barrowers.map((barrower) => {
                return <OneBarrower key={barrower._id} name={barrower.name} mail={barrower.mail} money={barrower.money} phone={barrower.phone} />
            })}
        </div>
    )
}

export default AllBarrowers
