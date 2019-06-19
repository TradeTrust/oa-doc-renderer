import React from "react";
import PropTypes from "prop-types";
import DefaultTemplates from "../documentTemplates/default";
import { get } from "lodash";

import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${
  pdfjs.version
}/pdf.worker.js`;

class PDF extends React.Component {
  state = {
    numPages: null
  };

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  };

  onPageLoadSuccess = () => {
    this.props.handleUpdate(document.documentElement.offsetHeight);
  };

  render() {
    const { data } = this.props;
    const { numPages } = this.state;

    return (
      <Document
        file={`data:application/pdf;base64,${data}`}
        onLoadSuccess={this.onDocumentLoadSuccess}
      >
        {Array.from(new Array(numPages), (el, index) => (
          <Page
            key={`page_${index + 1}`}
            pageNumber={index + 1}
            onLoadSuccess={this.onPageLoadSuccess}
          />
        ))}
      </Document>
    );
  }
}

const pdfRenderer = (pdf, handleUpdate) => (
  // <Document file={`data:application/pdf;base64,${pdf}`}>
  //   <Page pageNumber={1} />
  // </Document>
  <PDF data={pdf} handleUpdate={handleUpdate} />
);

const attachmentToTemplate = (attachments, handleUpdate) => {
  console.log(attachments);
  return attachments.map((attachment, index) => ({
    id: `attachment-${index}`,
    label: attachment.filename,
    template: () => pdfRenderer(attachment.data, handleUpdate)
  }));
};

const DocumentViewer = props => {
  const { tabIndex, document, handleUpdate } = props;
  const TemplatesFromAttachments = attachmentToTemplate(
    get(document, "attachments", []),
    handleUpdate
  );
  const Templates = [...DefaultTemplates, ...TemplatesFromAttachments];
  const Template = Templates[tabIndex].template;
  console.log(Templates);
  console.log(document);

  return <Template document={document} />;
};

DocumentViewer.propTypes = {
  document: PropTypes.object.isRequired,
  tabIndex: PropTypes.number
};

export default DocumentViewer;
