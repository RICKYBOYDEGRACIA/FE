import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SidebarService } from '../../../../services/sidebar.service';

export interface NavItem {
  label: string;
  routePath: string;
  icon: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, MatIconModule, MatButtonModule],
  templateUrl: './sidebar.html'
})
export class Sidebar {
  sidebarService = inject(SidebarService);

  // TypeScript navigation array
  navItems: NavItem[] = [
    { label: 'Home', routePath: '/home', icon: 'dashboard' },
    { label: 'Users', routePath: '/user-page', icon: 'people' },
  ];

  toggleSidebar() {
    this.sidebarService.toggleCollapse();
  }

  closeMobileMenu() {
    this.sidebarService.closeMobile();
  }
}