import templateRegistry from "../../templates";
import { get } from "lodash";
import selectRenderer from "../../attachmentRenderer";

export const attachmentToTemplate = (attachments, handleHeightUpdate) => {
  return attachments.map((attachment, index) => {
    return {
      id: `attachment-${index}`,
      label: attachment.filename,
      template: selectRenderer({ attachment, handleHeightUpdate })
    };
  });
};

export const documentTemplates = (document, handleHeightUpdate) => {
  if (!document) return [];
  // Find the template in the template registry or use a default template
  const templateName = get(document, "$template.name");
  const selectedTemplate =
    templateRegistry[templateName] || templateRegistry.default;

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
