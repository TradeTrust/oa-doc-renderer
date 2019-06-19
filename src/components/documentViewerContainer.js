import React, { Component } from "react";

import connectToParent from "penpal/lib/connectToParent";
import DocumentViewer from "./documentViewer";
import Templates from "./documentTemplates/default";
const inIframe = () => window.location !== window.parent.location;
const flatten = o => JSON.parse(JSON.stringify(o));

class DocumentViewerContainer extends Component {
  constructor(props) {
    super(props);

    this.handleCertificateChange = this.handleCertificateChange.bind(this);
    this.selectTemplateTab = this.selectTemplateTab.bind(this);
    this.updateHeight = this.updateHeight.bind(this);
    this.state = {
      parentFrameConnection: null,
      document: null,
      tabIndex: 0,
      nonce: 0
    };
  }

  updateHeight(h) {
    if (inIframe()) {
      this.state.parentFrameConnection.promise.then(parent => {
        if (parent.updateHeight) {
          parent.updateHeight(h);
        }
      });
    }
  }

  componentDidUpdate() {
    if (inIframe()) {
      this.state.parentFrameConnection.promise.then(parent => {
        if (parent.updateHeight) {
          parent.updateHeight(document.documentElement.offsetHeight + 60);
        }
        if (parent.updateTemplates) parent.updateTemplates(flatten(Templates));
      });
    }
  }

  componentDidMount() {
    const renderDocument = this.handleCertificateChange;
    const selectTemplateTab = this.selectTemplateTab;
    const frameHeight = document.documentElement.offsetHeight + 60;

    window.opencerts = {
      renderDocument,
      selectTemplateTab
    };

    if (inIframe()) {
      const parentFrameConnection = connectToParent({
        methods: {
          renderDocument,
          selectTemplateTab,
          frameHeight
        }
      });
      this.setState({ parentFrameConnection });
    }
  }

  selectTemplateTab(idx) {
    this.setState({ tabIndex: idx });
  }

  handleCertificateChange(doc) {
    this.setState({ document: doc });
  }

  render() {
    if (!this.state.document) {
      return null;
    }
    return (
      <DocumentViewer
        document={this.state.document}
        tabIndex={this.state.tabIndex}
        handleUpdate={this.updateHeight}
      />
    );
  }
}
export default DocumentViewerContainer;
