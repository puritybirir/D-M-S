import React from 'react';
import { Link } from 'react-router';
class HomePage extends React.Component {
  render() {
    return (
      <div className="jumbotron">
        <h1>Document Management System</h1>
        <p>the best way manage your documents.</p>
        <Link to="about" className="btn btn-primary btn-lg">Learn More</Link>
      </div>
    );
  }
}

export default HomePage;
