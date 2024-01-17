import './SignUp.scss'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Input from '../Input/Input'

function SignUp() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("")
    const [isMounted, setIsMounted] = useState(false);

    const handleSubmit = () => { };

    const handleNavigateLogin = () => {
        setIsMounted(false)
        setTimeout(() => {
            navigate("/login");
        }, 500);
    };

    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsMounted(true);
        }, 750);

        return () => {
            clearTimeout(timeout)
        }
    }, []);

    return (
        <>
            <div className="Login-background">
                <div className={`Login-roll`}>
                    <div className="Login-container-wrapper">
                        <div className="Login-head-roll"></div>
                        <div
                            className={`Sign-up-container ${!isMounted ? "Sign-up-roll-close" : "Sign-up-roll-open"}`}>
                            <div className="Login-text">Sign Up</div>
                            <Input
                                value={username}
                                label="username"
                                type="text"
                                icon=""
                                setData={setUsername}
                                onSubmit={handleSubmit}
                            />
                            <Input
                                value={password}
                                label="password"
                                type="password"
                                icon=""
                                setData={setPassword}
                                onSubmit={handleSubmit}
                            />
                            <Input
                                value={repeatPassword}
                                label='repeat password'
                                type='password'
                                icon=''
                                setData={setRepeatPassword}
                                onSubmit={handleSubmit}
                            />
                            <button className='Login-submit'>Sign Up</button>
                            <div className="Login-to-signup">Already had an account? <span onClick={handleNavigateLogin}>Login here!</span></div>
                        </div>
                        <div className="Login-bottom-roll"></div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SignUp