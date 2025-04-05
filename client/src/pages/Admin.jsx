import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Admin() {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }

    axios
      .get("http://localhost:5000/api/admin/data", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => setData(res.data))
      .catch(() => {
        localStorage.removeItem("token");
        navigate("/");
      });
  }, [navigate]);

  return (
    <div>
      <h2>Admin Dashboard</h2>
      {data ? <p>Welcome, {data.user}!</p> : <p>Loading...</p>}
      <button onClick={() => { localStorage.removeItem("token"); navigate("/"); }}>Logout</button>
    </div>
  );
}

export default Admin;
