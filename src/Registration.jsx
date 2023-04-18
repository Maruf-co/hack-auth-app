import React, { useState } from 'react';

function Registration(props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [adminKey, setAdminKey] = useState('')
  const [adminField, setAdminField] = useState(false)

  const handleInputChange = (event, setFn) => {
    const { value } = event.target;
    setFn(value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (password === passwordConfirm) {
      const state = { email, password, adminKey }

      fetch('/api/register', {
        method: 'POST',
        body: JSON.stringify(state),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => {
          if (res.status === 200) {
            props.history.push('/');
          } else {
            const error = new Error(res.error);
            throw error;
          }
        })
        .catch((err) => {
          console.error(err);
          alert('Error logging in please try again');
        });
    } else {
      alert('Passwords did not match, please try again');
    }
  };


  return (
    <form onSubmit={onSubmit} className="form">
      <h1>Register Below!</h1>
      <input
        type="email"
        name="email"
        placeholder="Enter email"
        value={email}
        onChange={(event) => handleInputChange(event, setEmail)}
        required
        className="input"
      />
      <input
        type="password"
        name="password"
        placeholder="Enter password"
        value={password}
        onChange={(event) => handleInputChange(event, setPassword)}
        required
        className="input"
      />
      <input
        type="password"
        name="passwordConfirm"
        placeholder="Confirm password"
        value={passwordConfirm}
        onChange={(event) => handleInputChange(event, setPasswordConfirm)}
        required
        className="input"
      />
      <div className='adminInputWrap'>
        <span>I am admin</span>
        <input type="checkbox" name="adminCheck" onClick={() => setAdminField(!adminField)} />
      </div>
      {adminField && (
        <input
          type="password"
          name="adminKey"
          placeholder="Enter Admin Key"
          value={adminKey}
          onChange={(event) => handleInputChange(event, setAdminKey)}
          required
          className="input"
        />
      )}
      <input type="submit" value="Submit" className="input" />
    </form>
  );
};

export default Registration;