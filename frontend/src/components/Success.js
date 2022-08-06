import React, { useEffect } from 'react'

import { useHistory } from 'react-router-dom'
import "../index.css"
const Success = () => {
    useEffect(() => {
        document.getElementById('footer').style.display = 'none'
        return () => {
            document.getElementById('footer').style.display = 'flex'
        }
    }, [])
    const history = useHistory();
    return (
        <div className='sucess-cnt'>
            <div className='white-circle'>
                <div className='green-circle' onClick={() => {
                    history.push('/profile')
                }}>Sucess</div>
            </div>
        </div>
    )
}

export default Success
