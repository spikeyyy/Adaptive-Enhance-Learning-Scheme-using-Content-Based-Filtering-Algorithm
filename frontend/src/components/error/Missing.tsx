import React from "react";
import { Link } from "react-router-dom";

function Missing() {
  return (
    <article className="p-16">
      <h1 className="text-3xl font-bold">Ooops!</h1>
      <p className="text-xl">Page Not Found</p>
      <div className="flex-grow">
        <Link to="/" className="text-blue-500">
          Go back to the Login page
        </Link>
      </div>
    </article>
  );
}

export default Missing;
