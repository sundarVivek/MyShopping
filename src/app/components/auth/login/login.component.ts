import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  constructor(private fb: FormBuilder,private auth:AuthService,
    private route:Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.email],
      password: ['', Validators.required]
    })
  }
  onSubmit() {
    const users:any=this.loginForm.value;
    if (this.auth.login(users.email, users.password)) {
      console.log('Login successful');
      this.route.navigateByUrl('view-product')
    } else {
      console.log('Login failed');
    }

  }
}
