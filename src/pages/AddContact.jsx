import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AddContact() {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        if (!name || !phone) { setError("Name is required"); return; }
        try {
            setLoading(true);
            await axios.post("/api/contacts", { name, phone, email }, {
                headers: {Authorization:`Bearer ${localStorage.getItem("token")}` }
            });
            navigate("/contacts");
        }   catch (err) {
            setError("Failed to add contact");
        }   finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px", fontFamily: "'Segoe UI', sans-serif" }}>
            <div style={{ background: "white",borderRadius: "30px", padding: "50px 40px", width: "100%", maxWidth: "400px", boxShadow: "0 30px 100px rgba(0,0,0,0.3)" }}>
               <button onClick={() => navigate("/contacts")} style={{ background: "none", border: "none", color: "#764ba2", fontWeight: "700", cursor: "pointer", fontSize: "14px", marginBottom: "20px", padding: 0 }}>
                Back to Contacts
               </button>
               <h2 style={{ margin: "0 0 30px", color: "#1a1a2e", fontSize: "24px", fontWeight: "800" }}>Add New Contact</h2>

               {error && <div style={{ background: "#fff0f0", border: "1px solid #ffcccc", borderRadius: "12px", padding: "12px", color: "#e53e3e", fontSize: "14px", marginBottom: "20px" }}>{error}</div>}

               <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: "16px" }}>
                    <label style={{ fontSize: "13px", fontWeight: "600", color: "#555", display: "block", marginBottom: "8px" }}>Full Name *</label>
                    <input type="text" placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} style={{ width: "100%", padding: "14px 16px", borderRadius: "12px", border: "2px solid #e8e8e8", fontSize: "14px", outline: "none", boxSizing: "border-box" }} />  
                </div>
                <div style={{ marginBottom: "30px" }}>
                    <label style={{ fontSize: "13px", fontWeight: "600", color: "#555", display: "block", marginBottom: "8px" }}>Email (optional)</label>
                    <input type="email" placeholder="john@example.com" value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: "100%", padding: "14px 16px", borderRadius: "12px", border: "2px solid #e8e8e8", fontSize: "14px", outline: "none", boxSizing: "border-box" }} />
                </div>
                <div style={{ marginBottom: "16px" }}>
                    <label style={{ fontSize: "13px",fontWeight: "600" }}>Phone</label>
                    <input type="text" placeholder="+254........." value={phone}
                       onChange={e => setPhone(e.target.value)}
                       style={{ width:"100%", padding:"10px", border:"1px solid #ddd",borderRadius: "8px" }}/>
                </div>
                <button type="submit" desabled={loading} style={{ width: "100%", padding: "16px", background: loading ? "#ccc" : "linear-gradient(135deg, #667eea, #764ba2)", colr: "white", border: "none", borderRadius: "14px", fontSize: "16px", fontWeight: "700", cursor: loading ? "not-allowed" : "pointer", boxShadow: "0 8px 25px rgba(102,126,234,0.5)" }}>
                    {loading ? "Adding..." : "Add Contact"}
                </button>
               </form>
            </div>
        </div>
      );
    }
    
