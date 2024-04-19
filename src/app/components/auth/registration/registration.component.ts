import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  registerForm!: FormGroup;
  constructor(private fb: FormBuilder,
    private auth: AuthService,
    private route:Router) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: ['', Validators.email],
      password: ['', Validators.required]
    })
  }
  onSubmit() {
    const users:any=this.registerForm.value;
    this.auth.storeRegistration(users);
    this.route.navigate(['/login']);
  }

}
