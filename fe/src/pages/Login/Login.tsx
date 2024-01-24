import "./Login.scss";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/common/Input/Input";
import { login } from "../../api/auth";
import Button from "../../components/common/Button/Button";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  const handleSubmit = () => {};

  const handleNavigateSignUp = () => {
    setIsMounted(false);
    setTimeout(() => {
      navigate("/signup");
    }, 500);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsMounted(true);
    }, 750);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <>
      <div className="Login-background">
        <div className={`Login-roll`}>
          <div className="Login-container-wrapper">
            <div className="Login-head-roll"></div>
            <div
              className={`Login-container ${
                !isMounted ? "Login-roll-close" : "Login-roll-open"
              }`}
            >
              <div className="Login-text">Login</div>
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
              <div className="Login-forgot-pass">forgot password?</div>
              <Button label="Login" type="chit" onSubmit={() => {}}/>
              <div className="Login-to-signup">
                Dont have an account?{" "}
                <span className="Login-navigate" onClick={handleNavigateSignUp}>Create one here!</span>
              </div>
            </div>
            <div className="Login-bottom-roll"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
