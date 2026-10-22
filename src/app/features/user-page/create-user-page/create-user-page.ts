import { Component } from '@angular/core';
import { Header } from '../../../shared/components/header/header';
import { UserForm } from '../user-form/user-form';

@Component({
  imports: [Header, UserForm],
  selector: 'app-create-user-page',
  styleUrl: './create-user-page.css',
  templateUrl: './create-user-page.html',
})
export class CreateUserPage {
  
}
