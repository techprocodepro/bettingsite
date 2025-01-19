import React, { useState } from "react";
import axios from "axios";
import { fetchUserData } from "../Redux/Slice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { setRegister } from "../Redux/Slice"
import charles from '../Assets/charles.jpg'



const LoginPage = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const isRegister = useSelector(state => state.isRegister)

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!userName || !password) {
            setError("Username and password are required.");
            return;
        }

        setIsLoading(true);
        setError(null); // Reset error state

        try {
            const response = await axios.post("https://bettingsite-1.onrender.com/loginAuth", {
                userName,
                password,
            });

            if (response.status === 200) {
                console.log("Login successful:", response.data);
                dispatch(fetchUserData(response.data));
                localStorage.setItem("accessToken", response.data._id);
                navigate("/home");
            } else {
                setError("Login failed. Please try again.");
            }
        } catch (err) {
            console.error("Login failed:", err);
            setError(err.response?.data?.message || "An unexpected error occurred.");
        } finally {
            setIsLoading(false);
        }
    };

    const containerStyle = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        borderRadius: "20px",
        maxWidth: "100%",
        backgroundColor: "#191939", // Changed to dark color
        color: "#463e7a", // Text color adjusted for contrast
        flex: 1,
        height: "100%"
    };

    const inputStyle = {
        marginBottom: "10px",
        padding: "8px",
        width: "40%",
        borderRadius: "4px",
        fontWeight: "400",
        border: "1px solid #463e7a",
        backgroundColor: "#2c2852", // Dark background for inputs
        color: "#665e9a", // White text for visibility
    };

    const buttonStyle = {
        padding: "10px 20px",
        border: "none",
        borderRadius: "4px",
        backgroundColor: "gold",
        color: "black",
        fontWeight: "700",
        cursor: "pointer",
        width: "30%"
    };

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: 'center', height: "500px", flexDirection: "row-reverse", backgroundColor: "black", borderRadius: "20px" }}>
            <img style={{ flex: 1, height: "100%", borderRadius: "20px" }} src={charles} alt="" />
            {console.log(isRegister)}
            {isRegister ?
                <div style={containerStyle}>
                    <h4 style={{ margin: '10px' }}>Register your account</h4>
                    <h5 style={{ margin: '10px' }}>Already have an account ? <button onClick={() => { dispatch(setRegister(false)) }} style={{ color: "violet" }}>Login</button></h5>
                    <form onSubmit={handleSubmit} style={{ width: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>

                        <label htmlFor="username" style={{ marginBottom: "5px", display: "block", color: "#463e7a" }}>
                            Username
                        </label>
                        <input
                            id="username"
                            type="text"
                            value={userName}
                            onChange={(e) => {
                                setUserName(e.target.value);
                                setError(null);
                            }}
                            placeholder="Enter your username"
                            style={inputStyle}
                        />

                        <label htmlFor="password" style={{ marginBottom: "5px", display: "block", color: "#463e7a" }}>
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setError(null);
                            }}
                            placeholder="Enter your password"
                            style={inputStyle}
                        />

                        <button
                            type="submit"
                            style={buttonStyle}
                            disabled={isLoading}
                        >
                            {isLoading ? "Logging in..." : "Login"}
                        </button>
                    </form>

                    {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
                </div>
                :
                <div style={containerStyle}>
                    <h4 style={{ margin: '10px' }}>Login to your account</h4>
                    <h5 style={{ margin: '10px' }}>Don't have an account ? <button onClick={() => { dispatch(setRegister(true)) }} style={{ color: "violet" }}>Register</button></h5>
                    <form onSubmit={handleSubmit} style={{ width: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>

                        <label htmlFor="username" style={{ marginBottom: "5px", display: "block", color: "#463e7a" }}> {/* Label color changed to grey */}
                            Username
                        </label>
                        <input
                            id="username"
                            type="text"
                            value={userName}
                            onChange={(e) => {
                                setUserName(e.target.value);
                                setError(null);
                            }}
                            placeholder="Enter your username"
                            style={inputStyle}
                        />

                        <label htmlFor="password" style={{ marginBottom: "5px", display: "block", color: "#463e7a" }}> {/* Label color changed to grey */}
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setError(null);
                            }}
                            placeholder="Enter your password"
                            style={inputStyle}
                        />

                        <button
                            type="submit"
                            style={buttonStyle}
                            disabled={isLoading}
                        >
                            {isLoading ? "Logging in..." : "Login"}
                        </button>
                    </form>

                    {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
                </div>}
        </div>
    );
};

export default LoginPage;
