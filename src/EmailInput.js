// EmailInput.js
import React, { useState } from 'react';

function EmailInput() {
  const [email, setEmail] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      alert("Por favor, ingrese un correo válido.");
      return;
    }

    console.log("Correo válido:", email);
    // Aquí puedes agregar la lógica de validación o envío del correo.
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Correo Electrónico:</label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={handleEmailChange}
        placeholder="Ingrese su correo electrónico"
        required
      />
      <button type="submit">Enviar</button>
    </form>
  );
}

export default EmailInput;
