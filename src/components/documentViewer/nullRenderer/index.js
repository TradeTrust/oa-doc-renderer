import React from "react";

export default ({ attachment }) => (
  <div>
    <h2>Rendering of this type of attachment is not supported.</h2>
    <p>Please check your mimetype: {attachment.type}</p>
  </div>
);
