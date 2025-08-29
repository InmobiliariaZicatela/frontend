import React from "react";
import Icon from "./Icon";
import "../styles/components/characteristics.scss";

const Characteristics = ({ data }) => {
  // Array de iconos disponibles para las características
  const availableIcons = ["Home", "MapPin", "Heart", "Star", "Shield", "Zap"];

  // Filtrar solo los datos que tienen título y descripción
  const validCharacteristics =
    data
      ?.filter((item) => item?.titulo && item?.descripcion)
      ?.map((item, index) => ({
        id: index + 1,
        title: item.titulo,
        description: item.descripcion,
        icon: availableIcons[index % availableIcons.length], // Asignar icono de forma cíclica
      })) || [];

  return (
    <div
      className={`container flex-row justify-around characteristics-container`}
    >
      {validCharacteristics.map((characteristic) => (
        <div
          key={characteristic.id}
          className="flex-item flex-column justify-start characteristic-item"
        >
          <div className="flex-item flex-row align-bottom characteristic-header">
            <Icon
              name={characteristic.icon}
              size={30}
              color="#0056ce"
              className="characteristic-icon"
            />
            <p className="text font-medium text-xl text-primary characteristic-title">
              {characteristic.title}
            </p>
          </div>
          <p className="text font-normal text-sm text-primary characteristic-description">
            {characteristic.description}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Characteristics;
