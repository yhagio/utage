import React from 'react';
import { render } from 'react-dom';
import getRoutes from './config/routes';

render(
  <div>
    { getRoutes() }
  </div>,
  document.getElementById('app')
);
