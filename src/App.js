import React, { Component } from 'react';
import { Heart } from 'react-spinners-css';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      data: [],
    };
  }

  async componentDidMount() {
    try {
      const res = await fetch('api/sightings');
      const body = await res.json();
      this.setState({ ...this.state, data: body, loading: false });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return (
      <div className="App">
        <h1>UFO Sightings 🛸</h1>
        {this.state.loading ? (
          <div>
            <Heart />
            <p>Loading... </p>
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Date/Time</th>
                <th>Country</th>
                <th>City</th>
                <th>State</th>
                <th>Shape</th>
                <th>Comments</th>
              </tr>
            </thead>
            <tbody>
              {this.state.data &&
                this.state.data.map((row, i) => {
                  return (
                    <tr key={i}>
                      <td>{row.datetime}</td>
                      <td>{row.country}</td>
                      <td>{row.city}</td>
                      <td>{row.state}</td>
                      <td>{row.shape}</td>
                      <td>{row.comments}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        )}
      </div>
    );
  }
}

export default App;
