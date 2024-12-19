import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <hr style={{ border: "0", height: "1px", backgroundColor: "#ff6600", margin: "10px 0" }} />
      <span className="yclinks" style={{ fontSize: "8pt", color: "#828282" }}>
        | {" "}
          <Link to="/contact">Contact</Link>
        {" "} |
      </span>
      <div style={{ marginBottom: "20px" }}></div>
    </div>
  );
}

export default Footer;
