import { CommonModule } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { Contact } from '../app.model';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
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
  }))


  getRandomAddress(addresses: string[]): string {
    const no = Math.floor(Math.random() * addresses.length)
    return addresses[no];
  }

  getRandomNumber(): number {
    return Math.floor(Math.random() * 1000);
  }
}
