import React from "react";
import renderer from "react-test-renderer";
import NullRenderer from "./index";

it("matches snapshot", () => {
  const attachment = { type: "application/epub+zip" };
  const component = renderer.create(<NullRenderer attachment={attachment} />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
