import React from 'react';
import {render} from 'react-dom';
import './css/style.css';

import './stores/CardStore';
import Layout from './components/Layout';

render(
  <Layout/>,
  document.getElementById('root')
)
