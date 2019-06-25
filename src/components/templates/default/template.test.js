import React from "react";
import renderer from "react-test-renderer";
import templates from "./index";
import Template from "./template";

describe("index", () => {
  it("exports a templates array", () => {
    expect(Array.isArray(templates)).toBe(true);
    templates.forEach(template => {
      expect(template.id).toBeTruthy();
      expect(template.label).toBeTruthy();
      expect(typeof template.template).toBe("function");
    });
  });
});

describe("default template", () => {
  it("matches snapshot", () => {
    const document = { foo: "bar" };
    const component = renderer.create(<Template document={document} />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
