"use client";

import React, { useState, useEffect } from "react";
import PropertyCard from "./PropertyCard";
import Icon from "./Icon";

import "../styles/components/properties-list.scss";

const PropertiesList = ({ initialProperties = [] }) => {
  const [properties, setProperties] = useState(initialProperties);

  const [filters, setFilters] = useState({
    title: "",
    neighborhood: "",
  });

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Clear all filters function
  const clearAllFilters = () => {
    setFilters({
      title: "",
      neighborhood: "",
    });
  };

  // Generate unique neighborhoods from properties data
  const getUniqueNeighborhoods = () => {
    if (!properties || properties.length === 0) return [];

    const neighborhoods = properties
      .map((property) => property.colonia?.nombre)
      .filter((nombre) => nombre) // Remove undefined/null values
      .filter((nombre, index, arr) => arr.indexOf(nombre) === index); // Remove duplicates

    return neighborhoods.sort(); // Sort alphabetically
  };

  // Initialize properties with the passed data
  useEffect(() => {
    if (initialProperties && initialProperties.length > 0) {
      setProperties(initialProperties);
    }
  }, [initialProperties]);

  // Get unique neighborhoods for the filter
  const uniqueNeighborhoods = getUniqueNeighborhoods();

  // Filter properties based on selected filters
  const filteredProperties = properties.filter((property) => {
    // Title search (case-insensitive)
    const titleMatch =
      !filters.title ||
      property.titulo?.toLowerCase().includes(filters.title.toLowerCase());

    // Neighborhood filter (case-insensitive)
    const neighborhoodMatch =
      !filters.neighborhood ||
      property.colonia?.nombre
        ?.toLowerCase()
        .includes(filters.neighborhood.toLowerCase());

    // Both filters must match (AND logic)
    return titleMatch && neighborhoodMatch;
  });

  return (
    <div className="container flex-column properties-list-container">
      {/* Search/Filter Section */}
      <div className="flex-item flex-row properties-search-section">
        <div className="flex-item flex-row properties-search-inputs">
          {/* Property Title Search */}
          <div className="properties-search-input-wrapper">
            <input
              type="text"
              placeholder="Nombre de la propiedad"
              value={filters.title}
              onChange={(e) => handleFilterChange("title", e.target.value)}
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
              <option value="" disabled>
                Todas las colonias
              </option>
              {uniqueNeighborhoods.map((neighborhood, index) => (
                <option key={index} value={neighborhood}>
                  {neighborhood}
                </option>
              ))}
            </select>
            <Icon
              name="ChevronDown"
              size={20}
              color="#0065f2"
              className="properties-search-icon"
            />
          </div>
        </div>
        {/* Clear Filters Button */}
        <button
          onClick={clearAllFilters}
          className="clear-filters-button"
          disabled={!filters.title && !filters.neighborhood}
          title={
            !filters.title && !filters.neighborhood
              ? "No hay filtros activos"
              : "Limpiar todos los filtros"
          }
        >
          {!filters.title && !filters.neighborhood
            ? "Sin filtros"
            : "Limpiar filtros"}
        </button>
      </div>

      {/* Results Heading */}
      <div className="flex-item flex-row properties-results-heading">
        <h2 className="text font-medium text-lg text-primary">
          Hemos encontrado{" "}
          <span className="text font-semibold text-2xl text-primary">
            {filteredProperties.length}
          </span>{" "}
          propiedades
        </h2>
      </div>

      {/* Properties Grid */}
      <div className="properties-grid">
        {filteredProperties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
};

export default PropertiesList;
