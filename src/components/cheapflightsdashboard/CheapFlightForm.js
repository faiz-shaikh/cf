import React from "react";
import TextInput from "../common/TextInput";
import SelectInput from "../common/SelectInput";
import ClicktoEditInput from "../common/ClicktoEditInput";
import SectionHeader from "../common/SectionHeader";
import RichTextEditor from '../common/WYSIWYG';


const CheapFlightForm = ({
  cheapflight,
  editorValue,
  editorValue2,
  allRegions,
  onSave,
  onChange,
  onEditorChange,
  onEditorChange2,
  saving,
  errors
}) => {
  return (
    <section
      style={{ paddingLeft: 30 }}
      className="main bookingEng flights searchConfig"
      data-page-name="bookingEngineFlightsSearchConfig"
    >
      <form>
      {cheapflight.cmsPageId && <div className="form-group row clearfix"><label htmlFor="cmsPageId">PageID#</label><div className="field"><input type="text" name="cmsPageId" style={{'border':'none'}} className="form-control" value={cheapflight.cmsPageId} disabled/></div></div>}
        <SelectInput
          name="destinationName"
          label="Select Region"
          value={cheapflight.destinationName}
          defaultOption="Select Destionation Name"
          options={allRegions}
          onChange={onChange}
          error={errors.destinationName}
        />

        <ClicktoEditInput
          name="pageUrl"
          label="URL (auto-generated)"
          value={cheapflight.pageUrl}
          onChange={onChange}
          error={errors.pageUrl}
        />

        <SectionHeader text="Destination SEO Content" />

        <TextInput
          name="seoContentMainHeading"
          label="H1"
          inputType="text"
          value={cheapflight.seoContentMainHeading}
          onChange={onChange}
          error={errors.seoContentMainHeading}
        />

        <TextInput
        name="seoContentHeading1"
        label="H2"
        inputType="text"
        value={cheapflight.seoContentHeading1}
        onChange={onChange}
        error={errors.seoContentHeading1}
      />

        <RichTextEditor
        name="seoContentParagraph1"
        label="Paragraph"
        value={editorValue}
        onChange={onEditorChange}
        />

        <TextInput
        name="seoContentHeading2"
        label="H2"
        inputType="text"
        value={cheapflight.seoContentHeading2}
        onChange={onChange}
        error={errors.seoContentHeading2}
        />

        <RichTextEditor
        name="seoContentParagraph2"
        label="Paragraph"
        value={editorValue2}
        onChange={onEditorChange2}
        />

        <SectionHeader text="Campaign Module" />

        <SectionHeader text="Content" />

        <TextInput
        name="topDestinationsHeading"
        label="Top Destinations Heading"
        inputType="text"
        value={cheapflight.topDestinationsHeading}
        onChange={onChange}
        error={errors.topDestinationsHeading}
      />

        <RichTextEditor
        name="topDestinationsParagraph"
        label="Top Destinations Paragraph"
        value={editorValue}
        onChange={onEditorChange}
        />

        <TextInput
          name="typeOf"
          label="type"
          inputType="hidden"
          value={cheapflight.typeOf}
          onChange={onChange}
          error={errors.typeOf}
        />

        <TextInput
          name="user"
          label="user"
          value={cheapflight.user}
          onChange={onChange}
          error={errors.user}
          inputType="text"
        />

        <TextInput
          name="noOfDestinations"
          label="noOfDestinations"
          value={cheapflight.noOfDestinations}
          onChange={onChange}
          error={errors.noOfDestinations}
          inputType="text"
        />

        <input
          type="submit"
          disabled={saving}
          value={saving ? "Saving..." : "Save"}
          className="btn btn-primary"
          onClick={onSave}
        />
      </form>
    </section>
  );
};

CheapFlightForm.propTypes = {
  cheapflight: React.PropTypes.object.isRequired,
  editorValue: React.PropTypes.object.isRequired,
  editorValue2: React.PropTypes.object.isRequired,
  allRegions: React.PropTypes.array,
  onSave: React.PropTypes.func.isRequired,
  onChange: React.PropTypes.func.isRequired,
  onEditorChange: React.PropTypes.func.isRequired,
  onEditorChange2: React.PropTypes.func.isRequired,
  saving: React.PropTypes.bool,
  errors: React.PropTypes.object
};

export default CheapFlightForm;
