import React from 'react';

const CantidadInput = ({ value, onChange, ...props }) => {
  const handleFocus = (e) => {
    // Selecciona todo si el valor es "0" para permitir fácil reemplazo
    if (e.target.value === '0') {
      e.target.select();
    }
  };

  const handleChange = (e) => {
    const newValue = e.target.value;
    // Evita que se ingrese un valor negativo y fuerza número entero
    if (/^\d*$/.test(newValue)) {
      onChange(newValue);
    }
  };

  return (
    <input
      type="number"
      inputMode="numeric"
      pattern="[0-9]*"
      value={value}
      onFocus={handleFocus}
      onChange={handleChange}
      {...props}
    />
  );
};

export default CantidadInput;
