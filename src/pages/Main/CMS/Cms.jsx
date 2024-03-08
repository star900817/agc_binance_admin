import React from "react";
import PartnerLogoManage from "./CMSBLocks/PartnerLogoManage";
import CardSliderManage from "./CMSBLocks/CardSliderManage";
import FaqManage from "./CMSBLocks/FaqManage";

const Cms = () => {
  return (
    <div>
      <div style={{ color: "black" }}>
        <h4>Content Management System</h4>
      </div>

      <PartnerLogoManage />
      <br />
      <br />
      <CardSliderManage />
      <br />
      <br />
      <FaqManage />
    </div>
  );
};

export default Cms;
