import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent implements OnInit {
  formBuilder = inject(FormBuilder)
  dbService = inject(NgxIndexedDBService)
  router = inject(Router);
  destroyRef = inject(DestroyRef)

  contactForm = this.formBuilder.group({
    name: ['', Validators.required],
    phoneNumber: ['', [Validators.required, Validators.minLength(11), Validators.pattern('[0-9]*')]],
    email: ['', [Validators.email, Validators.required]],
    longitude: [0.00],
    latitude: [ 0.00],
    addresses: new FormArray<FormControl>([])
  });

  ngOnInit(): void {
    this.addNewAddress();
    this.getLocation();

    this.contactForm.controls.latitude.disable()
    this.contactForm.controls.longitude.disable()
  }

  get addresses() {
    return this.contactForm.controls["addresses"] as FormArray;
  }

  addNewAddress(){
    const newAddrForm = new FormControl('', Validators.required)
    if (this.addresses.length < 5){
      this.addresses.push(newAddrForm);
    }
  }

  deleteAddr(addrIndex: number) {
    this.addresses.removeAt(addrIndex);
  }
  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: any) => {
        if (position) {
          console.log("Latitude: " + position.coords.latitude +
            "Longitude: " + position.coords.longitude);
          this.contactForm.patchValue({
            longitude: position.coords.longitude,
            latitude: position.coords.latitude
          })
        }
      },
        (error) => console.log(error));
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  onSubmit() {
    this.dbService.add('Contacts', this.contactForm.getRawValue())
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe(() => {
      this.router.navigateByUrl('/');
    })
  }
}
