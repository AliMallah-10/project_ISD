import React from "react";

import "./style.css";

function Error() {
  return (
  
    <div className="body-error">
      <div className="containerError">
        <div>
        <div className="error-code">404</div>
        <div className="error-message">Oops! Page not found</div>
        <a href="/" className="back-home">
          Back to Home
        </a>
      </div>
      </div>
    </div>
   
  );
}
export default Error;
