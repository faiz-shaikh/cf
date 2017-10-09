import React from "react";
import axios from "axios";
import Select from "react-select";
import toastr from "toastr";

const d = document.getElementById("value");
const pos = d.options[d.selectedIndex].text.toLowerCase();

class CacheConfig extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      multi: true,
      multiValue: [],
      options: [],
      options2: [],
      blockedOptions: []
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.HandleDeleteValue = this.HandleDeleteValue.bind(this);
    this.HandleDeleteValue2 = this.HandleDeleteValue2.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnChange2 = this.handleOnChange2.bind(this);
  }

  componentWillMount() {
    Promise.all([
      axios.get("http://10.44.254.52:3001/data"),
      axios.get("http://10.44.254.6:3000/config", {
        params: {
          pos
        }
      })
    ])
      .then(([FlightList, OpaquedList]) => {
        const airlineList = JSON.parse(
          JSON.stringify(FlightList.data)
            .split('"value":')
            .join('"label":')
            .split('"key":')
            .join('"value":')
        ).map(x => {
          let label = Object.keys[label];
          label = {
            id: x.id,
            label: `${x.value} - ${x.label}`,
            value: x.value
          };
          return label;
        });
        const airlineList2 = airlineList;
        const opaquedAirlineList = OpaquedList.data.data.opaquedAirlines;
        const arr = [];
        opaquedAirlineList.forEach(element => {
          const obj = airlineList.find(o => o.value === element);
          arr.push(obj);
        });
        const blockedAirlineList = OpaquedList.data.data.blockedAirlines;
        const arr1 = [];
        blockedAirlineList.forEach(element => {
          const obj = airlineList2.find(o => o.value === element);
          arr1.push(obj);
        });
        this.setState({
          options: airlineList,
          options2: airlineList2,
          blockedOptions: arr1,
          multiValue: arr
        });
      })
      .catch(err => {
        throw err;
      });
  }

  handleFormSubmit(e) {
    const opaquedResult = this.state.multiValue.map(a => a.value);
    const blockedOptionsResult = this.state.blockedOptions.map(a => a.value);
    e.preventDefault();
    const configPageFormData = {
      opaquedAirlines: opaquedResult,
      blockedAirlines: blockedOptionsResult,
      pos
    };
    axios
      .put("http://10.44.254.6:3000/config", configPageFormData, {
        params: {
          pos
        }
      })
      .then(toastr.success("config saved"))
      .catch(err => {
        throw err;
      });
    console.log("Send this in a POST request:", configPageFormData); // eslint-disable-line
  }

  handleOnChange(value) {
    this.setState({
      multiValue: value
    });
  }

  handleOnChange2(value) {
    this.setState({
      blockedOptions: value
    });
  }

  HandleDeleteValue(y) {
    y.preventDefault();
    y.persist();
    const array = this.state.multiValue;
    array.splice(y.target.closest("li").getAttribute("name"), 1);
    this.setState({ multiValue: array });
  }

  HandleDeleteValue2(y) {
    y.preventDefault();
    y.persist();
    const array = this.state.blockedOptions;
    array.splice(y.target.closest("li").getAttribute("name"), 1);
    this.setState({ blockedOptions: array });
  }

  render() {
    return (
      <form className="container" onSubmit={this.handleFormSubmit}>
        <label
          htmlFor="Opaqued Airline List"
          id="opaque-airline-list-label"
          className="label"
        >
          Opaqued Airline List
        </label>
        <Select
          multi
          options={this.state.options}
          onChange={this.handleOnChange}
          value={this.state.multiValue}
          showNewOptionAtTop={false}
          searchable
          clearable={false}
          backspaceRemoves={false}
          label="Opaqued Airline List"
        />
        <div className="row twoColMultiSelect clearfix selectColumn">
          <div
            className="chosen-container chosen-container-multi"
            id="airlineCodes_chosen_opaque"
            style={{ width: "707px" }}
          >
            <ul className="chosen-choices" style={{ padding: "0px" }}>
              {" "}
              {this.state.multiValue.map((post, i) => (
                <li
                  className="search-choice"
                  name={i}
                  id={`opaque-list-${i}`}
                  key={`opaque-list-${post.label}`}
                >
                  <span id={`${post.value}-opaque-selected`}>{post.label}</span>
                  <a
                    className="search-choice-close"
                    id={`${post.value}-opaque-selected-remove`} // eslint-disable-line
                    onClick={this.HandleDeleteValue}
                    role="button"
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
        <label
          htmlFor="Blocked Airline List"
          id="blocked-airline-list-label"
          className="label"
        >
          Blocked Airline List
        </label>
        <Select
          multi
          options={this.state.options2}
          onChange={this.handleOnChange2}
          value={this.state.blockedOptions}
          showNewOptionAtTop={false}
          searchable
          clearable={false}
          backspaceRemoves={false}
          label="Blocked Airline List"
        />
        <div className="row twoColMultiSelect clearfix selectColumn">
          <div
            className="chosen-container chosen-container-multi"
            id="airlineCodes_chosen_blocked"
            style={{ width: "707px" }}
          >
            <ul className="chosen-choices" style={{ padding: "0px" }}>
              {" "}
              {this.state.blockedOptions.map((post, i) => (
                <li
                  className="search-choice"
                  name={i}
                  id={`blocked-list-${i}`}
                  key={`blocked-list-${post.label}`}
                >
                  <span id={`${post.value}-blocked-selected`}>
                    {post.label}
                  </span>
                  <a
                    className="search-choice-close"
                    id={`${post.value}-blocked-selected-remove`} // eslint-disable-line
                    onClick={this.HandleDeleteValue2}
                    role="button"
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="btnBox clearfix">
          <input
            id="config-page-submit"
            type="submit"
            className="btn btn-success btn-lg"
            value="Submit"
          />
          <input
            id="config-page-cancel"
            type="button"
            className="btn btn-success btn-lg I"
            value="Cancel"
          />
        </div>
      </form>
    );
  }
}

export default CacheConfig;
