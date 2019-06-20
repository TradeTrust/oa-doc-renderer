import React from "react";
import PropTypes from "prop-types";
import PdfRenderer from "./pdfRenderer";
import NullRenderer from "./nullRenderer";

const selectRenderer = ({ attachment, handleHeightUpdate }) => {
  const { type } = attachment;
  let AttachmentRenderer;

  switch (type) {
    case "application/pdf":
      AttachmentRenderer = PdfRenderer;
      break;
    default:
      AttachmentRenderer = NullRenderer;
  }

  const template = () => (
    <AttachmentRenderer
      attachment={attachment}
      handleHeightUpdate={handleHeightUpdate}
    />
  );

  return template;
};

export default selectRenderer;

selectRenderer.propTypes = {
  attachment: PropTypes.object.isRequired,
  handleHeightUpdate: PropTypes.func.isRequired
};
