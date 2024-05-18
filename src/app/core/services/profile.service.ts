import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, of} from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import {User} from "../interfaces/user";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {


  constructor(private http: HttpClient) { }

  update(data: any): Observable<boolean> {
    return this.http.put<boolean>(`${environment.apiBaseUrl}/api/profile/edit`, data).pipe(
      tap(success => {
        if (success) {
          // @ts-ignore
          this.setDataUser(success)
        }
      }),
      catchError(() => of(false))
    );
  }


  private setDataUser(data: User): void {
    // @ts-ignore
    const prevUserData = JSON.parse(localStorage.getItem('user-data'));
    localStorage.setItem('user-data', JSON.stringify({...prevUserData, ...data}));
  }

}
