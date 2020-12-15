import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      selectedFile: null,
    };
  }

  async componentDidMount() {
    try {
      const res = await fetch('api/sightings');
      const body = await res.json();
      this.setState({ ...this.state, data: body });
    } catch (err) {
      console.log(err);
    }
  }

  handleChange = (e) => {
    this.setState({ ...this.state, selectedFile: e.target.files[0] });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append(
      'file',
      this.state.selectedFile,
      this.state.selectedFile.name
    );
    await fetch('/api/posting', {
      method: 'POST',
      body: formData,
    });
  };

  render() {
    return (
      <div className="App">
        <h1>UFO Sightings</h1>
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
        <form onSubmit={this.handleSubmit}>
          <p>
            <strong>Upload a .xlsx file:</strong>
          </p>
          <input onChange={this.handleChange} type="file" />
          <button type="submit">Upload</button>
        </form>
      </div>
    );
  }
}

export default App;
