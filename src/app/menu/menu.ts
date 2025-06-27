import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { Apicalls } from '../services/apicalls'

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, CommonModule],
  templateUrl: './menu.html',
  styleUrls: ['./menu.css']
})
export class Menu {
  private apiService = inject(Apicalls);
  dishList: any[] = [];

  constructor(){
    this.dishList=this.apiService.dishList;
  }

}