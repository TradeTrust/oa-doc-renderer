import React from "react";
import PropTypes from "prop-types";

const NullRenderer = ({ attachment }) => (
  <div>
    <h2>Rendering of this type of attachment is not supported.</h2>
    <p>Please check your mimetype: {attachment.type}</p>
  </div>
);

export default NullRenderer;

NullRenderer.propTypes = {
  attachment: PropTypes.shape({
    type: PropTypes.string.isRequired
  }).isRequired
};
