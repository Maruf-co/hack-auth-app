import React, { Component } from 'react';

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      body: ''
    };
  }

  componentDidMount() {
    fetch('/api/home')
      .then((res) => res.json())
      .then((res) => this.setState({ body: res.body }));
  }

  render() {
    const HomeContent = `
      <h1>Home</h1>
      ${this.state.body}
    `

    return <div className="wrap" dangerouslySetInnerHTML={{__html:HomeContent}} />
  }
}
