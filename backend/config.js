export const PORT=3000;

export const mongoDBURL='mongodb+srv://mukuljadon:Mukul%402001@cluster0.wm50s.mongodb.net/school';

// export const mongoDBURL='mongodb://127.0.0.1:27017/school';
//export const mongoDBURL='mongodb://localhost:27017/school'
 // vite.config.js
export default {
    server: {
      proxy: {
        '/api': 'http://localhost:3000',
      },
    },
  };
  