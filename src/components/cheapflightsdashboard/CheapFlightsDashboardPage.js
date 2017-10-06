import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {Link,browserHistory} from 'react-router';
import {bindActionCreators} from 'redux';
import * as cheapFlightsActions from '../../actions/cheapFlightsActions';
import CheapFlightsList from './CheapFlightsList';

class CheapFlightsDashboardPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.redirectToCheapFlightDashboardPage = this.redirectToCheapFlightDashboardPage.bind(this);
  }


  redirectToCheapFlightDashboardPage() {
    browserHistory.push('/cheapflights-dashboard');
  }

  render() {
    const {cheapflights} = this.props;
    return (
      <div>
        <h1>CheapFlights</h1>
        <span className="dropdown clearfix">
        <button className="btn btn-primary">+ Add New</button>
          <label>
            <input type="checkbox" />
            <ul>
              <li data-name="region"><Link to={'/cheapflight'}>Region Page</Link></li>
              <li><Link to={'/region/'}>City Page</Link></li>
            </ul>
          </label>
        </span>
        <CheapFlightsList cheapflights={cheapflights}/>
      </div>
    );
  }
}

CheapFlightsDashboardPage.propTypes = {
  cheapflights: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    cheapflights: state.cheapflights //this name comes from the root reducer
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(cheapFlightsActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps) (CheapFlightsDashboardPage);
