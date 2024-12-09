import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private localStorageSubject = new Subject<void>();

  constructor() { }

  addItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));

    this.localStorageSubject.next();
  }

  getChanges() {
    return this.localStorageSubject.asObservable();
  }


}