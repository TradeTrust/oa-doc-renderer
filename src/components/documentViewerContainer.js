import React, { Component } from "react";

import connectToParent from "penpal/lib/connectToParent";
import DocumentViewer from "./documentViewer";
import { documentTemplateTabs } from "./documentViewer/utils";

const HEIGHT_OFFSET = 60; // Height offset to prevent double scrollbar in certain browsers
const inIframe = () => window.location !== window.parent.location;
class DocumentViewerContainer extends Component {
  constructor(props) {
    super(props);

    this.handleDocumentChange = this.handleDocumentChange.bind(this);
    this.selectTemplateTab = this.selectTemplateTab.bind(this);
    this.updateParentHeight = this.updateParentHeight.bind(this);
    this.updateParentTemplateTabs = this.updateParentTemplateTabs.bind(this);
    this.state = {
      parentFrameConnection: null,
      document: null,
      tabIndex: 0
    };
  }

  updateParentHeight(height) {
    const { parentFrameConnection } = this.state;
    if (inIframe()) {
      parentFrameConnection.promise.then(parent => {
        if (parent.updateHeight) {
          parent.updateHeight(height);
        }
      });
    }
  }

  updateParentTemplateTabs() {
    const { parentFrameConnection } = this.state;
    if (inIframe()) {
      parentFrameConnection.promise.then(parent => {
        if (parent.updateTemplates) {
          parent.updateTemplates(documentTemplateTabs(this.state.document));
        }
      });
    }
  }

  selectTemplateTab(tabIndex) {
    this.setState({ tabIndex });
  }

  handleDocumentChange(document) {
    this.setState({ document });
  }

  componentDidUpdate() {
    this.updateParentTemplateTabs();
    this.updateParentHeight(
      document.documentElement.offsetHeight + HEIGHT_OFFSET
    );
  }

  componentDidMount() {
    const renderDocument = this.handleDocumentChange;
    const selectTemplateTab = this.selectTemplateTab;

    window.opencerts = {
      renderDocument,
      selectTemplateTab
    };

    if (inIframe()) {
      const parentFrameConnection = connectToParent({
        methods: {
          renderDocument,
          selectTemplateTab
        }
      });
      this.setState({ parentFrameConnection });
    }
  }

  render() {
    if (!this.state.document) {
      return null;
    }
    return (
      <DocumentViewer
        document={this.state.document}
        tabIndex={this.state.tabIndex}
        handleHeightUpdate={this.updateParentHeight}
      />
    );
  }
}
export default DocumentViewerContainer;
