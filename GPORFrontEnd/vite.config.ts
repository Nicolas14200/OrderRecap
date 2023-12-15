// src/renderer/vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Définir la base à partir de laquelle l'application sera servie (nécessaire pour Electron)
  build: {
    outDir: '../../dist/renderer', // Spécifier le dossier de sortie pour la construction
    emptyOutDir: true, // Vider le dossier de sortie avant chaque construction
  },
});
