import React from "react";
import DocumentViewerContainer from "./documentViewerContainer";
import { shallow } from "enzyme";
import connectToParent from "penpal/lib/connectToParent";

const mockDocumentTemplateTabs = [
  { id: "template1", label: "Template 1" },
  { id: "template2", label: "Template 2" }
];

jest.mock("./documentViewer", () => jest.fn());
jest.mock("penpal/lib/connectToParent", () => jest.fn());
jest.mock("./utils", () => ({
  inIframe: () => true,
  documentTemplateTabs: () => mockDocumentTemplateTabs
}));

const mockParent = {
  updateHeight: jest.fn(),
  updateTemplates: jest.fn()
};

connectToParent.mockReturnValue({ promise: Promise.resolve(mockParent) });

const resetMocks = () => {
  connectToParent.mockClear();
  mockParent.updateHeight.mockClear();
  mockParent.updateTemplates.mockClear();
};

beforeEach(() => {
  resetMocks();
});

it("returns null if there are no document", () => {
  const component = shallow(<DocumentViewerContainer />);
  expect(component.isEmptyRender()).toBe(true);
});

it("initialise and save connection to parent on mount to parentFrameConnection", () => {
  const component = shallow(<DocumentViewerContainer />);

  expect(connectToParent).toHaveBeenCalled();
  expect(connectToParent.mock.calls[0][0].methods.renderDocument).toBeTruthy();
  expect(connectToParent.mock.calls[0][0].methods.renderDocument).toBeTruthy();
  expect(component.state("parentFrameConnection")).toBeTruthy();
});

it("calls parent frame's updateHeight when updateParentHeight is called", async () => {
  const component = shallow(<DocumentViewerContainer />);
  resetMocks();
  await component.instance().updateParentHeight(1337);
  expect(mockParent.updateHeight).toHaveBeenCalledWith(1337);
});

it("calls parent frame's updateTemplates when updateParentTemplateTabs is called", async () => {
  const component = shallow(<DocumentViewerContainer />);
  resetMocks();
  await component.instance().updateParentTemplateTabs();
  expect(mockParent.updateTemplates).toHaveBeenCalledWith(
    mockDocumentTemplateTabs
  );
});
