import 'regenerator-runtime';
import CacheHelper from './utils/cache-helper';

const { assets } = global.serviceWorkerOption;

self.addEventListener('install', (event) => {
  event.waitUntil(CacheHelper.cachingAppShell([
    ...assets,
    './',
    'https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,300;0,400;1,400&family=Lora:ital@1&display=swap',
    'https://fonts.googleapis.com/css?family=Roboto:300,400,500',
    'https://fonts.googleapis.com/css2?family=Lobster&display=swap',
    'https://fonts.googleapis.com/css2?family=Lato&display=swap',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css',
  ]));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(CacheHelper.deleteOldCache());
});

self.addEventListener('fetch', (event) => {
  event.respondWith(CacheHelper.revalidateCache(event.request));
});
