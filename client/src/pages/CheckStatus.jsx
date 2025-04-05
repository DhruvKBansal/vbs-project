import { useState } from "react";
import axios from "axios";

function CheckStatus() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null);
  const [error, setError] = useState("");

  const handleCheckStatus = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/check-status", { email });
      setStatus(res.data);
      setError("");
    } catch (err) {
      setStatus(null);
      setError("No booking found");
    }
  };

  const handleCancelTicket = async () => {
    try {
      await axios.post("http://localhost:5000/api/cancel-ticket", { email });
      setStatus({ ...status, status: "Cancellation Requested" });
    } catch (err) {
      setError("Error submitting cancellation request");
    }
  };

  return (
    <div>
      <h2>Check Booking Status</h2>
      <form onSubmit={handleCheckStatus}>
        <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <button type="submit">Check Status</button>
      </form>
      {status && (
        <div>
          <p>Your trip is: {status.trip} ({status.status})</p>
          {status.status !== "Cancellation Requested" && <button onClick={handleCancelTicket}>Cancel My Ticket</button>}
        </div>
      )}
      {error && <p>{error}</p>}
    </div>
  );
}

export default CheckStatus; 