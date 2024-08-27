import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { NgxIndexedDBModule, DBConfig } from 'ngx-indexed-db';
import { routes } from './app.routes';

const dbConfig: DBConfig = {
  name: 'ContactDb',
  version: 1,
  objectStoresMeta: [{
    store: 'Contacts',
    storeConfig: { keyPath: 'id', autoIncrement: true },
    storeSchema: [
      { name: 'name', keypath: 'name', options: { unique: false } },
      { name: 'phoneNumber', keypath: 'phoneNumber', options: { unique: true } },
      { name: 'email', keypath: 'email', options: { unique: false } },
      { name: 'addresses', keypath: 'addresses', options: { unique: false } },
      { name: 'longitude', keypath: 'longitude', options: { unique: false } },
      { name: 'latitude', keypath: 'latitude', options: { unique: false } },
    ]
  }]
};

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), importProvidersFrom(NgxIndexedDBModule.forRoot(dbConfig))]
};
