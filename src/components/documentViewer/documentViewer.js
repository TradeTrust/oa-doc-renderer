import React, { Component } from "react";
import PropTypes from "prop-types";
import { documentTemplates } from "./utils";

class DocumentViewer extends Component {
  componentDidMount() {
    const { updateParentTemplates, document, handleHeightUpdate } = this.props;
    const templates = documentTemplates(document, handleHeightUpdate);
    handleHeightUpdate();
    updateParentTemplates(templates);
  }
  render() {
    const { tabIndex, document, handleHeightUpdate } = this.props;
    const templates = documentTemplates(document, handleHeightUpdate);
    const Template = templates[tabIndex].template;

    return <Template document={document} />;
  }
}

DocumentViewer.propTypes = {
  document: PropTypes.object.isRequired,
  tabIndex: PropTypes.number,
  handleHeightUpdate: PropTypes.func.isRequired,
  updateParentTemplates: PropTypes.func
};

export default DocumentViewer;
