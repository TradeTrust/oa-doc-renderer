import React, { ButtonHTMLAttributes, FunctionComponent } from "react";
import { TemplateProps } from "@govtechsg/decentralized-renderer-react-components";
import "bootstrap/dist/css/bootstrap.css";
import { GovtechOpencertsTemplateCertificate } from "../samples";

export const MediaTemplate: FunctionComponent<ButtonHTMLAttributes<any>> = () => (
  <div className="embed-responsive embed-responsive-16by9">
    <iframe
      id="youtube-vid"
      className="embed-responsive-item"
      src="https://www.youtube.com/embed/oskddwGpwUw?autoplay=1"
      allowFullScreen
    />
  </div>
);
