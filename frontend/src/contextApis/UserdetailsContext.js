import react, { createContext, useState } from 'react'
import { useEffect } from 'react'
import { isExpired, decodeToken } from "react-jwt";
export const userContext = createContext()
export const UserProvider = (props) => {
    const [user, setUser] = useState('')
    const [exflag, setExflag] = useState(0)
    const [who, setWho] = useState('')
    const [newmsg, setNewmsg] = useState(0)
    useEffect(() => {
        let sent = document.cookie.split(';')
        var flag = 0
        var token = ''
        sent.forEach(word => {
            let tok = word.split('=')
            if (tok[0] === " authtoken") {
                flag = 1
                token = tok[1]
            }
        })
        if (flag === 1) {
            setUser(token)
            try {
                if (isExpired(token)) setUser('')
                else {
                    fetch('http://localhost:8000/user/getcalib', {
                        method: 'GET',
                        headers: {
                            "content-type": 'application/json',
                            'authtoken': token
                        }
                    }).then(res => res.json())
                        .then(data => {
                            setNewmsg(data.ncalib)
                        }).catch(err => window.alert(err))
                    if (decodeToken(token).who === 'Lender') {
                        fetch('http://localhost:8000/user/getbarrowers', {
                            method: 'GET',
                            headers: {
                                'content-type': 'application/json',
                                'authtoken': token
                            }
                        })
                    }
                }
                setWho(decodeToken(token).who)
            } catch (err) {
                setWho('')
            }
        }
        setExflag(1)
    }, [])
    useEffect(() => {
        let sent = document.cookie.split(';')
        var flag = 0
        var token = ''
        sent.forEach(word => {
            let tok = word.split('=')
            if (tok[0] === " authtoken") {
                flag = 1
                token = tok[1]
            }
        })
        if (flag === 1) {
            setUser(token)
            try {
                let dtok = decodeToken(token)
                setWho(dtok.who)
                if (dtok.ncalib !== 0) setNewmsg(dtok.ncalib)
            } catch (err) {
                setWho('')
            }
        }
        setExflag(1)
    }, [user, who])
    return (
        <userContext.Provider value={[user, setUser, who, setWho, newmsg, setNewmsg, exflag]}>
            {props.children}
        </userContext.Provider>
    )
}