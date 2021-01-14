import React from "react";
import DocumentViewerContainer from "./documentViewerContainer";
import { shallow } from "enzyme";

jest.mock("./documentViewer", () => jest.fn());

jest.mock("./utils", () => ({
  inIframe: () => false,
  documentTemplateTabs: () => jest.fn()
}));

it("returns null if there are no document", () => {
  const component = shallow(<DocumentViewerContainer />);
  expect(component.isEmptyRender()).toBe(true);
});

it("initialise window methods on mount", () => {
  const component = shallow(<DocumentViewerContainer />);
  window.openAttestation.renderDocument("NEW_DOCUMENT");
  expect(component.state("document")).toBe("NEW_DOCUMENT");

  window.openAttestation.selectTemplateTab(2);
  expect(component.state("tabIndex")).toBe(2);
});

it("does not initialise connection to parent not in iframe on mount", () => {
  const component = shallow(<DocumentViewerContainer />);
  expect(component.state("parentFrameConnection")).toBe(null);
});

it("sets document state when handleDocumentChange is called", () => {
  const component = shallow(<DocumentViewerContainer />);
  component.instance().handleDocumentChange("DOCUMENT");
  expect(component.state("document")).toBe("DOCUMENT");
});

it("sets tabIndex state when selectTemplateTab is called", () => {
  const component = shallow(<DocumentViewerContainer />);
  component.instance().selectTemplateTab(5);
  expect(component.state("tabIndex")).toBe(5);
});

it("does not crash when updateParentTemplateTabs is called when not in iframe", () => {
  const component = shallow(<DocumentViewerContainer />);
  component.instance().updateParentTemplateTabs("TABS");
});

it("does not crash when updateParentHeight is called when not in iframe", () => {
  const component = shallow(<DocumentViewerContainer />);
  component.instance().updateParentHeight();
});
