import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
    const[email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        if (!email || !password) { setError("All fileds are required"); return; }
        try {
            setLoading(true);
            const response = await axios.post("/api/auth/login", { email, password });
            window.__token = response.data.token;
            localStorage.setItem("token", response.data.token);
            navigate("/contacts");
          } catch (err) {
            setError("Invalid email or password");
          } finally {
            setLoading(false);
          }
        };

        return (
            <div style={{
               minHeight: "100vh",
               background: "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
               display: "flex",
               alignItems: "center",
               justifyContent: "center",
               fontFamily: "'Segoe UI', sans-serif",
               padding: "20px"
            }}>
                <div style={{
                    background: "white",
                    borderRadius: "30px",
                    padding: "50px 40px",
                    width: "100%",
                    maxWidth: "400px",
                    boxShadow: "0 30px 100px rgba(0,0,0,0.3)",
                }}>
                    <div style={{ textAlign: "center", marginBottom: "35px "}}>
                        <div style={{
                            width: "70px", height: "70px", borderRadius: "20px",
                            background: "linear-gradient(135deg, #667eea, #764ba2)",
                            margin: "0 auto 16px",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontSize: "30px"
                        }}>
                        </div>
                        <h1 style={{ margin: 0, fontSize: "28px", fontWeight: "800", color: "#1a1a2e" }}>Mobipesa</h1>
                        <p style={{ margin: "6px 0 0", color: "#888", fontSize: "14px" }}>Sign in to manage your contacts</p>
                    </div>

                    {error && (
                        <div style={{
                            background: "#fff0f0", border: "1px solid #ffcccc",
                            borderRadius: "12px", padding: "12px 16px",
                            color: "#e53e3e", fontSize: "14px", marginBottom: "20px",
                            textAlign: "center"
                        }}>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleLogin}>
                        <div style={{ marginBottom: "16px" }}>
                            <lable style={{ fontSize: "13px", fontWeight: "600", color: "#555", display: "block", marginBottom: "8px" }}>Email Address</lable>
                            <input
                              type="email"
                              placeholder="you@example.com"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              style={{
                                width: "100%", padding: "14px 16px", borderRadius: "12px",
                                border: "2px solid #e8e8e8", fontSize: "14px",
                                outline: "none", boxSizing: "border-box",
                                transition: "border 0.2s",
                              }}
                              />
                        </div>

                        <div style={{ marginBottom: "24px" }}>
                            <label style={{ fontSize: "13px", fontWeight: "600", color: "#555", display: "block", marginBottom: "8px" }}>Password</label>
                            <input
                            type="password"
                            placeholder="Enter ypur password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{
                                width: "100%", padding: "14px 16px", borderRadius: "12px",
                                border: "2px solid #e8e8e8", fontSize: "14px",
                                outline: "none", boxSizing: "border-box",
                            }}
                            />
                        </div>

                        <button
                           type="submit"
                           disabled={loading}
                           style={{
                            width: "100%", padding: "16px",
                            background: loading ? "#ccc" : "linear-gradient(135deg, #667eea, #764ba2)",
                            color: "white", border: "none", borderRadius: "14px",
                            fontSize: "16px", fontWeight: "700", cursor: loading ? "not-allowed" : "pointer",
                            boxShadow: "0 8px 25px rgba(102,126,234,0.5)",
                            letterSpacing: "0.5px"
                           }}
                        >
                            {loading ? "Signing in..." : "Sign In"}
                        </button>
                    </form>
                </div>
            </div>
        );
        }
    
