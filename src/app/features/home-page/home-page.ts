import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { finalize, min } from 'rxjs';

@Component({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule
  ],
  selector: 'app-home-page',
  styleUrl: './home-page.css',
  templateUrl: './home-page.html',
})
export class HomePage implements OnInit{
  isLoading: boolean = false;
  isEditing: boolean = false;
  userId : string = '';

  constructor(
    private userService: UserService,
    private cdr: ChangeDetectorRef
  ){}
  data: any;
  error: any;

  userForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    middleName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    age: new FormControl('', [Validators.required, Validators.min(2)]),
    location: new FormGroup({  
      city: new FormControl('', Validators.required),
      barangay: new FormControl('', Validators.required),
    }),
  })

  ngOnInit(){
    this.getUsers();
  }

  getUsers(){
    this.userService.getUsers().subscribe({
      next: (res) => this.data = res,
      error: (err) => this.error = err
    })
  }

  handleSubmit(form: any){
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }
    this.isLoading = true;
    if(this.isEditing && this.userId){
    const id = this.userId;
    const form = this.userForm.value;
    this.userService.updateUser(id, form).pipe(
      finalize (() =>{
        this.isEditing = false;
        this.getUsers();
        this.cdr.detectChanges();
      })
    ).subscribe({
      next: (res) => {;
        this.userForm.reset();
        alert(res?.message);
      },
      error: (err) => {
        alert("Error occured")
        console.error(err)
      }
    })
    }else{
    this.userService.createUser(form.value).pipe(
      finalize (() =>{
        this.isLoading = false;
        this.getUsers();
        this.cdr.detectChanges();
      })
      ).subscribe({
        next: (res) => {
          this.userForm.reset();
          alert(res?.message);
        },
        error: (err) => {
          alert("Error occured")
          console.error(err)
        }
      })
    }
  }

  handleEdit(userDetails: any){
    if(!userDetails){
      alert("Found No Id")
    }
    this.isEditing = true;
    this.userId = userDetails._id
    this.userForm.patchValue(userDetails);
  }

  handleDelete(id: string){
    if(!id){
      alert("Id Not Found")
    }
    if(confirm("Are you sure you want to delete this?") == true){
      this.userService.deleteUser(id).subscribe({
        next: (res) => {
          alert(res.message);
          this.getUsers();
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.log(err)
        }
      })
    }else{
      alert("Ok")
    }
  }
}

