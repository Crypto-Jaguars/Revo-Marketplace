import { useState } from 'react';

export default function Form() {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    phone: ''
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleBlur = (field) => {
    setTouched(prev => ({
      ...prev,
      [field]: true
    }));
    
    validateField(field, formData[field]);
  };

  const validateField = (field, value) => {
    let error = '';
    
    switch (field) {
      case 'name':
        if (!value.trim()) error = 'Name is required / Nombre es requerido';
        break;
      case 'surname':
        if (!value.trim()) error = 'Surname is required / Apellido es requerido';
        break;
      case 'email':
        if (!value.trim()) {
          error = 'Email is required / Email es requerido';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = 'Invalid email format / Formato de email inválido';
        }
        break;
      case 'phone':
        if (!value.trim()) {
          error = 'Phone is required / Teléfono es requerido';
        } else if (!/^[\+]?[0-9\s\-\(\)]{10,}$/.test(value)) {
          error = 'Invalid phone format / Formato de teléfono inválido';
        }
        break;
    }
    
    setErrors(prev => ({
      ...prev,
      [field]: error
    }));
    
    return !error;
  };

  const handleSubmit = () => {
    
    // Validate all fields
    const newErrors = {};
    let isValid = true;
    
    Object.keys(formData).forEach(field => {
      if (!validateField(field, formData[field])) {
        isValid = false;
      }
    });
    
    // Mark all fields as touched
    setTouched({
      name: true,
      surname: true,
      email: true,
      phone: true
    });
    
    if (isValid) {
      console.log('Form submitted:', formData);
      alert('Form submitted successfully! / ¡Formulario enviado exitosamente!');
    }
  };

  const getInputClassName = (field) => {
    const baseClasses = "w-full px-4 py-3 border rounded-lg transition-all duration-200 placeholder-gray-500";
    const focusClasses = "focus:outline-none focus:ring-2 focus:border-transparent";
    
    if (errors[field] && touched[field]) {
      return `${baseClasses} ${focusClasses} border-red-500 focus:ring-red-200`;
    } else if (formData[field] && !errors[field]) {
      return `${baseClasses} ${focusClasses} border-green-500 focus:ring-green-200`;
    } else {
      return `${baseClasses} ${focusClasses} border-gray-300 focus:ring-[#2a7035] focus:ring-opacity-50`;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Personal Information
            </h1>
            <p className="text-gray-600">
              Información Personal
            </p>
            <div className="w-24 h-1 bg-[#2a7035] mx-auto mt-4 rounded-full"></div>
          </div>

          {/* Form */}
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name Field */}
              <div>
                <label 
                  htmlFor="name" 
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Name <span className="text-red-500">*</span>
                  <span className="text-gray-500 font-normal"> / Nombre</span>
                </label>
                <input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  onBlur={() => handleBlur('name')}
                  placeholder="Enter your name / Ingresa tu nombre"
                  className={getInputClassName('name')}
                  aria-invalid={errors.name && touched.name ? 'true' : 'false'}
                  aria-describedby={errors.name && touched.name ? 'name-error' : undefined}
                />
                {errors.name && touched.name && (
                  <p id="name-error" className="mt-2 text-sm text-red-600" role="alert">
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Surname Field */}
              <div>
                <label 
                  htmlFor="surname" 
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Surname <span className="text-red-500">*</span>
                  <span className="text-gray-500 font-normal"> / Apellido</span>
                </label>
                <input
                  id="surname"
                  type="text"
                  value={formData.surname}
                  onChange={(e) => handleInputChange('surname', e.target.value)}
                  onBlur={() => handleBlur('surname')}
                  placeholder="Enter your surname / Ingresa tu apellido"
                  className={getInputClassName('surname')}
                  aria-invalid={errors.surname && touched.surname ? 'true' : 'false'}
                  aria-describedby={errors.surname && touched.surname ? 'surname-error' : undefined}
                />
                {errors.surname && touched.surname && (
                  <p id="surname-error" className="mt-2 text-sm text-red-600" role="alert">
                    {errors.surname}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Email Field */}
              <div>
                <label 
                  htmlFor="email" 
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Email <span className="text-red-500">*</span>
                  <span className="text-gray-500 font-normal"> / Correo electrónico</span>
                </label>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  onBlur={() => handleBlur('email')}
                  placeholder="your.email@example.com"
                  className={getInputClassName('email')}
                  aria-invalid={errors.email && touched.email ? 'true' : 'false'}
                  aria-describedby={errors.email && touched.email ? 'email-error' : undefined}
                />
                {errors.email && touched.email && (
                  <p id="email-error" className="mt-2 text-sm text-red-600" role="alert">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Phone Field */}
              <div>
                <label 
                  htmlFor="phone" 
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Phone <span className="text-red-500">*</span>
                  <span className="text-gray-500 font-normal"> / Teléfono</span>
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  onBlur={() => handleBlur('phone')}
                  placeholder="+1 (555) 123-4567"
                  className={getInputClassName('phone')}
                  aria-invalid={errors.phone && touched.phone ? 'true' : 'false'}
                  aria-describedby={errors.phone && touched.phone ? 'phone-error' : undefined}
                />
                {errors.phone && touched.phone && (
                  <p id="phone-error" className="mt-2 text-sm text-red-600" role="alert">
                    {errors.phone}
                  </p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="button"
                onClick={handleSubmit}
                className="w-full bg-[#2a7035] hover:bg-[#1e4f26] text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#2a7035] focus:ring-opacity-50 shadow-md hover:shadow-lg"
              >
                Submit Information / Enviar Información
              </button>
            </div>

            {/* Required Fields Note */}
            <div className="text-center text-sm text-gray-600 mt-4">
              <span className="text-red-500">*</span> Required fields / Campos requeridos
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}