import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUserProfile = (accessToken: string): Observable<any> => {
    return this.http.get<string>(`${environment.api}/users/me`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  };

  updateUserProfile = (data: any): Observable<any> => {
    const id = data.id;
    delete data.id;
    delete data.email;
    return this.http.patch<string>(`${environment.api}/users/${id}`, data);
  }
}
