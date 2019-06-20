import React from "react";

import templateRegistry from "../../templates";
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

export const documentTemplates = (document, handleHeightUpdate) => {
  if (!document) return [];
  // Find the template in the template registry or use a default template
  const templateName = get(document, "$template.name");
  const selectedTemplate = templateRegistry[templateName] || templateRegistry.default;

  // Create additional tabs from attachments, passing in handleHeightUpdate to allow
  // attachment renderers to update parent component height
  const templatesFromAttachments = attachmentToTemplate(
    get(document, "attachments", []),
    handleHeightUpdate
  );
  return [...selectedTemplate, ...templatesFromAttachments];
};

export const documentTemplateTabs = document => {
  const templates = documentTemplates(document);
  return templates.map(template => ({
    id: template.id,
    label: template.label
  }));
};
