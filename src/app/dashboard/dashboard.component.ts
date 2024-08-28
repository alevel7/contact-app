import { CommonModule } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { Contact } from '../app.model';
import { toSignal } from '@angular/core/rxjs-interop';
import {GoogleMap, MapMarker} from '@angular/google-maps';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, GoogleMap, MapMarker],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent  {
  display: 'map' | 'table' = 'table';
  dbService = inject(NgxIndexedDBService)
  contacts = toSignal(this.dbService.getAll<Contact>('Contacts'), { initialValue: []});
  updatedContacts = computed(() => this.contacts().map( contact => {
    return {
      ...contact,
      addresses: this.getRandomAddress(contact.addresses)
    }
  }));

  center: google.maps.LatLngLiteral = { lat: 24, lng: 12 };
  zoom = 4;
  markerOptions: google.maps.MarkerOptions = { draggable: false };
  markerPositions = computed<google.maps.LatLngLiteral[]>( () => this.contacts().map( contact => {
    return { lat: Number(contact.latitude), lng: Number(contact.longitude) }
  }))


  getRandomAddress(addresses: string[]): string {
    const no = Math.floor(Math.random() * addresses.length)
    return addresses[no];
  }

  getRandomNumber(): number {
    return Math.floor(Math.random() * 1000);
  }
}
