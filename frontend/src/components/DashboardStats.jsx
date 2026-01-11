function DashboardStats({ tasks }) {
  const total = tasks.length;
  const completed = tasks.filter(t => t.status === "COMPLETED").length;
  const pending = total - completed;

  const progress = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div className="dashboard">
      <div className="stat-card total">
        <h4>Total Tasks</h4>
        <p>{total}</p>
      </div>

      <div className="stat-card completed">
        <h4>Completed</h4>
        <p>{completed}</p>
      </div>

      <div className="stat-card pending">
        <h4>Pending</h4>
        <p>{pending}</p>
      </div>

      <div className="progress-box">
        <span>Progress</span>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
        <small>{progress}% completed</small>
      </div>
    </div>
  );
}

export default DashboardStats;
