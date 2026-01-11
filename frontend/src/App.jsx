import { useEffect, useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import TaskList from "./components/TaskList";
import AdminDashboard from "./components/AdminDashboard";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const ADMIN_PASSWORD = "admin123";

function App() {
  const [userId, setUserId] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // Restore login on refresh
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUserId = localStorage.getItem("userId");
    if (token && storedUserId) {
      setUserId(Number(storedUserId));
      setIsLoggedIn(true);
    }
  }, []);

  // 🔐 User login
  const handleLogin = async ({ email, password }) => {
    try {
      const res = await axios.post("http://localhost:8085/users/login", { email, password });
      localStorage.setItem("token", "dummy"); // optional, just for refresh persistence
      localStorage.setItem("userId", res.data.id || res.data.userId || email); // save userId
      setUserId(res.data.id || res.data.userId || 1);
      setIsLoggedIn(true);
      toast.success("Login successful ✅");
    } catch (err) {
      toast.error("Invalid credentials ❌");
    }
  };

  // 🔐 Admin login
  const handleAdminLogin = () => {
    const pwd = prompt("Enter Admin Password");
    if (!pwd) return;

    if (pwd === ADMIN_PASSWORD) {
      setIsAdmin(true);
      toast.success("Admin access granted");
    } else {
      toast.error("Invalid admin password");
    }
  };

  // 🚪 Logout
  const logout = () => {
    localStorage.clear();
    setUserId(null);
    setIsLoggedIn(false);
    setIsAdmin(false);
  };

  if (isAdmin) return <AdminDashboard onLogout={logout} />;

  if (!isLoggedIn) {
    return (
      <>
        <Toaster />
        {showRegister ? (
          <Register onSwitchToLogin={() => setShowRegister(false)} />
        ) : (
          <Login
            onLogin={handleLogin}
            onSwitchToRegister={() => setShowRegister(true)}
            onAdminClick={handleAdminLogin}
          />
        )}
      </>
    );
  }

  return (
    <>
      <Toaster />
      <div className="app-wrapper">
        <div className="header">
          <h2>Task Manager</h2>
          <button className="btn-danger" onClick={logout}>
            Logout
          </button>
        </div>
        <TaskList userId={userId} />
      </div>
    </>
  );
}

export default App;
