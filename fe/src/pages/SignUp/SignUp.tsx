import "./SignUp.scss";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/common/Input/Input";
import { signup } from "../../api/auth";
import Button from "../../components/common/Button/Button";

function SignUp() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [linkFB, setLinkFB] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  const handleSubmit = async () => {
    if (password != repeatPassword) {
      alert("mat khau phai nhu nhau");
    }
    const response = await signup(username, password, linkFB);
    response.json().then((data) => {
      if (response.status === 200) {
        localStorage.setItem("userData", JSON.stringify(data));
        console.log("them thanh cong");
        navigate("/login");
      } else {
        console.log("ko thanh cong");
      }
    });
  };

  const handleNavigateLogin = () => {
    setIsMounted(false);
    setTimeout(() => {
      navigate("/login");
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
              className={`Sign-up-container ${
                !isMounted ? "Sign-up-roll-close" : "Sign-up-roll-open"
              }`}
            >
              <div className="Login-text">Sign Up</div>
              <Input
                value={username}
                label="Username"
                type="text"
                icon=""
                setData={setUsername}
                onSubmit={handleSubmit}
              />
              <Input
                value={linkFB}
                label="Link Facebook"
                type="text"
                icon=""
                setData={setLinkFB}
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
              <Input
                value={repeatPassword}
                label="Repeat password"
                type="password"
                icon=""
                setData={setRepeatPassword}
                onSubmit={handleSubmit}
              />
              <Button label="Sign Up" type="chit" onSubmit={handleSubmit}/>
              <div className="Login-to-signup">
                Already had an account?{" "}
                <span onClick={handleNavigateLogin}>Login here!</span>
              </div>
            </div>
            <div className="Login-bottom-roll"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;
