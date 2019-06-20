import React from "react";
import PropTypes from "prop-types";
import "bootstrap/dist/css/bootstrap.css";

const Template = ({ document }) => (
  <div className="container">
    <pre>{JSON.stringify(document, null, 2)}</pre>
  </div>
);

Template.propTypes = {
  document: PropTypes.object.isRequired
};

export default Template;
