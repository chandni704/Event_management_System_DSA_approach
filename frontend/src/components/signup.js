import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    otp: '',
  });
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(fd => ({ ...fd, [name]: value }));
  };

  const sendOTP = async () => {
    setError('');
    setSuccess('');
    if (!formData.email) {
      setError('Please enter your email first.');
      return;
    }
    try {
      const res = await axios.post('http://localhost:5000/send-otp', { email: formData.email });
      if (res.data.success) {
        setSuccess(res.data.message);
        setStep(2);
      } else {
        setError(res.data.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send OTP.');
    }
  };

  const verifyAndSignup = async e => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/submit-signup', formData);
      if (res.data.success) {
        navigate('/login');
      } else {
        setError(res.data.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Signup error. Check OTP and try again.');
    }
  };

  return (
  <>
    <div className="signup-container">
      {/* Background Bokeh Lights */}
      <div className="bokeh b1"></div>
      <div className="bokeh b2"></div>
      <div className="bokeh b3"></div>

      <form onSubmit={verifyAndSignup} className="signup-card">
        <h2 className="signup-title">Sign Up</h2>

        {step === 1 && (
          <>
            <input name="username" placeholder="Username" value={formData.username} onChange={handleChange} className="signup-input" />
            <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} className="signup-input" />
            <input name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} className="signup-input" />
            <input name="confirmPassword" type="password" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} className="signup-input" />
            <button type="button" onClick={sendOTP} className="signup-button">Send OTP</button>
          </>
        )}

        {step === 2 && (
          <>
            <input name="otp" placeholder="Enter OTP" value={formData.otp} onChange={handleChange} className="signup-input" />
            <button type="submit" className="signup-button">Verify & Signup</button>
            <button type="button" onClick={sendOTP} className="signup-button resend-btn">Resend OTP</button>
          </>
        )}

        {error && <p className="signup-error">{error}</p>}
        {success && <p className="signup-success">{success}</p>}

        <p className="signup-footer">
          Already have an account? <a href="/login" className="signup-link">Login</a>
        </p>
      </form>
    </div>

    <style>{`
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Poppins', sans-serif;
      }

      .signup-container {
        width: 100vw;
        height: 100vh;
        background-image: url('/events_back.jpg');
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        overflow: hidden;
      }

      .signup-card {
        background: rgba(255, 255, 255, 0.08);
        border: 1px solid rgba(255, 255, 255, 0.12);
        backdrop-filter: blur(25px);
        padding: 40px;
        border-radius: 20px;
        width: 350px;
        color: white;
        z-index: 2;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6);
      }

      .signup-title {
        text-align: center;
        font-size: 2rem;
        margin-bottom: 20px;
        color: #f8c46a;
        text-shadow: 0 0 10px #f8c46a66;
      }

      .signup-input {
        margin: 10px 0;
        padding: 15px;
        border-radius: 10px;
        border: none;
        background: rgba(255, 255, 255, 0.1);
        color: #000000;
        font-size: 16px;
        width: 100%;
      }

      .signup-button {
        margin-top: 15px;
        padding: 15px;
        border: none;
        border-radius: 10px;
        font-size: 16px;
        background: linear-gradient(to right, #67e8f9, #3b82f6);
        color: #fff;
        cursor: pointer;
        width: 100%;
      }

      .resend-btn {
        margin-top: 10px;
        background: linear-gradient(to right, #f472b6, #c026d3);
      }

      .signup-error {
        color: #ff7373;
        text-align: center;
        margin-top: 10px;
      }

      .signup-success {
        color: #8aff8a;
        text-align: center;
        margin-top: 10px;
      }

      .signup-footer {
        margin-top: 20px;
        text-align: center;
        font-size: 14px;
      }

      .signup-link {
        color: #60a5fa;
        font-weight: bold;
        text-decoration: none;
      }

      .bokeh {
        position: absolute;
        border-radius: 50%;
        filter: blur(80px);
        opacity: 0.15;
        animation: float 10s ease-in-out infinite;
      }

      .b1 {
        width: 300px;
        height: 300px;
        background: #f8c46a;
        top: 10%;
        left: 5%;
      }

      .b2 {
        width: 250px;
        height: 250px;
        background: #c084fc;
        bottom: 10%;
        right: 5%;
        animation-delay: 2s;
      }

      .b3 {
        width: 200px;
        height: 200px;
        background: #60a5fa;
        bottom: 40%;
        left: 45%;
        animation-delay: 4s;
      }

      @keyframes float {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(20px); }
      }

      @media (max-width: 500px) {
        .signup-card {
          width: 90%;
          padding: 30px 20px;
        }

        .signup-title {
          font-size: 1.8rem;
        }
      }
    `}</style>
  </>
);
};
export default SignUp;
