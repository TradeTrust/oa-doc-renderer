[![Build Status](https://travis-ci.org/TradeTrust/document-renderer.svg?branch=master)](https://travis-ci.org/TradeTrust/document-renderer)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=TradeTrust_document-renderer&metric=alert_status)](https://sonarcloud.io/dashboard?id=TradeTrust_document-renderer)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=TradeTrust_document-renderer&metric=coverage)](https://sonarcloud.io/dashboard?id=TradeTrust_document-renderer)

# Decentralised Document Renderer

The project allow you to run your own document renderer compatible with the OpenAttestation standards. To customise the look and feel of your document, you may style a template to render it, host a copy of this renderer and then point your document to render with the hosted renderer. 

# Running the renderer

`npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

You will notice a blank page. This is normal as the renderer does not render anything until a document object is passed into it. 

To see the render in action, you may embed it in an iframe and use postMessage to interact with it. 

A sample iframe html file is included in `test/index.html` to help you test your renderer.

# Styling your document

The templates are defined in `src/components/templates`. 

## Basic styling

If you are only rendering one type of document, you may style the default template at `src/components/templates/default/template.js`. 

## Multiple document templates

If the renderer is meant to render more than one template, it will be differentiated by the document template name. The name of the template to render should correspond to the keys in `src/components/templates/index.js`.

# Deploying the site

`npm run build`

Builds the site into a static site.<br>
You may serve the site from the `build` folder.