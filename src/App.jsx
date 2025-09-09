import React, { useState } from 'react';
import './App.css';
import axios from 'axios';
// Componente principal para el asistente de registro de producto

const App = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    selectedColor: '',
    logoFile: null,
    selectedDemo: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e, fileType) => {
    const file = e.target.files[0];
    setFormData({ ...formData, [fileType]: file });
  };

  const nextStep = () => {
    // Validar el paso actual antes de avanzar
    let isValid = true;
    switch (step) {
      case 1:
        isValid = formData.title !== '' && formData.description !== '';
        break;
      case 2:
        isValid = formData.selectedColor !== '';
        break;
      case 3:
        isValid = formData.logoFile !== null;
        break;
      case 4:
        isValid = formData.selectedDemo !== '';
        break;
      default:
        break;
    }

    if (isValid && step < 4) { // Total de 4 pasos para el asistente
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    try {
      const data = new FormData();
      data.append('title', formData.title);
      data.append('description', formData.description);
      data.append('selectedColor', formData.selectedColor);
      data.append('selectedDemo', formData.selectedDemo);
      if (formData.logoFile) {
        data.append('logoFile', formData.logoFile);
      }

      const response = await axios.post('http://localhost:4000/api/wizard', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage('¡Registro completado exitosamente!');
      console.log('Respuesta del servidor:', response.data);
    } catch (error) {
      setMessage('Hubo un error al registrar el producto. Inténtalo de nuevo.');
      console.error('Error al enviar el formulario:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   console.log('Formulario de registro enviado:', formData);
  //   // En una aplicación real, se manejaría el envío del formulario aquí
  //   // (ej. llamada a una API).
  // };

  // Componente auxiliar para renderizar el indicador de pasos
  const StepIndicator = ({ currentStep, totalSteps }) => (
    <div className="step-indicator">
      {Array.from({ length: totalSteps }, (_, index) => (
        <div
          key={index}
          className={`step-dot ${index + 1 <= currentStep ? 'active' : ''}`}
        />
      ))}
    </div>
  );

  return (
    <>
      <div className="container">
        
        <div className="logo">
          <img
            src="https://placehold.co/100x100/38a169/ffffff?text=Tu+Logo"
            alt="Logo de la Empresa"
            className="logo-image"
          />
        </div>
        
        <h1 className="title">
          Registro de Producto
        </h1>
        
        <StepIndicator currentStep={step} totalSteps={4} />
        
        <form onSubmit={handleSubmit}>
          
          {/* Paso 1: Detalles de la web */}
          {step === 1 && (
            <div className="form-group">
              <div>
                <label
                  htmlFor="title"
                  className="label"
                >
                  Título de tu web
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Ej: Tienda de Libros"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="label"
                >
                  Descripción
                </label>
                <textarea
                  id="description"
                  name="description"
                  placeholder="Descripción detallada de tu web"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="4"
                  className="textarea-field"
                  required
                />
              </div>
            </div>
          )}
          
          {/* Paso 2: Selección de Color */}
          {step === 2 && (
            <div className="form-group">
              <h3 className="label" style={{textAlign: 'center'}}>
                Selecciona el color principal
              </h3>
              <div className="options-container">
                {['Rojo', 'Verde', 'Azul'].map((color) => (
                  <label
                    key={color}
                    className={`option-label ${formData.selectedColor === color ? 'selected' : ''}`}
                  >
                    <input
                      type="radio"
                      name="selectedColor"
                      value={color}
                      checked={formData.selectedColor === color}
                      onChange={handleInputChange}
                    />
                    <div className="option-text">{color}</div>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Paso 3: Carga de Logo */}
          {step === 3 && (
            <div className="form-group">
              <div>
                <label
                  htmlFor="logoFile"
                  className="label"
                >
                  Carga tu logo
                </label>
                <input
                  type="file"
                  id="logoFile"
                  name="logoFile"
                  onChange={(e) => handleFileChange(e, 'logoFile')}
                  className="file-input"
                  required
                />
                {formData.logoFile && (
                  <p className="file-info">
                    Archivo seleccionado: {formData.logoFile.name}
                  </p>
                )}
              </div>
            </div>
          )}
          
          {/* Paso 4: Selección de Demo */}
          {step === 4 && (
            <div className="form-group">
              <h3 className="label" style={{textAlign: 'center'}}>
                Selecciona una demo preestablecida
              </h3>
              <div className="options-container">
                {['Moderna', 'Elegante', 'Minimalista'].map((demo) => (
                  <label
                    key={demo}
                    className={`option-label ${formData.selectedDemo === demo ? 'selected' : ''}`}
                  >
                    <input
                      type="radio"
                      name="selectedDemo"
                      value={demo}
                      checked={formData.selectedDemo === demo}
                      onChange={handleInputChange}
                    />
                    <div className="option-text">{demo}</div>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Botones de navegación */}
          <div className="button-group">
            {step > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="button button-secondary"
              >
                Regresar
              </button>
            )}
            {step < 4 && (
              <button
                type="button"
                onClick={nextStep}
                className="button button-primary"
              >
                Siguiente
              </button>
            )}
            {step === 4 && (
              <button
                type="submit"
                className="button button-primary"
              >
                Registrar
              </button>
            )}
          </div>
          
  </form>
  {isSubmitting && <div className="info-message">Enviando datos...</div>}
  {message && <div className="info-message">{message}</div>}
        
      </div>
    </>
  );
};

export default App;
