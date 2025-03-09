import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';

import { CommonModule } from '@angular/common';

import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
