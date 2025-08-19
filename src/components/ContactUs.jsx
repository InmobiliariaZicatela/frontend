"use client";

import React from "react";
import Icon from "./Icon";
import "../styles/components/contact-us.scss";

const ContactUs = ({ data }) => {
  const ContactMethod = {
    Email: "Email",
    Direccion: "Direccion",
    Whatsapp: "Whatsapp",
    Telefono: "Telefono",
  };

  const typeToIcon = {
    [ContactMethod.Email]: "Mail",
    [ContactMethod.Direccion]: "MapPin",
    [ContactMethod.Whatsapp]: "MessageCircle",
    [ContactMethod.Telefono]: "Phone",
  };

  // Map contact methods based on data structure
  const contactMethods = data?.contactos?.map((contact) => ({
    ...contact,
    icon: typeToIcon[contact.tipo.tipo],
  }));

  // Function to handle WhatsApp click
  const handleWhatsAppClick = (phoneNumber) => {
    const message =
      "Hola! Me interesa conocer más sobre sus propiedades en Puerto Escondido.";
    const whatsappUrl = `https://wa.me/${phoneNumber.replace(
      /\s/g,
      ""
    )}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  // Function to get the appropriate href and target for each contact type
  const getContactLink = (type, link) => {
    if (type === ContactMethod.Email) {
      return `mailto:${link}`;
    } else if (type === ContactMethod.Direccion) {
      return "https://maps.app.goo.gl/BGaQr1yWDE29HqMr8";
    } else if (type === ContactMethod.Telefono) {
      return `tel:${link}`;
    } else if (type === ContactMethod.Whatsapp) {
      return `https://wa.me/${link.replace(
        /\s/g,
        ""
      )}?text=${encodeURIComponent(
        "Hola! Me interesa conocer más sobre sus propiedades en Puerto Escondido."
      )}`;
    }
    return "#";
  };

  // Function to get target and rel attributes
  const getContactAttributes = (type) => {
    if (type === ContactMethod.Direccion || type === ContactMethod.Email) {
      return { target: "_blank", rel: "noopener noreferrer" };
    }
    return {};
  };

  // Function to handle contact click
  const handleContactClick = (type, link, e) => {
    if (type === ContactMethod.Whatsapp) {
      e.preventDefault();
      handleWhatsAppClick(link);
    }
  };

  return (
    <div id="contacto" className="container flex-column contact-us-container">
      {/* Header Section */}
      <div className="flex-item flex-column contact-header">
        <p className="text font-regular text-primary contact-header-subtitle">
          {data?.texto_superior}
        </p>
        <p className="text font-semibold text-primary contact-header-title">
          {data?.texto_inferior}
        </p>
      </div>

      {/* Contact Methods */}
      <div className="flex-item flex-row justify-between contact-methods-container">
        {contactMethods.map((method, index) => (
          <div
            key={index}
            className="flex-item flex-column align-start contact-method-card"
          >
            {/* Circular Icon */}
            <div className="mb-3 contact-icon">
              <Icon name={method.icon} size={26} color="#0065f2" />
            </div>
            {/* Title */}
            <h3 className="text font-medium text-xl text-primary contact-title">
              {method.texto}
            </h3>
            {/* Description */}
            <p className="text font-light text-sm text-dark contact-description">
              {method.disponibilidad}
            </p>
            {/* Contact Detail */}
            <div className="flex-item flex-column contact-detail-container">
              {method.links.map((link, lineIndex) => (
                <a
                  key={lineIndex}
                  href={getContactLink(method.tipo.tipo, link.link)}
                  {...getContactAttributes(method.tipo.tipo)}
                  onClick={(e) =>
                    handleContactClick(method.tipo.tipo, link.link, e)
                  }
                  className="text font-regular text-sm text-primary contact-detail"
                  style={{
                    marginBottom:
                      lineIndex < method.links.length - 1 ? "2px" : "0",
                  }}
                >
                  {link.texto_link}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactUs;
