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
      editorValue: this.props.cheapflight.seoContentParagraph1 ?
      RichTextEditor.createValueFromString(this.props.cheapflight.seoContentParagraph1, 'html') :
      RichTextEditor.createEmptyValue(),
      editorValue2: this.props.cheapflight.seoContentParagraph2 ?
      RichTextEditor.createValueFromString(this.props.cheapflight.seoContentParagraph2, 'html') :
      RichTextEditor.createEmptyValue()
    };

    this.updateCheapFlightState = this.updateCheapFlightState.bind(this);
    this.saveCheapflight = this.saveCheapflight.bind(this);
    this.updateEditorChanges = this.updateEditorChanges.bind(this);
    this.updateEditorChanges2 = this.updateEditorChanges2.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.cheapflight.id != nextProps.cheapflight.id) {
      // Necessary to populate form when existing cheapflight is loaded directly.
      this.setState({
        cheapflight: Object.assign({}, nextProps.cheapflight)
      });
      let editorValue = this.state.editorValue;
      if (editorValue.toString('html') !== nextProps.cheapflight.seoContentParagraph1) {
        editorValue = RichTextEditor.createValueFromString(nextProps.cheapflight.seoContentParagraph1, 'html');
        this.setState({editorValue: editorValue});
      }
      let editorValue2 = this.state.editorValue2;
      if (editorValue2.toString('html') !== nextProps.cheapflight.seoContentParagraph2) {
        editorValue2 = RichTextEditor.createValueFromString(nextProps.cheapflight.seoContentParagraph2, 'html');
        this.setState({editorValue2: editorValue2});
      }
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
    let cheapflight = Object.assign({}, this.state.cheapflight);
   cheapflight.seoContentParagraph1 = editorValue.toString('html');
    return this.setState({cheapflight: cheapflight});
  }

  updateEditorChanges2(editorValue2) {
    this.setState({editorValue2});
    let cheapflight = Object.assign({}, this.state.cheapflight);
   cheapflight.seoContentParagraph2 = editorValue2.toString('html');
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
        onEditorChange2={this.updateEditorChanges2}
        onSave={this.saveCheapflight}
        cheapflight={this.state.cheapflight}
        errors={this.state.errors}
        saving={this.state.saving}
        editorValue={this.state.editorValue}
        editorValue2={this.state.editorValue2}
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
    seoContentMainHeading: "",
    seoContentHeading1: "",
    seoContentParagraph1: "",
    seoContentHeading2: "",
    seoContentParagraph2: "",
    topDestinationsHeading: "",
    topDestinationsParagraph: "",
    user: "",
    typeof: "",
    pageUrl: "",
    noOfDestinations: "",
    noOfFlights: "",
    updatedOn: ""
  };

  if (cheapFlightId && state.cheapflights.length > 0) {
    cheapflight = getCheapFlightById(state.cheapflights, cheapFlightId);
    // let editorValue = RichTextEditor.createValueFromString(cheapflight.seoparagraph, 'html');
    // console.log(state);
    // editorValue = this.state.editorValue;
    // console.log('editorValue',state.editorValue);
    // editorValue = this.state.editorValue;

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
