import React, { useEffect } from "react";
import classes from "./AdComponent.module.css";
import globals from "../../../Services/Globals";
const AdsComponent = (): JSX.Element => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {}
  }, []);

  return (
    <>
      <ins
        className={classes.AdsByGoogle}
        style={{ display: "block", height: "100px" }}
        data-ad-client={globals.DATA_AD_CLIENT}
        data-ad-slot={globals.DATA_AD_SLOT}
        data-adtest="on"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </>
  );
};

export default AdsComponent;
