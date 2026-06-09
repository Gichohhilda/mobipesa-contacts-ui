import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Contacts() {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
     
    const fetchContacts = async () => {
        try {
            const res = await axios.get("/api/contacts", {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            });
            console.log("CONTACTS DATA:", res.data);
            setContacts(res.data.data || res.data || []);
            console.log("CONTACTS DATA:", res.data.data);
        } catch (err) {
            if (err.response?.status === 401 || err.response?.status === 403) {
                navigate("/login");
            }
        } finally {
          setLoading(false);
        }
      };

      useEffect(() => { fetchContacts(); }, []);
       
      const handleDelete = async (id) => {
        if (!window.confirm("Delete this contact?")) return;
        await axios.delete(`/api/contacts/${id}`, {
            headers: {Authorization: `Bearer ${localStorage.getItem("token")}` }
        });
        fetchContacts();
      };

      if (loading) return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", background: "#f3f4f6" }}>
            <p style={{ fontSize: "18px", color: "#6b7280" }}>Loading contacts...</p>
        </div>
      );

      return (
        <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #667eea, #764ba2 100%)", padding: "30px 20px", fontFamily: "'Segoe UI, sans-serif" }}>
            <div style={{ maxWidth: "700px", margin: "0 auto" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
            </div>
            <h1 style={{ margin: 0, color: "white", fontSize: "32px", fontWeight: "800" }}>Mobipesa</h1>
            <p style={{ margin: "4px 0 0", color: "rgba(255,255,255,0.7)", fontSize: "14px" }}>Your Contacts</p>
        </div>
        <button
           onClick={() => navigate("/contacts/add")}
           style={{ padding: "12px 24px", background: "white", color: "#764ba2", border: "none", borderRadius: "14px", fontWeight: "700", cursor: "pointer", fontSize: "14px", boxShadow: "0 4px 15px rgba(0,0,0,0.2)" }}>
            + Add Contact
        </button>
       
      )
       {contacts.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px", background: "rgba(255,255,255,0.1)", borderRadius: "20px", color: "white" }}>
          <p style={{ fontsize: "18px" }}>No contacts yet.Add one!</p>
        </div>
       ) : (
         contacts.map((c) => (
            <div key={c.id} style={{ background: "white", borderRadius: "16px", padding: "20px 24px", marginBottom: "12px", display: "flex", alignItems: "center", justifyContent: "space-between", boxShadow: "0 4px 15px rgba(0,0,0,0.5)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                   <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: "linear-gradient(135deg, #667eea, #764ba2)", display: "flex", alignItems: "center", color: "white", fontSize: "20px", fontWeight: "bold" }}>
                    {c.name[0].toUpperCase()}
                </div>
                <div> 
                    <p style={{margin: 0, fontWeight: "700", color: "#1a1a2e", fontsize: "16px" }}>{c.name}</p>
                    <p style={{ margin: "2px 0 0", color: "#555", fontSize: "13px" }}>{c.phone}</p>
                    <p style={{ margin: "2px 0 0", colo: "#555", fontsize: "13px" }}>{c.email}</p>
                </div>
            </div>
            <div style={{ display: "flex", gap: "8px" }}>
                <button
                onClick={() => navigate("/contacts/edit/" + c.id)}
                style={{ padding: "8px 16px", background: "linear-gradient(135deg, #667eea, #764ba2)", color: "white", border: "none", borderRadius: "10px", cursor: "pointer", fontWeight: "600", fontSize: "13px" }}>
                    Edit
                </button>
                <button 
                    onClick={() => handleDelete(c.id)}
                    style={{ padding: "8px 16px", background: "linear-gradient(135deg, #f093fb, #f5576c)", color: "white", border: "none", borderRadius: "10px", cursor: "pointer", fontWeight: "600", fontSize: "13px" }}>
                    Delete
                    </button>
                 </div>
               </div> 
            ))
          )}
        </div>
      );
    }