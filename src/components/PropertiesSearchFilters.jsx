"use client";

import React, { useState } from "react";
import Icon from "./Icon";

const PropertiesSearchFilters = () => {
  const [filters, setFilters] = useState({
    subdivision: "",
    neighborhood: "",
  });

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="flex-item flex-row justify-between properties-search-section">
      <div className="flex-item flex-row properties-search-inputs">
        {/* Subdivision Search */}
        <div className="properties-search-input-wrapper">
          <input
            type="text"
            placeholder="Nombre del Fraccionamiento"
            value={filters.subdivision}
            onChange={(e) =>
              handleFilterChange("subdivision", e.target.value)
            }
            className="input properties-search-input"
          />
          <Icon
            name="Search"
            size={20}
            color="#0065f2"
            className="properties-search-icon"
          />
        </div>

        {/* Neighborhood Search */}
        <div className="properties-search-input-wrapper">
          <select
            value={filters.neighborhood}
            onChange={(e) =>
              handleFilterChange("neighborhood", e.target.value)
            }
            className="select properties-search-input"
          >
            <option value="">Colonia</option>
            <option value="Colonia A">Colonia A</option>
            <option value="Colonia B">Colonia B</option>
            <option value="Colonia C">Colonia C</option>
          </select>
          <Icon
            name="ChevronDown"
            size={20}
            color="#0065f2"
            className="properties-search-icon"
          />
        </div>
      </div>
    </div>
  );
};

export default PropertiesSearchFilters; 