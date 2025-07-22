import { Injectable } from '@angular/core';
import { api } from '../../lib/axios'; // your axios.ts path

@Injectable({ providedIn: 'root' })
export class ApiService {
  getWelcome() {
    return api.get('/welcome');
  }
}
