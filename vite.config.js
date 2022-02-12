import { defineConfig } from 'vite'
// https://vitejs.dev/config/
export default defineConfig({
  server:{
    proxy:{
      '/__/':'http://localhost:4998',
      '/Paline/':'http://localhost:4998'
    },
  },
  plugins:[

  ],
  build: {
    lib: {
      entry: 'src/index.js',
      formats: ['es']
    },
    rollupOptions: {
      external: /^lit/
    }
  }
})
