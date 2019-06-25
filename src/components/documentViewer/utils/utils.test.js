import { documentTemplates, documentTemplateTabs } from "./index";

jest.mock("../../templates", () => ({
  default: [
    { id: "default", label: "DEFAULT_TEMPLATE", template: "TEMPLATE_FN" }
  ],
  custom: [{ id: "custom", label: "CUSTOM_TEMPLATE", template: "TEMPLATE_FN" }]
}));
jest.mock("../../attachmentTemplates", () => () => [
  {
    id: "attachment1",
    label: "TEMPLATE_FROM_ATTACHMENT1",
    template: "TEMPLATE_FN"
  },
  {
    id: "attachment2",
    label: "TEMPLATE_FROM_ATTACHMENT2",
    template: "TEMPLATE_FN"
  }
]);

describe("documentTemplates", () => {
  it("returns empty array if there is no document", () => {
    expect(documentTemplates()).toEqual([]);
  });

  it("returns the default template and attachments if there are no template specified", () => {
    const document = {};
    const templates = documentTemplates(document);
    expect(templates).toEqual([
      { id: "default", label: "DEFAULT_TEMPLATE", template: "TEMPLATE_FN" },
      {
        id: "attachment1",
        label: "TEMPLATE_FROM_ATTACHMENT1",
        template: "TEMPLATE_FN"
      },
      {
        id: "attachment2",
        label: "TEMPLATE_FROM_ATTACHMENT2",
        template: "TEMPLATE_FN"
      }
    ]);
  });

  it("returns the named template and attachments if there is a template name", () => {
    const document = { $template: { name: "custom" } };
    const templates = documentTemplates(document);
    expect(templates).toEqual([
      { id: "custom", label: "CUSTOM_TEMPLATE", template: "TEMPLATE_FN" },
      {
        id: "attachment1",
        label: "TEMPLATE_FROM_ATTACHMENT1",
        template: "TEMPLATE_FN"
      },
      {
        id: "attachment2",
        label: "TEMPLATE_FROM_ATTACHMENT2",
        template: "TEMPLATE_FN"
      }
    ]);
  });
});

describe("documentTemplateTabs", () => {
  it("returns only the id and label of the template object", () => {
    const document = { $template: { name: "custom" } };
    const templates = documentTemplateTabs(document);
    expect(templates).toEqual([
      { id: "custom", label: "CUSTOM_TEMPLATE" },
      { id: "attachment1", label: "TEMPLATE_FROM_ATTACHMENT1" },
      { id: "attachment2", label: "TEMPLATE_FROM_ATTACHMENT2" }
    ]);
  });
});
