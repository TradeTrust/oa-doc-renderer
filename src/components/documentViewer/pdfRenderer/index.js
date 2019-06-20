import React, { Component } from "react";
import PropTypes from "prop-types";
import { range } from "lodash";
import { Document, Page, pdfjs } from "react-pdf";

// https://github.com/wojtekmaj/react-pdf#browserify-and-others
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${
  pdfjs.version
}/pdf.worker.js`;

export default class PdfRenderer extends Component {
  state = {
    numPages: null
  };

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
    this.props.handleHeightUpdate(document.documentElement.offsetHeight);
  };

  onPageLoadSuccess = () => {
    this.props.handleHeightUpdate(document.documentElement.offsetHeight);
  };

  render() {
    const { data } = this.props;
    const { numPages } = this.state;

    return (
      <Document
        className="container"
        file={`data:application/pdf;base64,${data}`}
        onLoadSuccess={this.onDocumentLoadSuccess}
      >
        {range(numPages).map(index => (
          // TODO: Dynamically resize width to fit container
          // https://github.com/wojtekmaj/react-pdf/issues/129
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

PdfRenderer.propTypes = {
  data: PropTypes.string.isRequired,
  handleHeightUpdate: PropTypes.func.isRequired
};
