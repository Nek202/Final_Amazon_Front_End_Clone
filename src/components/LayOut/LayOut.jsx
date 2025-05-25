import React from "react";
import Header from "../Header/Header"; // Adjust the path if needed

function LayOut({ children }) {
  return (
    <div>
      <Header />
      <div>{children}</div> {/* ✅ This is critical */}
    </div>
  );
}

export default LayOut;
