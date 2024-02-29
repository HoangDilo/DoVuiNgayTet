import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { login } from "../../api/auth";
import { isAdmin } from "../../api/admin";

import Input from "../../components/common/Input/Input";
import Button from "../../components/common/Button/Button";
import { AuthLayoutContext } from "../../layouts/Auth/AuthLayout";

import "./Login.scss";

function Login() {
  const navigate = useNavigate();
  const { isNavigated, setIsNavigated } = useContext(AuthLayoutContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  const handleSubmit = async () => {
    const response = await login(username, password);
    response.json().then((data) => {
      if (response.status === 200) {
        localStorage.setItem("username", data.username);
        setIsMounted(false);
        setTimeout(() => {
          setIsNavigated(true);
        }, 750);
        setTimeout(() => {
          if (!data.isAdmin) navigate("/");
          else navigate("/admin");
        }, 1500);
      }
    });
  };

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

  useEffect(() => {
    const username = localStorage.getItem("username");
    if (username) {
      isAdmin(username).then((rs) => {
        if (rs) {
          navigate("/admin");
        } else {
          navigate("/");
        }
      });
    }
  }, []);

  return (
    <>
      <div className="Login-background">
        <div
          className={`Login-roll ${
            !isNavigated ? "" : "Rotate-90-deg-animation"
          }`}
        >
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
                label="Username"
                type="text"
                icon=""
                setData={setUsername}
                onSubmit={handleSubmit}
              />
              <Input
                value={password}
                label="Password"
                type="password"
                icon=""
                setData={setPassword}
                onSubmit={handleSubmit}
              />
              <div className="Login-forgot-pass">Forgot password?</div>
              <Button label="Login" onSubmit={handleSubmit} />
              <div className="Login-to-signup">
                Dont have an account?{" "}
                <span className="Login-navigate" onClick={handleNavigateSignUp}>
                  Create one here!
                </span>
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
