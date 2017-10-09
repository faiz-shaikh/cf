/**
*
* PerPage
*
*/

import React from 'react';
import NumberDropdown from './NumberDropdown';
import DataTable from './DataTable';

class PerPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor() {
    super();
    this.state = {
      perPage: '25' // default
    };
    this.handleSelect = this.handleSelect.bind(this);
  }
  handleSelect(e) {
    this.setState({
      perPage: e.target.value
    });
  }

  render() {
    const { perPage } = this.state;
    const numberPerPage = [25, 50, 100];
    return (
      <div>
        <div className="record-per-page">
          <span className="paymentFormsLabel pull-left">upload history</span>
          <label htmlFor="record-select" className="record-selection pull-right">
            <select name="record-select" onChange={this.handleSelect} id="select-records-display">
              {
                numberPerPage.map((num) => <NumberDropdown
                  num={num}
                  key={num}
                />)
              }
            </select> records per page</label>
          <div className="clearfix"></div>
        </div>
        <DataTable perPage={perPage} {...this.props} />
      </div>
    );
  }
}

export default PerPage;
