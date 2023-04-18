import React, { Component } from 'react';

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      status: '',
      email: ''
    };
  }

  componentDidMount() {
    fetch('/api/home')
      .then((res) => res.json())
      .then((res) => this.setState({ status: res.status, email: res.email }));
  }

  render() {
    const HomeContent = `
      <h1>Home</h1>
      <p>Welcome, dear ${this.state.status} </p>
      <p>With email <b>${this.state.email}</b> </p>
    `

    return <div className="wrap" dangerouslySetInnerHTML={{__html:HomeContent}} />
  }
}
