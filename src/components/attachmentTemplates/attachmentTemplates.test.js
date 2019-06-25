import React from "react";
import attachmentToTemplates, { attachmentTemplateSelector } from "./index";
import PdfRenderer from "./pdfRenderer";
import NullRenderer from "./nullRenderer";
import { mount } from "enzyme";

jest.mock("./pdfRenderer", () => jest.fn());
jest.mock("./nullRenderer", () => jest.fn());

PdfRenderer.mockReturnValue(<div>FROM PDF RENDERER</div>);
NullRenderer.mockReturnValue(<div>FROM NULL RENDERER</div>);

describe("attachmentTemplateSelector", () => {
  it("returns the PdfRenderer if the attachment type is application/pdf", () => {
    const handleHeightUpdate = jest.fn();
    const attachment = {
      type: "application/pdf",
      data: "data passed into renderer"
    };
    const Template = attachmentTemplateSelector({
      attachment,
      handleHeightUpdate
    });
    const component = mount(<Template />);
    const wrappedRenderer = component.children();
    expect(component.text()).toBe("FROM PDF RENDERER");
    expect(wrappedRenderer.prop("handleHeightUpdate")).toEqual(
      handleHeightUpdate
    );
    expect(wrappedRenderer.prop("attachment")).toEqual(attachment);
  });

  it("returns the NullRenderer if the attachment type is application/pdf", () => {
    const handleHeightUpdate = jest.fn();
    const attachment = {
      type: "unsupported/mimetype",
      data: "data passed into renderer"
    };
    const Template = attachmentTemplateSelector({
      attachment,
      handleHeightUpdate
    });
    const component = mount(<Template />);
    const wrappedRenderer = component.children();
    expect(component.text()).toBe("FROM NULL RENDERER");
    expect(wrappedRenderer.prop("handleHeightUpdate")).toEqual(
      handleHeightUpdate
    );
    expect(wrappedRenderer.prop("attachment")).toEqual(attachment);
  });
});

describe("attachmentToTemplates", () => {
  it("returns a map of the attachments to their rendering template tabs", () => {
    const handleHeightUpdate = jest.fn();
    const attachments = [
      {
        type: "unsupported/mimetype",
        data: "data passed into renderer",
        filename: "movie.mov"
      },
      {
        type: "application/pdf",
        data: "data passed into renderer",
        filename: "document.pdf"
      }
    ];

    const templateTabs = attachmentToTemplates(attachments, handleHeightUpdate);
    expect(templateTabs.length).toBe(2);

    const Template1 = templateTabs[0].template;
    const rendereredAttachment1 = mount(<Template1 />);
    expect(rendereredAttachment1.text()).toBe("FROM NULL RENDERER");

    const Template2 = templateTabs[1].template;
    const rendereredAttachment2 = mount(<Template2 />);
    expect(rendereredAttachment2.text()).toBe("FROM PDF RENDERER");
  });
});
