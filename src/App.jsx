import React, { useState } from 'react';

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

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Formulario de registro enviado:', formData);
    // En una aplicación real, se manejaría el envío del formulario aquí
    // (ej. llamada a una API).
  };

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
      <style>
        {`
          :root {
            --primary-color: #10B981; /* green-500 */
            --primary-bg-light: #F0FDF4; /* green-50 */
            --primary-text-dark: #065F46; /* green-900 */
            --secondary-color: #6B7280; /* gray-500 */
            --bg-color: #F3F4F6; /* gray-100 */
            --card-bg: #FFFFFF;
            --border-color: #D1D5DB; /* gray-300 */
            --text-color: #1F2937; /* gray-800 */
            --text-light: #6B7280; /* gray-500 */
            --button-bg-hover: #059669; /* green-600 */
          }

          body {
            font-family: 'Inter', sans-serif;
            background-color: var(--bg-color);
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
          }

          .container {
            width: 100%;
            max-width: 500px;
            background-color: var(--card-bg);
            padding: 2.5rem;
            border-radius: 12px;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
            margin: 1rem;
          }

          .header {
            text-align: center;
            margin-bottom: 1.5rem;
          }

          .logo {
            display: flex;
            justify-content: center;
            margin-bottom: 1.5rem;
          }

          .logo-image {
            width: 80px;
            height: 80px;
            border-radius: 9999px;
          }

          .title {
            font-size: 2rem;
            font-weight: 700;
            color: var(--text-color);
          }

          .step-indicator {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-bottom: 1.5rem;
          }

          .step-dot {
            width: 8px;
            height: 8px;
            border-radius: 9999px;
            margin: 0 0.25rem;
            background-color: var(--border-color);
            transition: background-color 0.3s ease-in-out;
          }

          .step-dot.active {
            background-color: var(--primary-color);
          }

          .form-group {
            margin-bottom: 1.5rem;
          }

          .label {
            display: block;
            margin-bottom: 0.5rem;
            font-size: 0.875rem;
            font-weight: 500;
            color: var(--secondary-color);
          }

          .input-field,
          .textarea-field {
            width: 100%;
            padding: 0.75rem;
            border-radius: 0.375rem;
            border: 1px solid var(--border-color);
            font-size: 1rem;
            color: var(--text-color);
            transition: border-color 0.2s ease, box-shadow 0.2s ease;
          }

          .input-field:focus,
          .textarea-field:focus {
            outline: none;
            border-color: var(--primary-color);
            box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.25);
          }

          .textarea-field {
            resize: vertical;
          }

          .options-container {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 1rem;
          }

          .option-label {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            border-radius: 8px;
            border: 2px solid var(--border-color);
            padding: 0.75rem;
            text-align: center;
            cursor: pointer;
            transition: all 0.2s ease-in-out;
            min-width: 100px;
            min-height: 80px;
            color: var(--secondary-color);
          }

          .option-label:hover {
            border-color: #34D399; /* green-400 */
            background-color: #F9FAFB; /* gray-50 */
          }

          .option-label.selected {
            border-color: var(--primary-color);
            background-color: var(--primary-bg-light);
            color: var(--primary-text-dark);
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          }

          .option-label input[type="radio"] {
            position: absolute;
            opacity: 0;
            pointer-events: none;
          }

          .file-input-wrapper {
            width: 100%;
          }

          .file-input {
            width: 100%;
            border-radius: 0.375rem;
            border: 1px solid var(--border-color);
            padding: 0.75rem;
            color: var(--text-color);
          }

          .file-input::-webkit-file-upload-button {
            border: none;
            background-color: var(--primary-bg-light);
            color: var(--primary-text-dark);
            padding: 0.5rem 1rem;
            border-radius: 9999px;
            font-weight: 600;
            cursor: pointer;
            margin-right: 1rem;
            transition: background-color 0.2s ease-in-out;
          }
          
          .file-input::-webkit-file-upload-button:hover {
            background-color: #D1FAE5; /* green-100 */
          }

          .file-info {
            margin-top: 0.5rem;
            font-size: 0.875rem;
            color: var(--secondary-color);
          }
          
          .button-group {
            display: flex;
            justify-content: space-between;
            margin-top: 2rem;
          }

          .button {
            padding: 0.75rem 1.5rem;
            font-weight: 600;
            border-radius: 0.375rem;
            border: none;
            cursor: pointer;
            transition: background-color 0.2s ease, box-shadow 0.2s ease;
          }

          .button-secondary {
            background-color: #E5E7EB; /* gray-200 */
            color: var(--secondary-color);
          }
          
          .button-secondary:hover {
            background-color: #D1D5DB; /* gray-300 */
          }

          .button-primary {
            background-color: var(--primary-color);
            color: var(--card-bg);
            margin-left: auto;
          }

          .button-primary:hover {
            background-color: var(--button-bg-hover);
          }

          @media (max-width: 640px) {
            .container {
              padding: 1.5rem;
            }
            .button-group {
              flex-direction: column-reverse;
              gap: 1rem;
            }
            .button {
              width: 100%;
            }
          }
        `}
      </style>

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
        
      </div>
    </>
  );
};

export default App;
