import './Login.scss'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Input from '../Input/Input'

function Login() {
    const navigate = useNavigate()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [isMounted, setIsMounted] = useState(false)

    const handleSubmit = () => {}

    const handleNavigateSignUp = () => {
        navigate('/signup')
    }

    useEffect(() => {
        setIsMounted(true)
    }, [])

    return (
        <>

            <div className="Login-background">
                <div className={`Login-roll ${!isMounted ? 'Login-roll-close' : ''}`}>
                    <div className="Login-head-roll"></div>
                    <div className="Login-container">
                        <div className="Login-text">Login</div>
                        <Input
                            value={username}
                            label='username'
                            type='text'
                            icon=''
                            setData={setUsername}
                            onSubmit={handleSubmit}
                        />
                        <Input
                            value={password}
                            label='password'
                            type='password'
                            icon=''
                            setData={setPassword}
                            onSubmit={handleSubmit}
                        />
                        <div className="Login-forgot-pass">forgot password?</div>
                        <button className='Login-submit'>Login</button>
                        <div className="Login-to-signup">Dont have an account? <span onClick={handleNavigateSignUp}>Create one here!</span></div>
                    </div>
                    <div className="Login-bottom-roll"></div>
                </div>
            </div>
        </>
    )
}

export default Login