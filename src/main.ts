import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
.then(() => {
  if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('ngsw-worker.js');
      console.log('Service worker registered');
  }
  
  })
  .catch(err =>   console.log('SW error', err));