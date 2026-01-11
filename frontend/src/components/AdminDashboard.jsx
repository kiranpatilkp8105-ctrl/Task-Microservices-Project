import { useEffect, useState } from "react";
import {
  getAllUsers,
  updateUser,
  deleteUser,
} from "../api/userApi";
import toast from "react-hot-toast";
import "./Admin.css";

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);

  const loadUsers = async () => {
    const res = await getAllUsers();
    setUsers(res.data);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleUpdate = async () => {
    try {
      await updateUser(editUser.id, editUser);
      toast.success("User updated");
      setEditUser(null);
      loadUsers();
    } catch {
      toast.error("Update failed");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this user?")) return;

    try {
      await deleteUser(id);
      toast.success("User deleted");
      loadUsers();
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="admin-wrapper">
      <h2>Admin Panel 👑</h2>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>
                <button onClick={() => setEditUser(u)}>Edit</button>
                <button className="danger" onClick={() => handleDelete(u.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* EDIT MODAL */}
      {editUser && (
        <div className="modal">
          <div className="modal-card">
            <h3>Edit User</h3>

            <input
              value={editUser.name}
              onChange={(e) =>
                setEditUser({ ...editUser, name: e.target.value })
              }
            />
            <input
              value={editUser.email}
              onChange={(e) =>
                setEditUser({ ...editUser, email: e.target.value })
              }
            />

            <button onClick={handleUpdate}>Save</button>
            <button className="danger" onClick={() => setEditUser(null)}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
