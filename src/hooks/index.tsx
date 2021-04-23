import React from 'react';
import { PlayerProvider } from './player';

const AppProvider: React.FC = ({ children }) => (
  <PlayerProvider>{children}</PlayerProvider>
);

export default AppProvider;
