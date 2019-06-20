import React from "react";

import DefaultTemplates from "../../documentTemplates/default";
import { get } from "lodash";
import PdfRenderer from "../pdfRenderer";

export const attachmentToTemplate = (attachments, handleHeightUpdate) => {
  return attachments.map(({ filename, data }, index) => {
    // TODO: Switch renderer by attachment type
    return {
      id: `attachment-${index}`,
      label: filename,
      template: () => (
        <PdfRenderer data={data} handleHeightUpdate={handleHeightUpdate} />
      )
    };
  });
};

// Given a document, return an array of template object
// Each template object will have id, label and a template function
// handleHeightUpdate() can be passed into these templates if they need to trigger
export const documentTemplates = (document, handleHeightUpdate) => {
  // TODO: Switch template by the template name instead of using just the default template
  if (!document) return [];
  const selectedTemplate = DefaultTemplates;
  const templatesFromAttachments = attachmentToTemplate(
    get(document, "attachments", []),
    handleHeightUpdate
  );
  return [...selectedTemplate, ...templatesFromAttachments];
};

// Returning only the id and labels for the templates
export const documentTemplateTabs = document => {
  const templates = documentTemplates(document);
  return templates.map(template => ({
    id: template.id,
    label: template.label
  }));
};
