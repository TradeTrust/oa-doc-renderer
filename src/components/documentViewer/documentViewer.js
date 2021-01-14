import React, { Component } from "react";
import PropTypes from "prop-types";
import { documentTemplates } from "./utils";

<<<<<<< HEAD
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
=======
const DocumentViewer = props => {
  const { tabIndex, document, handleHeightUpdate, handleObfuscation } = props;
  const templates = documentTemplates(document, handleHeightUpdate);
  const Template = templates[tabIndex].template;

  return <Template document={document} handleObfuscation={handleObfuscation} />;
};
>>>>>>> b2becc348b91e3cd76ed126b2d1194833256f85e

DocumentViewer.propTypes = {
  document: PropTypes.object.isRequired,
  tabIndex: PropTypes.number,
  handleHeightUpdate: PropTypes.func.isRequired,
<<<<<<< HEAD
  updateParentTemplates: PropTypes.func
=======
  tabIndex: PropTypes.number,
  handleObfuscation: PropTypes.func
>>>>>>> b2becc348b91e3cd76ed126b2d1194833256f85e
};

export default DocumentViewer;
