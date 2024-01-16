import './Login.scss'
import { useState } from 'react';
import Input from '../Input/Input'

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    function handleSubmit() {

    }

    return (
        <>

            <div className="Login-background">
                <div className="Login-roll">
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
                            setData={setUsername}
                            onSubmit={handleSubmit}
                        />
                        <div className="Login-forgot-pass">forgot password?</div>
                        <button className='Login-submit'>Login</button>
                    </div>
                    <div className="Login-bottom-roll"></div>
                </div>
            </div>
        </>
    )
}

export default Login