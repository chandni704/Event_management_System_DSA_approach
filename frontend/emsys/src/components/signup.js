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
  const [step, setStep] = useState(1);       // 1 = enter details, 2 = enter OTP
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(fd => ({ ...fd, [name]: value }));
  };

  // 1) Send (or resend) OTP
  const sendOTP = async () => {
    setError(''); setSuccess('');
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

  // 2) Verify OTP & Signup
  const verifyAndSignup = async e => {
    e.preventDefault();
    setError(''); setSuccess('');

    // Password match check
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
    <div style={styles.container}>
      <form onSubmit={verifyAndSignup} style={styles.card}>
        <h2 style={styles.title}>Sign Up</h2>

        {step === 1 && (
          <>
            <input
              name="username" placeholder="Username"
              value={formData.username} onChange={handleChange}
              style={styles.input}
            />
            <input
              name="email" type="email" placeholder="Email"
              value={formData.email} onChange={handleChange}
              style={styles.input}
            />
            <input
              name="password" type="password" placeholder="Password"
              value={formData.password} onChange={handleChange}
              style={styles.input}
            />
            <input
              name="confirmPassword" type="password" placeholder="Confirm Password"
              value={formData.confirmPassword} onChange={handleChange}
              style={styles.input}
            />
            <button type="button" onClick={sendOTP} style={styles.button}>
              Send OTP
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <input
              name="otp" placeholder="Enter OTP"
              value={formData.otp} onChange={handleChange}
              style={styles.input}
            />
            <button type="submit" style={styles.button}>
              Verify & Signup
            </button>
            <button
              type="button"
              onClick={sendOTP}
              style={{ ...styles.button, marginTop: '10px', background: '#444' }}
            >
              Resend OTP
            </button>
          </>
        )}

        {error && <p style={styles.error}>{error}</p>}
        {success && <p style={styles.success}>{success}</p>}

        <p style={styles.footer}>
          Already have an account?{' '}
          <a href="/login" style={styles.link}>Login</a>
        </p>
      </form>
    </div>
  );
};

const styles = {
  container: {
    background: '#0b0d19',
    display: 'flex', justifyContent: 'center', alignItems: 'center',
    height: '100vh', fontFamily: 'Poppins, sans-serif', color: '#fff',
  },
  card: {
    background: '#0b0d19',
    padding: '40px',
    borderRadius: '15px',
    boxShadow: '8px 8px 15px rgba(0,0,0,0.2), -8px -8px 15px rgba(255,255,255,0.1)',
    width: '350px',
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    marginBottom: '20px',
    color: '#8ac7ff',
    textAlign: 'center',
  },
  input: {
    margin: '10px 0',
    padding: '15px',
    borderRadius: '10px',
    border: 'none',
    background: 'rgba(255,255,255,0.1)',
    color: '#fff',
    fontSize: '16px',
  },
  button: {
    marginTop: '10px',
    padding: '15px',
    border: 'none',
    borderRadius: '10px',
    fontSize: '16px',
    background: 'rgba(58,123,213,0.8)',
    color: '#fff',
    cursor: 'pointer',
  },
  error: {
    color: '#ff7373',
    textAlign: 'center',
    marginTop: '10px',
  },
  success: {
    color: '#8aff8a',
    textAlign: 'center',
    marginTop: '10px',
  },
  footer: {
    marginTop: '15px',
    textAlign: 'center',
    fontSize: '14px',
  },
  link: {
    color: '#007bff',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
};

export default SignUp;
