import React, { PropTypes } from "react";

const SectionHeader = ({text}) => {
    return (
        <header className="contentHeader clearfix">
            <h1>{text}</h1>
        </header>
    );
};


SectionHeader.propTypes = {
    text: PropTypes.string.isRequired
};
    
export default SectionHeader;