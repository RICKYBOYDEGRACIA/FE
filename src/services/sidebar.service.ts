import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
@Injectable({ providedIn: 'root' })
export class SidebarService {
  isCollapsed = signal<boolean>(false);
  isMobileOpen = signal<boolean>(false);

  toggleCollapse() {
    this.isCollapsed.update(val => !val);
  }

  toggleMobile() {
    this.isMobileOpen.update(val => !val);
  }

  closeMobile() {
    this.isMobileOpen.set(false);
  }
}