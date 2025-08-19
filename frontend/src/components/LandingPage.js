import React from 'react';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div style={{ maxWidth: 720, margin: '4rem auto', textAlign: 'center' }}>
      <h1>Welcome to Awaaz</h1>
      <p>Your voice. Your platform.</p>
      <div style={{ marginTop: 24 }}>
        <Link to="/login"><button style={{ padding: 10, marginRight: 8 }}>Log In</button></Link>
        <Link to="/signup"><button style={{ padding: 10 }}>Sign Up (soon)</button></Link>
      </div>
    </div>
  );
}
