// HOOKS
import { useState } from 'react'; // manejar estados en los cambios
import { useNavigate } from 'react-router-dom'; // navegar entre router
// BIBLIOTECAS
import axios from 'axios';

// LÓGICA DE LA SECCIÓN DE LOGIN
export function LoginLogic() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    password: "",
    showPassword: false
  });
  const [errorLabel, setErrorLabel] = useState('');

  // MANEJO DE CAMBIOS DE INPUTS
  const handleFieldChange = (field, event) => {
    if (field === 'name') {
      setFormData({ ...formData, name: event.target.value });
    } else if (field === 'password') {
      setFormData({ ...formData, password: event.target.value });
    }
  };

  // MANEJO DE MOSTRAR U OCULTAR CONTRASEÑA
  const togglePasswordVisibility = () => setFormData({ ...formData, showPassword: !formData.showPassword });

  const getPasswordInputType = () => formData.showPassword ? 'text' : 'password';

  // API REQUEST LOGIN
  const handleLoginClick = async () => {
    try {
      const response = await axios.post('https://burger-queen-api-zvby-dev.fl0.io/auth', {
        email: formData.name,
        password: formData.password,
      });

      // Guardar el accessToken en el localStorage
      if (response.data) {
        localStorage.setItem('accessToken', response.data.accessToken);
        localStorage.setItem('userId', response.data.user.id);
        localStorage.setItem('role', response.data.user.role);
      }

      response.data.user.role === 'admin' && navigate('/users');
      response.data.user.role === 'waiter' && navigate('/orders');
      response.data.user.role === 'chef' && navigate('/kitchen');
    } catch (error) {
      if (error.response) {
        if (error.response.data === 'Email and password are required') {
          setErrorLabel('Completa los campos requeridos');
        } else if (error.response.data === 'Cannot find user') {
          setErrorLabel('Usuario no registrado');
        } else if (error.response.data === 'Incorrect password') {
          setErrorLabel('Credenciales  incorrectas');
        } else {
          navigate('/error-page');
        }
      } else {
        navigate('/error-page');
      }
    }
  };

  return {
    formData,
    handleFieldChange,
    errorLabel,
    togglePasswordVisibility,
    getPasswordInputType,
    handleLoginClick,
  }
}