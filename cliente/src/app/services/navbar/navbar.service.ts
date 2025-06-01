import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
private searchSource = new Subject<string>();
  search$ = this.searchSource.asObservable();

  triggerSearch(searchTerm: string) {
    this.searchSource.next(searchTerm);
  }

}
