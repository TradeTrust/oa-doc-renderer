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

export const documentTemplateTabs = template =>
  template ? template.map(o => ({ label: o.label, id: o.id })) : null;

// Originally using https://tommcfarlin.com/check-if-a-page-is-in-an-iframe/
// Currently using https://stackoverflow.com/questions/326069/how-to-identify-if-a-webpage-is-being-loaded-inside-an-iframe-or-directly-into-t
export const inIframe = () => {
  try {
    return window.self !== window.top;
  } catch (e) {
    return true;
  }
};
