import React from "react";
import Icon from "./Icon";
import "../styles/components/characteristics.scss";

const Characteristics = ({ data }) => {
  const characteristics = [
    {
      id: 1,
      title: data[0]?.titulo,
      description: data[0]?.descripcion,
      icon: "Home",
    },
    {
      id: 2,
      title: data[1]?.titulo,
      description: data[1]?.descripcion,
      icon: "MapPin",
    },
    {
      id: 3,
      title: data[2]?.titulo,
      description: data[2]?.descripcion,
      icon: "Heart",
    },
  ];

  return (
    <div
      className={`container flex-row justify-around characteristics-container`}
    >
      {characteristics.map((characteristic) => (
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
