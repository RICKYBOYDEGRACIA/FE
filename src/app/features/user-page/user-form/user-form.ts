import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../../services/user.service';
import { CommonModule } from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { finalize } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../../services/auth.service';
import { UserFormModel } from '../../../shared/interface/user.inteface';

@Component({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule],
  selector: 'app-user-form',
  styleUrl: './user-form.css',
  templateUrl: './user-form.html',
})
export class UserForm {

  isLoading: boolean = false;
  isEditing: boolean = false;
  userId : string = '';

  toastr = inject(ToastrService);

  private fb = inject(FormBuilder);

  constructor(
    private authService: AuthService,
    private cdr: ChangeDetectorRef,
  ){}
  data: any;
  error: any;

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

  ngOnInit(){
  }


  handleSubmit(){
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }
    const formVal: UserFormModel = this.userForm.getRawValue();
    this.authService.createUser(formVal).pipe(
      finalize (() =>{
        this.isLoading = false;
        this.cdr.detectChanges();
      })
      ).subscribe({
        next: (res) => {
          this.userForm.reset();
          this.toastr.success(res.message)
        },
        error: (err) => {
          this.toastr.error(err.error?.message)
          console.error(err)
        }
      })
  }

  handleEdit(userDetails: any){
    if(!userDetails){
      alert("Found No Id")
    }
    this.isEditing = true;
    this.userId = userDetails._id
    this.userForm.patchValue(userDetails);
  }

}
