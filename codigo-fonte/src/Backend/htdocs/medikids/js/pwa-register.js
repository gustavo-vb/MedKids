if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./service-worker.js')
      .then(() => console.log('PWA Medikids: Service Worker registrado.'))
      .catch((error) => console.warn('PWA Medikids: falha ao registrar Service Worker.', error));
  });
}
