import { useState } from "react";
import { registerUser } from "../api/userApi";
import toast from "react-hot-toast";
import "./Login.css"; // SAME CSS reuse

function Register({ onSwitchToLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    if (!name || !email || !password) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      await registerUser({ name, email, password });
      toast.success("Registration successful ✅");
      onSwitchToLogin();
    } catch (err) {
      console.error(err);
      toast.error("Registration failed ❌");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-layout">

        {/* LEFT – REGISTER CARD */}
        <div className="login-card">
          <h2>Create Account ✨</h2>
          <p>Register to start managing tasks</p>

          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

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

          <button onClick={handleRegister}>Register</button>

          <p className="register-text">
            Already have an account?
            <span
              className="register-link"
              onClick={onSwitchToLogin}
            >
              {" "}Login
            </span>
          </p>
        </div>

        {/* RIGHT – IMAGE */}
        <div className="login-image">
          <img
            src="https://img.freepik.com/free-vector/sign-up-concept-illustration_114360-7965.jpg"
            alt="Register Illustration"
          />
        </div>

      </div>
    </div>
  );
}

export default Register;
