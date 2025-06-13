// src/context/CostosAjustadosContext.jsx
/* eslint-disable react-refresh/only-export-components */

import React, { createContext, useContext, useState } from 'react';

// Contexto
const CostosAjustadosContext = createContext();

// Provider
export const CostosAjustadosProvider = ({ children }) => {
  const [costosAjustados, setCostosAjustados] = useState({});

  const setCostoAjustado = (nombreSubitem, nuevoCosto) => {
    setCostosAjustados((prev) => ({
      ...prev,
      [nombreSubitem]: nuevoCosto,
    }));
  };

  return (
    <CostosAjustadosContext.Provider value={{ costosAjustados, setCostoAjustado }}>
      {children}
    </CostosAjustadosContext.Provider>
  );
};

// Hook para usar el contexto
export const useCostosAjustados = () => {
  return useContext(CostosAjustadosContext);
};
