import React, { useState } from 'react'
import { Login_User } from '../../services/SignUp/service'

export const SignUp = () => {
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")

    const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }
    const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    const submitData = async () => {
        const response = await Login_User({
            email: email,
            password: password
        })

        console.log(response)
    }

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
    }

    const 
    return (
        <form action="submit" onSubmit={onSubmit}>
            <label htmlFor="email">Email:</label>
            <input name="email" type="email" onChange={onEmailChange} value={email}/>
            <label htmlFor="password">Password</label>
            <input name="password" type="password" value={password} onChange={onPasswordChange}/>
            <button onSubmit={onSubmit}>Submit</button>
        </form>
    )
}
