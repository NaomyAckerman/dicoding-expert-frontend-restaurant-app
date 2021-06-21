import 'regenerator-runtime'; /* for async await transpile */
import '../styles/main.css';
import '../styles/responsive.css';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import swRegister from './utils/sw-register';
import App from './views/app';
import NotificationHelper from './utils/notification-helper';

const app = new App({
  button: document.querySelector('#menu'),
  drawer: document.querySelector('#drawer'),
  content: document.querySelector('#app'),
});

window.addEventListener('hashchange', () => {
  app.renderPage();
});

window.addEventListener('load', () => {
  app.renderPage();
  swRegister();
  NotificationHelper.sendNotification({
    title: 'Selamat datang di So Delicious',
    options: {
      body: 'Temukan restauran dengan cita rasa dan nuansa sesuai dengan keinginan hanya di so delicious',
      icon: '/icons/icon-512x512.png',
      badge: '/icons/icon-128x128.png',
      image: '/images/heros/hero-image_2.jpg',
    },
  });
});
