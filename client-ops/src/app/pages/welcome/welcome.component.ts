import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { environment } from './../../../enviroments/enviroment'; // adjust if needed

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './welcome.component.html',
})
export class WelcomeComponent implements OnInit {
  message = signal('Loading...');
  appName = signal(environment.APP_NAME || 'App');
  logoUrl = signal(environment.APP_LOGO_URL || 'assets/logo.svg');

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api.getWelcome()
      .then(res => this.message.set(res.data))
      .catch(() => this.message.set('Error loading welcome message.'));
  }
}
