import { Component } from "@angular/core";
import { Header } from "../../shared/components/header/header";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { UserService } from "../../../services/user.service";
import { CommonModule } from "@angular/common";

export interface PeriodicElement {
  firstName: string;
  middleName: string;
  lastName: string;
  age: string;
  location: any;
}

@Component({
  imports: [
    CommonModule,
    Header,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule
  ],
  selector: 'app-user-page',
  styleUrl: './user-page.css',
  templateUrl: './user-page.html',
})
export class UserPage {
  displayedColumns: string[] = ['firstName', 'middleName', 'lastName', 'age', 'location'];
  userList: PeriodicElement[] = [];
  dataSource = new MatTableDataSource(this.userList);

  constructor(
    private userService: UserService
  ){
    this.userService.getUsers().subscribe({
      next: (res) =>{
        this.userList = res?.data;
        this.dataSource.data = this.userList;
      },
      error: (err) =>{
        console.log("errrrrrr: ", err)
      }
    })

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
