import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  
  private subject = new Subject<boolean>();
  constructor() { }

  load(load: boolean) {
    this.subject.next(load);
  }

  onLoad(): Observable<boolean> {
    return this.subject.asObservable();
  }
}
