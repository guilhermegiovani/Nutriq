/**
 * Ponto de entrada do Expo para registrar o componente raiz do aplicativo.
 */
import './global.css';

import { registerRootComponent } from 'expo';

import App from './App';

// Ponto de entrada: registra o App no Expo Go / build nativo
registerRootComponent(App);
