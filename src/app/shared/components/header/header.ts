import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  imports: [
    MatButtonModule,
    CommonModule
  ],
  selector: 'app-header',
  styleUrl: './header.css',
  templateUrl: './header.html',
})
export class Header {
  @Input() title = ''; 

  constructor(
    private router: Router,
    private authService: AuthService
  ){

  }

  logout(){
        localStorage.removeItem('token')
        this.router.navigate(['/'])
    }
}
