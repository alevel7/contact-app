import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: "",
    loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent)
  },
  {
    path: "contact",
    loadComponent: () => import('./contact/contact.component').then(m => m.ContactComponent)
  },
  {
    path: "**",
    redirectTo: ""
  }
];
