import React from 'react';
import TextInput from '../common/TextInput';
import SelectInput from '../common/SelectInput';
import ClicktoEditInput from '../common/ClicktoEditInput';

const CheapFlightForm = ({cheapflight, allRegions, onSave, onChange, saving, errors}) => {
  return (

    <section style={{ paddingLeft: 30 }} className="main bookingEng flights searchConfig" data-page-name="bookingEngineFlightsSearchConfig">
      <form>
      <ClicktoEditInput
        name="pageUrl"
        label="URL (auto-generated)"
        value={cheapflight.pageUrl}
        onChange={onChange}
        error={errors.pageUrl} />

      <SelectInput
        name="destinationName"
        label="Select Region"
        value={cheapflight.destinationName}
        defaultOption="Select Destionation Name"
        options={allRegions}
        onChange={onChange}
        error={errors.destinationName} />

      <TextInput
        name="typeof"
        label="type"
        inputType="text"
        value={cheapflight.typeof}
        onChange={onChange}
        error={errors.typeof} />

      <TextInput
        name="user"
        label="user"
        value={cheapflight.user}
        onChange={onChange}
        error={errors.user}
        inputType="text" />

      <TextInput
        name="noOfDestinations"
        label="noOfDestinations"
        value={cheapflight.noOfDestinations}
        onChange={onChange}
        error={errors.noOfDestinations}
        inputType="text" />

      <input
        type="submit"
        disabled={saving}
        value={saving ? 'Saving...' : 'Save'}
        className="btn btn-primary"
        onClick={onSave} />
      </form>
    </section>
  );
};

CheapFlightForm.propTypes = {
  cheapflight: React.PropTypes.object.isRequired,
  allRegions: React.PropTypes.array,
  onSave: React.PropTypes.func.isRequired,
  onChange: React.PropTypes.func.isRequired,
  saving: React.PropTypes.bool,
  errors: React.PropTypes.object
};

export default CheapFlightForm;
