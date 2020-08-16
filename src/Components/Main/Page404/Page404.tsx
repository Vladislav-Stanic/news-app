import React, { ReactElement } from "react";
import "./Page404.scss";

const page404 = (): ReactElement => {
  return (
    <div className="container-404">
      {/* Header on top news */}
      <h1>Error 404:</h1>

      <h4>Page not found!</h4>
    </div>
  );
};

export default page404;
