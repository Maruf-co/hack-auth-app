import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isAdmin: false,
    };
  }

  handleInputChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value,
    });
  };

  onSubmit = (event) => {
    event.preventDefault();

    console.log('state', this.state)

    fetch('/api/authenticate', {
      method: 'POST',
      body: JSON.stringify(this.state),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (res.status === 200) {
          this.props.history.push('/');
        } else {
          const error = new Error(res.error);
          throw error;
        }
      })
      .catch((err) => {
        console.error(err);
        alert('Error logging in please try again');
      });
  };

  render() {
    return (
      <form onSubmit={this.onSubmit} className="form">
        <h1>Login Below!</h1>
        <Link to="/register">Sign up</Link>
        <input
          type="text"
          name="email"
          placeholder="Enter email"
          value={this.state.email}
          onChange={this.handleInputChange}
          required
          className="input"
        />
        <input
          type="password"
          name="password"
          placeholder="Enter password"
          value={this.state.password}
          onChange={this.handleInputChange}
          required
          className="input"
        />
        <div className="adminInputWrap">
          <span>I am admin</span>
          <input 
            type="checkbox" 
            name="adminCheck" 
            value={this.state.isAdmin}
            onChange={() => this.state.isAdmin = !this.state.isAdmin} 
          />
        </div>
        <input type="submit" value="Submit" className="input" />
      </form>
    );
  }
}
