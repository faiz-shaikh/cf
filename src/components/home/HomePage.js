import React from 'react';
import {Link} from 'react-router';

class HomePage extends React.Component {
  render() {
    return (
      <div className="jumbotron">
        <h1>CheapFlights Admin-UI</h1>
        <p>This is Cheapflights Admin section</p>
        <div className="btnBox clearfix">
        <Link to="cache-config" className="btn btn-primary btn-lg">update global configs</Link>
        </div>
      </div>
    );
  }
}

export default HomePage;
