import templateRegistry from "../../templates";
import { get } from "lodash";
import attachmentToTemplates from "../../attachmentTemplates";

export const documentTemplates = (document, handleHeightUpdate) => {
  if (!document) return [];
  // Find the template in the template registry or use a default template
  const templateName = get(document, "$template.name");
  const selectedTemplate =
    templateRegistry[templateName] || templateRegistry.default;

  // Create additional tabs from attachments, passing in handleHeightUpdate to allow
  // attachment renderers to update parent component height
  const templatesFromAttachments = attachmentToTemplates(
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
