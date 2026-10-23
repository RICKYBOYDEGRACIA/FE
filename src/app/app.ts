import { RouterOutlet } from '@angular/router';
import { Component, inject } from '@angular/core';
import { SidebarService } from '../services/sidebar.service';
import { CommonModule } from '@angular/common';
import { Sidebar } from './shared/components/sidebar/sidebar';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    RouterOutlet,
    Sidebar
],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App{
  sidebarService = inject(SidebarService)
  private authService = inject(AuthService)
}    