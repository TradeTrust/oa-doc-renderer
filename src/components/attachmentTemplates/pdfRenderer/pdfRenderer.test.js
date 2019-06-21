import React from "react";
import { stub } from "sinon";
import { shallow } from "enzyme";
import samplePdfData from "../../../../test/fixtures/pdf";
import PdfRenderer from "./index";

const attachment = {
  data: samplePdfData
};

it("passes in pdf data to Document", () => {
  const component = shallow(
    <PdfRenderer attachment={attachment} handleHeightUpdate={() => {}} />
  );
  expect(component.get(0).props.file).toBe(
    `data:application/pdf;base64,${samplePdfData}`
  );
});

it("renders Page and calls handleHeightUpdate", () => {
  const numPages = 2;
  const handleHeightUpdate = stub();
  const component = shallow(
    <PdfRenderer
      attachment={attachment}
      handleHeightUpdate={handleHeightUpdate}
    />
  );

  // Simulate onDocumentLoadSuccess with 2 pages
  component.instance().onDocumentLoadSuccess({
    numPages
  });
  expect(component.state("numPages")).toBe(numPages);
  expect(handleHeightUpdate.called).toBe(true);

  // Checks that correct number of Page components have been loaded
  expect(component.children().length).toBe(numPages);

  // Checks the props of the Page component and simulate onLoadSuccess
  for (let i = 0; i < numPages; i += 1) {
    expect(component.children().get(i).props.pageNumber).toBe(i + 1);
    component
      .children()
      .get(i)
      .props.onLoadSuccess();
  }
  expect(handleHeightUpdate.callCount).toBe(numPages + 1);
});
