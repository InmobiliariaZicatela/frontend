import React from "react";
import Link from "next/link";
import "../styles/components/last-call-to-action.scss";

const LastCallToAction = ({ data }) => {
  return (
    <div className="container flex-column justify-center align-center last-call-to-action-container">
      <div className="last-call-to-action-text-wrapper">
        <p className="text font-regular text-primary text-center mb-4 last-call-to-action-subtitle">
          {data?.frase}
        </p>
        <h1 className="header text-primary text-center mb-5 last-call-to-action-title">
          {data?.titulo}
        </h1>
      </div>
      <Link href="/propiedades">
        <button className="btn last-call-to-action-button">
          Ir a las propiedades
        </button>
      </Link>
    </div>
  );
};

export default LastCallToAction;
