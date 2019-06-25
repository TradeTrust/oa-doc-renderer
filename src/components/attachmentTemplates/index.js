import React from "react";
import PropTypes from "prop-types";
import PdfRenderer from "./pdfRenderer";
import NullRenderer from "./nullRenderer";

// Generates a template function depending on attachment type
export const attachmentTemplateSelector = ({
  attachment,
  handleHeightUpdate
}) => {
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

attachmentTemplateSelector.propTypes = {
  attachment: PropTypes.object.isRequired,
  handleHeightUpdate: PropTypes.func.isRequired
};

const attachmentToTemplates = (attachments, handleHeightUpdate) => {
  return attachments.map((attachment, index) => {
    return {
      id: `attachment-${index}`,
      label: attachment.filename,
      template: attachmentTemplateSelector({ attachment, handleHeightUpdate })
    };
  });
};

export default attachmentToTemplates;
