import { useState } from "react";
import { useNavigate } from "react-router";


export default function LoginPage() {
  const [username, setUsername] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();
 

  const handleLogin = () => {
     setError("");

     if (!username.trim()) {
      setError("Username is required");
      return;
    }

    if (username.trim().length < 2) {
      setError("Username must be at least 2 characters");
      return;
    }


    if (username.trim()) {
      localStorage.setItem("username", username);
      navigate(`/chat?username=${encodeURIComponent(username)}`);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <input
        placeholder="username"
        name="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        onKeyUp={handleKeyPress}
          autoFocus
      ></input>
      <button
        type="submit"
        onClick={(e) => {
          e.preventDefault();
          handleLogin();
        }}
      >
        Login
      </button>
      <style>{`
        .login-container {
          display: flex;
          flex-direction:column;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background-color: #f0f0f0;
        }

        .login-box {
          background: white;
          padding: 30px;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          text-align: center;
        }

        h2 {
          color: #333;
        }

        input {
          width: 200px;
          padding: 10px;
          margin-bottom: 15px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 16px;
        }

         input:focus {
          outline: none;
          border-color: #667eea;
        }
          
        button {
          width: 220px;
          padding: 10px;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 4px;
          font-size: 16px;
          cursor: pointer;
        }

        button:hover {
          background-color: #0056b3;
        }
      `}</style>
    </div>
  );
}
