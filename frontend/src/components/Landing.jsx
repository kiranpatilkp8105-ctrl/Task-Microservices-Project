function Landing({ onUserLogin, onAdminLogin }) {
  return (
    <div className="welcome-wrapper">
      <div className="welcome-card">
        <h1>Task Management System</h1>
        <p>Select how you want to continue</p>

        <button className="btn-primary" onClick={onUserLogin}>
          Login as User
        </button>

        <button className="btn-danger" onClick={onAdminLogin}>
          Login as Admin
        </button>
      </div>
    </div>
  );
}

export default Landing;
