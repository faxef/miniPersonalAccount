import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token: string | null = null;
  private userData: User | null = null;

  isLoggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {
    this.resolveToken();
  }

  private resolveToken(): void {
    this.token = localStorage.getItem('token');
    this.isLoggedIn.next(!!this.token);
  }

  getToken(): string | null {
    return this.token;
  }

  hasToken(): boolean {
    return !!this.token;
  }

  logout(): Observable<boolean> {
    return this.http.get(`${environment.apiBaseUrl}/api/auth/logout`).pipe(
      tap(() => {
        this.clearData();
        this.isLoggedIn.next(false);
      }),
      map(() => true),
      catchError(() => of(false))
    );
  }

  login(credentials: any): Observable<any> {
    this.clearData();

    return this.http.post<{ token: string; user: User }>(`${environment.apiBaseUrl}/api/auth/login`, credentials).pipe(
      tap((data) => {
        if (data.token && data.user) {
          this.setDataAfterLogin(data);
          this.isLoggedIn.next(true);
        }
      }),
      map((data) => (data.token && data.user ? data.user : false)),
      catchError(() => of(false))
    );
  }

  private clearData(): void {
    this.userData = null;
    this.token = null;
    localStorage.clear();
  }

  getUserData(){
    // @ts-ignore
    return JSON.parse(localStorage.getItem('user-data'));
  }

  private setDataAfterLogin(data: { token: string; user: User }): void {
    this.token = data.token;
    this.userData = data.user;

    localStorage.setItem('token', this.token);
    localStorage.setItem('user-data', JSON.stringify(this.userData));
  }
}
