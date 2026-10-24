import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  selector: 'app-register-user',
  styleUrl: './register-user.css',
  templateUrl: './register-user.html',
})
export class RegisterUser {

  private fb = inject(FormBuilder);
  toastr = inject(ToastrService);

  isLoading: boolean = false; 

  constructor(
    private authService: AuthService,
    private route: Router,
  ){

  }
  userForm = this.fb.nonNullable.group({
    firstName: ['', Validators.required],
    middleName: ['', Validators.required],
    lastName: ['', Validators.required],
    age: [0, [Validators.required, Validators.min(2)]],
    email: ['', Validators.required],
    password: ['', Validators.required],
    location: this.fb.nonNullable.group({  
      city: ['', Validators.required],
      barangay: ['', Validators.required],
    }),
  })

  handleSubmit(){
    if(this.userForm.invalid){
      this.toastr.error('Invalid Form')
    }
    this.authService.createUser(this.userForm.getRawValue()).subscribe({
      next: (res) => {
        this.toastr.success(res.message);
        this.route.navigate([''])
      },
      error: (err) =>{
        this.toastr.error(err.error.message)
      }
    })
  }

  goBack(){
    this.route.navigate([''])
  }
}
