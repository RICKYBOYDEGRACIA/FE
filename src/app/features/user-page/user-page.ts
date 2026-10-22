import { Component } from "@angular/core";
import { Header } from "../../shared/components/header/header";

@Component({
  imports: [Header],
  selector: 'app-user-page',
  styleUrl: './user-page.css',
  templateUrl: './user-page.html',
})
export class UserPage {}
