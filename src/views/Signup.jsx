import React, {  useState } from 'react'

import { userService } from '../services/userService'
import { googleLogout } from '@react-oauth/google';
import {  useDispatch, useSelector } from 'react-redux'
import {  signup } from '../store/actions/user.actions';
import { Link,  useNavigate } from 'react-router-dom';
// import { GoogleLoginBtn } from '../cmps/GoogleLoginBtn';
import { XSvg } from '../svgs/XSvg';
export function SignupPage({from,closeModal}) {

    const [user, setUser] = useState(userService.getEmptyUser())
    const [googleUser, setGoogleUser] = useState()

    const dispatch = useDispatch()
    const navigate = useNavigate()
 
 


   const onSignup =  (ev) => {
        ev.preventDefault()
        ev.stopPropagation()
        dispatch(signup(user))
        navigate('/')
   }
    const handleChange = ({ target }) => {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'range':
                value = +value
                break;
            case 'checkbox':
                value = target.checked
                break;
        }
        setUser((prevUser) => ({ ...prevUser, [field]: value }))
    }
    if (!user) return (<div>Loading...</div>)
    const { fname, email, password } = user
    const imgUrl = `https://res.cloudinary.com/dii16awkb/image/upload/v1684522130/signgupSvg_hawhuc.webp`
    
    return (
        <section className='signup-container flex-jc'>
            {closeModal? <div onClick={closeModal} className='close-btn'><XSvg/></div>:''}
            <form  className='signup-form flex'  onSubmit={onSignup}>
            <h3 className="signin-title">{from === 'shopping-cart'?'רישום קצר וממשיכים':"הרשם והתחל ללמוד"}</h3>

                <label htmlFor="fname">
                    <input value={fname} onChange={handleChange} className="sign-in-input" required type="text" name="fname" id="fname" placeholder="שם מלא" />
                </label>
                <label htmlFor="email">
                    <input value={email} onChange={handleChange} className="sign-in-input" required type="email" name="email" id="email" placeholder="אימייל" />
                </label>
                <label htmlFor="password">
                    <input value={password} onChange={handleChange} className="sign-in-input" required type="password" name="password" id="password" placeholder="בחר סיסמא" />
                </label>
                <button className="sign-in-btn">הרשם</button>
           
                <br/>
                <p className=' is-register flex-jc-ac'> משתמש רשום? <Link to='/login'> התחבר</Link></p>
                
                </form>

        </section>
    )
}
