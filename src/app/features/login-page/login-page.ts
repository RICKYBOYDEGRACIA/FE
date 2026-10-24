import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, ɵInternalFormsSharedModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../services/auth.service';

@Component({
  imports: [
    ɵInternalFormsSharedModule,
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  selector: 'app-login-page',
  styleUrl: './login-page.css',
  templateUrl: './login-page.html',
})
export class LoginPage {
  toastr = inject(ToastrService);

  private fb = inject(FormBuilder);

  constructor(
    private router: Router,
    private authService: AuthService,
  ){}
  
  loginForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  })

  handleLogin(){
    if(this.loginForm.invalid){
      this.toastr.error("Fill the fields", "Error")
      return
    }
    const credentials = this.loginForm.value;
    this.authService.login(credentials).subscribe({
      next: (res) => {
        this.toastr.success(res.message)
        this.router.navigate(['/home'])
      },
      error: (err) => {
        this.toastr.error(err.error?.message)
      }
    })
  }

  goRegister(){
    this.router.navigate(['/register'])
  }

}
