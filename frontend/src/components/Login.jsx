import { useState } from "react";
import toast from "react-hot-toast";

function Login({ onLogin, onSwitchToRegister, onAdminClick }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!email || !password) {
      toast.error("Please enter email and password");
      return;
    }

    // Call the onLogin prop with email and password
    if (onLogin) {
      onLogin({ email, password });
    }
  };

  return (
    <div className="login-wrapper">

      {/* 🔥 ADMIN BUTTON */}
      <div className="admin-btn-top">
        <button className="btn-admin" onClick={onAdminClick}>
          Admin
        </button>
      </div>

      <div className="login-layout">

        <div className="login-card">
          <h2>Welcome Back 👋</h2>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button onClick={handleLogin}>Login</button>

          <p className="register-text">
            Don’t have an account?
            <span className="register-link" onClick={onSwitchToRegister}>
              {" "}Register
            </span>
          </p>
        </div>

        <div className="login-image">
          <img
            src="https://img.freepik.com/free-vector/secure-login-concept-illustration_114360-4320.jpg"
            alt="Login"
          />
        </div>

      </div>
    </div>
  );
}

export default Login;
