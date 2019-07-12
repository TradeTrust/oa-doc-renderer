import React, { Component } from "react";

import connectToParent from "penpal/lib/connectToParent";
import DocumentViewer from "./documentViewer";
import { documentTemplateTabs, inIframe } from "./utils";

export const HEIGHT_OFFSET = 60; // Height offset to prevent double scrollbar in certain browsers
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

  updateHeightWhenResize() {
    window.addEventListener("resize", this.updateParentHeight);
  }

  // Use postMessage to update iframe's parent to scale the height
  async updateParentHeight() {
    if (inIframe()) {
      const { parentFrameConnection } = this.state;
      const parent = await parentFrameConnection;
      if (parent.updateHeight)
        await parent.updateHeight(document.documentElement.offsetHeight);
    }
  }

  // Use postMessage to update iframe's parent on the selection of templates available for this document
  async updateParentTemplateTabs() {
    const templates = await documentTemplateTabs(this.state.document);
    this.setState({ templates });
    if (inIframe()) {
      const { parentFrameConnection } = this.state;
      const parent = await parentFrameConnection;
      if (parent.updateTemplates) {
        await parent.updateTemplates(documentTemplateTabs(this.state.document));
      }
    }
  }

  selectTemplateTab(tabIndex) {
    this.setState({ tabIndex });
  }

  handleDocumentChange(document) {
    this.setState({ document });
    this.updateParentTemplateTabs();
  }

  componentDidUpdate() {
    this.updateParentHeight();
  }

  componentDidMount() {
    const renderDocument = this.handleDocumentChange;
    const selectTemplateTab = this.selectTemplateTab;
    const getTemplates = () => this.state.templates;

    window.openAttestation = {
      renderDocument,
      selectTemplateTab,
      getTemplates
    };

    if (inIframe()) {
      const parentFrameConnection = connectToParent({
        methods: {
          renderDocument,
          selectTemplateTab
        }
      }).promise;
      this.setState({ parentFrameConnection });
    }
    this.updateHeightWhenResize();
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
