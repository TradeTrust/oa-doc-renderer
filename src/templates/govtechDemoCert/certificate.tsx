import { format } from "date-fns";
import { get } from "lodash";
import React, { FunctionComponent } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./common/demoStyles.css";
import { TemplateProps } from "@govtechsg/decentralized-renderer-react-components";
import { GovtechOpencertsTemplateCertificate } from "../samples";
import { PrintWatermark } from "./common/PrintWatermark";
import mainLogo from "./common/opencertslogo.svg";
import logo from "./common/GOVTECH_logo.png";
import certificateBg from "./common/certificate_background.png";

export const CertificateTemplate: FunctionComponent<TemplateProps<GovtechOpencertsTemplateCertificate>> = ({
  document
}) => (
  <>
    <PrintWatermark />
    <div
      className="p-2 container"
      style={{
        backgroundImage: `url('${certificateBg}')`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        border: "10px solid #324353"
      }}
    >
      <div
        className="p-2"
        style={{
          border: "0px solid #324353"
        }}
      >
        <div className="my-5 m-lg-5 text-center">
          <img src={mainLogo} alt="OpenCerts Logo" style={{ width: "60%", height: "auto", maxWidth: "1000px" }} />
        </div>
        <div className="mb-4 mb-lg-5 d-flex justify-content-center cert-body" style={{ textAlign: "center" }}>
          <i>This is to certify that</i>
        </div>
        <div className="mb-4 mb-lg-5 d-flex justify-content-center cert-title">
          <b>{document.recipient.name}</b>
        </div>
        <div className="mb-4 mb-lg-5 d-flex justify-content-center cert-body" style={{ textAlign: "center" }}>
          <i>has successfully completed the</i>
        </div>
        <div className="mb-4 mb-lg-5 d-flex justify-content-center cert-title" style={{ textAlign: "center" }}>
          OpenCerts Demo
        </div>
        <div className="mb-4 mb-lg-5 d-flex justify-content-center cert-body" style={{ textAlign: "center" }}>
          <i>certification through training administered by</i>
        </div>
        <div className="row">
          <div className="col" />
          <div className="col">
            <img
              className="w-100"
              style={{ width: "100%", height: "auto", minWidth: "100px" }}
              src={logo}
              alt="Govtech Logo"
            />
          </div>
          <div className="col" />
        </div>

        <div
          className="row"
          style={{
            paddingLeft: "8%",
            paddingTop: "5%"
          }}
        >
          <div className="col text-center transcript">
            <img
              style={{ width: "100%", height: "auto" }}
              src={get(document, "additionalData.certSignatories[0].signature")}
            />
            <hr
              style={{
                border: "none",
                height: "1px",
                backgroundColor: "#333"
              }}
            />
            <div>
              <b>{get(document, "additionalData.certSignatories[0].name")}</b>
              <br />
              {get(document, "additionalData.certSignatories[0].position")},{" "}
              {get(document, "additionalData.certSignatories[0].organisation")}
            </div>
          </div>

          <div className="col" />

          <div
            className="d-flex flex-row-reverse col transcript"
            style={{
              paddingTop: "5%",
              paddingRight: "5%"
            }}
          >
            Dated {format(document.issuedOn, "DD/MM/YYYY")}
          </div>
        </div>
      </div>
    </div>
  </>
);
