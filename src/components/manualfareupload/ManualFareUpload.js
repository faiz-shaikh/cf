import React from 'react';
import {Link, browserHistory} from 'react-router';
import axios from 'axios';
import Button from './Button';
import PerPage from './PerPage';
import OfferNumber from './OfferNumber';
import UserRole from './UserRole';
import serverUrl from '../../env-config/sta-dev';


//console.log(serverUrl);

class ManualFareUpload extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      handleChange: (e) => {
        const numList = e.target.value || 25;
        return numList;
      },
      records: [],
      firstline: {},
      date: 0,
      filename: ''
    };
    this.redirectToManualFareUploadPage = this.redirectToManualFareUploadPage.bind(this);
    this.refreshData = this.refreshData.bind(this);
    this.whatPos = this.whatPos.bind(this);
  }

  componentDidMount() {
    this.api(`${serverUrl.SERVERURL}history/manualupload/${this.whatPos()}`);
  }
  redirectToManualFareUploadPage() {
    browserHistory.push('/manual-fare-upload');
  }
  refreshData(url) {
    this.api(url);
    this.forceUpdate();
  }
  whatPos() {
    const pos = document.getElementById('posDropdown');
    const sel = pos.children.value;
    return sel.options[sel.selectedIndex].innerHTML.toLowerCase();
  }
  format(digit) {
    if (digit <= 9) {
      return `0${digit}`;
    }
    return `${digit}`;
  }

  whatPartOfTheDay(b) {
    const h = b.getHours();
    if (h < 12) {
      return 'am';
    }
    return 'pm';
  }
  api(url) {
    axios.get(url).then((res) => {
      this.setState({
        records: res.data.data.map((c) => {
          const b = new Date(c.date);
          const format = (digit) => {
            if (digit <= 9) {
              return `0${digit}`;
            }
            return `${digit}`;
          };
          return {
            user: c.user,
            numberFlights: c.numberFlights,
            date: `${format(b.getDate())}/${format(b.getMonth() + 1)}/${format(b.getFullYear())}`,
            time: `${format(b.getHours())}:${format(b.getMinutes())}${this.whatPartOfTheDay(b)}`
          };
        }),
        firstline: res.data.data[0],
        date: res.data.data[0].date
      });
    });
  }
  render() {
    return (
      <div>
        <h1>FLIGHTS DATABASE: MANUAL OFFERS UPLOAD</h1>
        <p>This is Cheapflights Admin section</p>
        <div className="btnBox clearfix">
        <Link to="cache-config" className="btn btn-primary btn-lg">update global configs</Link>
        </div>
        <OfferNumber firstObjectFromData={this.state.firstline} date={this.state.date} />
          <div className="btnBox">
            <Button className="btn linkBtn" href={`${serverUrl.SERVERURL}manualupload/downloadtemplate`} id="download-template" value="Download Template" />
            <UserRole action={this.refreshData} pos={this.whatPos} />
          </div>
          <section>
          <div>
            <PerPage data={this.state.records} />
          </div>
        </section>
      </div>
    );
  }
}

export default ManualFareUpload;
