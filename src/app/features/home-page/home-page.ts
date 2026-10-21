import { ChangeDetectorRef, Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { finalize } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

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

  toastr = inject(ToastrService);

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
    const formVal = this.userForm.value;
    this.userService.updateUser(id, formVal).pipe(
      finalize (() =>{
        this.isLoading = false;
        this.cdr.detectChanges();
      })
    ).subscribe({
      next: (res) => {;
        this.toastr.success(res?.message, 'Success!');
          this.userForm.reset();
          this.isEditing = false;          
          this.userId = '';
          this.getUsers();
      },
      error: (err) => {
        this.isEditing = true;
        const errorMessage = err.error?.message || 'An error occured'
        this.toastr.error(errorMessage, 'Error!');
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

