/* eslint-disable no-unused-vars */
import { render, screen, fireEvent, waitFor, getByText } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';
import Menu from './menu.jsx';

describe('Componente Products', () => {
    it('Renderiza el componente correctamente', () => {      
      
      render(
      <MemoryRouter>
        <Menu />
      </MemoryRouter>
      );
  
      const pedidosOption = screen.getByText('PEDIDOS');
      const clientInputElement = screen.getByPlaceholderText('Escribe aquí');
      const tableSelectElement = screen.getByDisplayValue('Selecciona la mesa');
      expect(pedidosOption).toBeInTheDocument();
      expect(clientInputElement).toBeInTheDocument();
      expect(tableSelectElement).toBeInTheDocument();
  
    });
});