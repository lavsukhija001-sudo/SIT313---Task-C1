
import { useState } from 'react';

function Signup() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();

    if (!email.trim()) {
      setMessage('Please enter your email address.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Subscription failed.');
      }

      setMessage(data.message);
      setEmail('');
    } catch (error) {
      setMessage(
        error.message || 'Could not connect to the server.'
      );
    }
  }

  return (
    <section className="signup">
      <h2>Subscribe to My Newsletter</h2>
      <p>Enter your email to receive updates about my projects.</p>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Enter your email"
          required
        />

        <button type="submit">Subscribe</button>
      </form>

      <p>{message}</p>
    </section>
  );
}

export default Signup;
