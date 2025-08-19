"use client";

import React, { useState } from "react";
import "../styles/components/faq.scss";
import Icon from "./Icon";

const FAQ = ({ data }) => {
  const [openItems, setOpenItems] = useState(new Set());

  const toggleItem = (index) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index);
    } else {
      newOpenItems.add(index);
    }
    setOpenItems(newOpenItems);
  };

  return (
    <div
      id="faq"
      className="container flex-column justify-center align-center py-5 faq-container mt-5 mb-5"
    >
      {/* Header Section */}
      <div className="flex-item flex-column faq-header">
        <h1 className="header text-primary faq-title">{data?.titulo}</h1>
        <p className="text font-light text-primary faq-subtitle">
          {data?.descripcion}
        </p>
      </div>

      {/* FAQ Items */}
      <div className="flex-item flex-column faq-items-container faq-card-enhanced">
        {data?.preguntas_respuestas.map((item, index) => (
          <div key={index} className="faq-item">
            {/* FAQ Question */}
            <div
              className={`faq-question ${openItems.has(index) ? "active" : ""}`}
              onClick={() => toggleItem(index)}
            >
              <p className="text font-medium text-lg faq-question-text">
                {item.pregunta}
              </p>
              <div className="faq-icon">
                <Icon name="ChevronRight" size={20} color="#0065f2" />
              </div>
            </div>

            {/* FAQ Answer */}
            {openItems.has(index) && (
              <div className="faq-answer">
                <p className="text font-light text-base faq-answer-content">
                  {item.respuesta}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
