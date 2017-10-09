/**
*
* DataTable
*
*/

import React from 'react';
import Reactable from 'reactable';


const Table = Reactable.Table;
const Thead = Reactable.Thead;
const Th = Reactable.Th;


class DataTable extends React.Component {
    constructor(){
        super();
    }
  renderTable() {
    const previousPageLabel = ' ';
    const nextPageLabel = ' ';
    const { perPage, data } = this.props; //eslint-disable-line
    // const { data } = this.props; //eslint-disable-line
    return (
      <Table
        id="manual-offers-upload" className="paymentFormsTable"
        filterable={['user', 'numberFlights', 'date', 'time']}
        noDataText="No matching records found"
        itemsPerPage={perPage}
        pageButtonLimit={5}
        previousPageLabel={previousPageLabel}
        nextPageLabel={nextPageLabel}
        currentPage={0}
        sortable={[]}
        data={data}
      >
        <Thead>
          <Th column="user" className="paymentFormName"><span id="manual-offers-upload-header-name">User</span></Th>
          <Th column="numberFlights" className="paymentFormName"><span id="manual-offers-upload-header-number">Number of offers uploded</span></Th>
          <Th column="date" className="paymentFormName"><span id="manual-offers-upload-header-date">Date</span></Th>
          <Th column="time" className="paymentFormName"><span id="manual-offers-upload-header-time">Time</span></Th>
        </Thead>
      </Table>
    );
  }
  render() {
    return (
      <div>
        {this.renderTable()}
      </div>
    );
  }
}

export default DataTable;
