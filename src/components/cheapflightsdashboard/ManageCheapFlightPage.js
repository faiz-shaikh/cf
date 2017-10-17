import React, { PropTypes } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as cheapFlightsActions from "../../actions/cheapFlightsActions";
import CheapFlightForm from "./CheapFlightForm";
import { regionsFormattedForDropdown } from "../../selectors/selectors";
import toastr from "toastr";
import RichTextEditor from 'react-rte';

export class ManageCheapFlightPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      cheapflight: Object.assign({}, props.cheapflight),
      errors: {},
      editorValue: RichTextEditor.createEmptyValue()
    };

    this.updateCheapFlightState = this.updateCheapFlightState.bind(this);
    this.saveCheapflight = this.saveCheapflight.bind(this);
    this.updateEditorChanges = this.updateEditorChanges.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.cheapflight.id != nextProps.cheapflight.id) {
      console.log('this.props', this.props);
      console.log('this.state', this.state);
      console.log('nextprops', nextProps);
      // Necessary to populate form when existing cheapflight is loaded directly.
      this.setState({
        cheapflight: Object.assign({}, nextProps.cheapflight)
      });
      let editorValue = this.state.editorValue;
      console.log((editorValue.toString('html') !== nextProps.cheapflight.seoparagraph)); //true
      if (editorValue.toString('html') !== nextProps.cheapflight.seoparagraph) {
        editorValue = RichTextEditor.createValueFromString(nextProps.cheapflight.seoparagraph, 'html');
        console.log(editorValue);
        this.setState({editorValue: editorValue});
      }
      console.log({editorValue});
    }
  }

  updateCheapFlightState(event) {
    const field = event.target.name;
    let cheapflight = Object.assign({}, this.state.cheapflight);
    cheapflight[field] = event.target.value;
    if (event.target.name == 'destinationName') {
      cheapflight.pageUrl = `/cheapflights-to-${cheapflight
        .destinationName
        .toLowerCase()
        .split(' ')
        .join('-')}.htm`;
    }
    return this.setState({cheapflight: cheapflight});
  }

  updateEditorChanges(editorValue) {
    this.setState({editorValue});
    console.log(editorValue.toString('html'));
    let cheapflight = Object.assign({}, this.state.cheapflight);
    cheapflight.seoparagraph = editorValue.toString('html');
    console.log(cheapflight.seoparagraph);
    return this.setState({cheapflight: cheapflight});
  }

  cheapFlightFormIsValid() {
    let formIsValid = true;
    let errors = {};
    if (this.state.cheapflight.user.length < 5) {
      errors.user = "Username must be at least 5 characters.";
      formIsValid = false;
    }
    this.setState({errors: errors});
    return formIsValid;
  }

  saveCheapflight(event) {
    event.preventDefault();
    if (!this.cheapFlightFormIsValid()) {
      return;
    }
    this.setState({saving: true});
    this
      .props
      .actions
      .saveCheapflight(this.state.cheapflight)
      .then(() => this.redirect())
      .catch(error => {
        toastr.error(error);
        this.setState({saving: false});
      });
  }

  redirect() {
    this.setState({saving: false});
    toastr.success("CheapFlight saved");
    this
      .context
      .router
      .push("/cheapflights-dashboard");
  }

  render() {
    return (
      <CheapFlightForm
        allRegions={this.props.regions}
        onChange={this.updateCheapFlightState}
        onEditorChange={this.updateEditorChanges}
        onSave={this.saveCheapflight}
        cheapflight={this.state.cheapflight}
        errors={this.state.errors}
        saving={this.state.saving}
        editorValue={this.state.editorValue}
      />
    );
  }
}

ManageCheapFlightPage.propTypes = {
  cheapflight: PropTypes.object.isRequired,
  regions: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

//Pull in the React Router context so router is available on this.context.router.
ManageCheapFlightPage.contextTypes = {
  router: PropTypes.object
};

function getCheapFlightById(cheapflights, id) {
  const cheapflight = cheapflights.filter(cheapflight => cheapflight.id == id);
  if (cheapflight.length) return cheapflight[0]; //since filter returns an array, have to grab the first.
  return null;
}

function mapStateToProps(state, ownProps) {
  const cheapFlightId = ownProps.params.id; // from the path `/cheapflight/:id`

  let cheapflight = {
    cmsPageId: "",
    id: "",
    editHref: "",
    destinationName: "",
    heading1: "",
    heading2: "",
    seoparagraph: "",
    user: "",
    typeof: "",
    pageUrl: "",
    noOfDestinations: "",
    noOfFlights: "",
    updatedOn: ""
  };

  if (cheapFlightId && state.cheapflights.length > 0) {
    cheapflight = getCheapFlightById(state.cheapflights, cheapFlightId);
    console.log(cheapflight);
    let editorValue = RichTextEditor.createValueFromString(cheapflight.seoparagraph, 'html');
    console.log(state);
    editorValue = this.state.editorValue;
    console.log('editorValue',state.editorValue);
    editorValue = this.state.editorValue;

  }

  return {
    cheapflight: cheapflight,
    regions: regionsFormattedForDropdown(state.regions)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(cheapFlightsActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(
  ManageCheapFlightPage
);
