import React from "react";
import DocumentViewer from "./documentViewer";
import { documentTemplates } from "./utils";
import { mount } from "enzyme";

jest.mock("./utils", () => ({
  documentTemplates: jest.fn()
}));

const mockUpdateParentHeight = jest.fn();
const mockUpdateParentTemplates = jest.fn();

it("renders the right template depending on the tabIndex", () => {
  /* eslint-disable */
  documentTemplates.mockReturnValue([
    { template: ({ document }) => <div id="content">{document.foo}</div> },
    { template: ({ document }) => <div id="content">{document.cow}</div> }
  ]);
  /* eslint-enable */

  const document = { foo: "bar", cow: "moo" };
  const component = mount(
    <DocumentViewer
      document={document}
      handleHeightUpdate={mockUpdateParentHeight}
      updateParentTemplates={mockUpdateParentTemplates}
      tabIndex={0}
    />
  );
  // componentDidMount functions should be called
  expect(mockUpdateParentHeight).toHaveBeenCalled();
  expect(mockUpdateParentTemplates).toHaveBeenCalled();

  // Check content from tab 1
  expect(component.find("#content").text()).toBe("bar");

  // Check content from tab 2
  component.setProps({ tabIndex: 1 });
  expect(component.find("#content").text()).toBe("moo");
});
