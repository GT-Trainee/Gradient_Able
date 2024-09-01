import React from 'react';
import './App.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from 'services/login';


function Login() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [pstatus, setstatus] = useState(false);
//   const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const emailId = form.email.value;
    const password = form.password.value;

    if (!emailId || !password) {
      setError("Please fill in both email and password.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const data = await login(emailId, password); // Use the login service
      console.log("Login successful:", data);
      alert("Login Successful!");
    //   navigate('../views/dashboard');
    window.location.href='./views/dashboard';
    } catch (error) {
      setError('Login failed: ' + error.message);
      alert("Login Failed! " + error.message); // Include error message in alert
    } finally {
      setLoading(false);
    }
  };

  return (
    
      <div className="App">
        
        <div className="login-container">
          <h2 className="login-title">Login</h2>
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" name="email" className="form-control" id="email" placeholder="Enter email" required />
            </div>
            <div className="form-group position-relative">
              <label htmlFor="password">Password</label>
              <input
                type={pstatus ? "text" : "password"}
                name="password"
                className="form-control"
                id="password"
                placeholder="Password"
                required
              />
              <button
                type="button"
                className="btn btn-outline-secondary position-absolute"
                onClick={() => setstatus(!pstatus)}
                style={{
                  right: '10px',
                  top: '60%',
                  transform: 'translateY(-50%)',
                  border: 'none',
                  background: 'none',
                  padding: '0',
                  cursor: 'pointer'
                }}
              >
                {
                  pstatus
                    ? (<i className="fa fa-eye-slash"></i>)
                    : (<i className="fa fa-eye"></i>)
                }
              </button>
            </div>
            {error && <p className="error-message">{error}</p>}
            <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
            <p className="forgot-password">
              <a href="#">Forgot your password?</a>
            </p>
          </form>
        </div>
      </div>
    
  );
}

export default Login;
