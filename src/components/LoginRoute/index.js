import { Component } from "react";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";
import "./index.css";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

class LoginRoute extends Component {
  state = {
    username: "",
    password: "",
    loginError: false,
    errorMsg: "",
    isShow: false,
  };

  onChangeUsername = (event) => {
    this.setState({ username: event.target.value });
  };

  onChangePassword = (event) => {
    this.setState({ password: event.target.value });
  };

  onLoginSuccess = (jwtToken) => {
    Cookies.set("jwt_token", jwtToken, { expires: 30, path: "/" });
    // No need for history, just set state to trigger re-render
    this.setState({ loginError: false });
  };

  onLoginError = (errorMsg) => {
    this.setState({ loginError: true, errorMsg });
  };

  onSubmitLoginForm = async (event) => {
    event.preventDefault();
    const { username, password } = this.state;
    const userDetails = { username, password };
    const loginUrl = "https://apis.ccbp.in/login";
    const options = {
      method: "POST",
      body: JSON.stringify(userDetails),
    };
    const response = await fetch(loginUrl, options);
    const data = await response.json();
    if (response.ok === true) {
      this.onLoginSuccess(data.jwt_token);
    } else {
      this.onLoginError(data.error_msg);
    }
  };

  onClickToShowPassword = () => {
    const { isShow } = this.state;
    this.setState({ isShow: !isShow });
  };

  render() {
    const { username, password, loginError, errorMsg, isShow } = this.state;
    const jwtToken = Cookies.get("jwt_token");

    // Redirect to home if the user is already logged in
    if (jwtToken !== undefined) {
      return <Navigate to="/" />;
    }

    return (
      <div className="login-app-container">
        <form
          className="login-form"
          onSubmit={this.onSubmitLoginForm}
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="login-logo"
          />
          <div className="input-container">
            <label htmlFor="username" className="label">
              USERNAME
            </label>
            <input
              id="username"
              value={username}
              placeholder="Username"
              className="input-username"
              type="text"
              onChange={this.onChangeUsername}
            />
            <br />
            <label htmlFor="password" className="label">
              PASSWORD
            </label>

            {isShow ? (
              <div className="password-input-container">
                <input
                  id="password"
                  value={password}
                  type="text"
                  placeholder="Password"
                  onChange={this.onChangePassword}
                  className="input-username"
                />
                <FaEyeSlash onClick={this.onClickToShowPassword} />
              </div>
            ) : (
              <div className="password-input-container">
                <input
                  id="password"
                  value={password}
                  type="password"
                  placeholder="Password"
                  onChange={this.onChangePassword}
                />
                <FaEye onClick={this.onClickToShowPassword} />
              </div>
            )}
            <button type="submit" className="login-btn">
              Login
            </button>
            {loginError && <p className="error-msg">*{errorMsg}</p>}
          </div>
        </form>
      </div>
    );
  }
}

export default LoginRoute;
