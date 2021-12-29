import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class VideoService {
  constructor(private http: HttpClient) {}

  getVideos = (): Observable<any> => {
    return this.http.get<string>(`${environment.api}/items/videos`);
  };

  getVideoById = (id: number): Observable<any> => {
    return this.http.get<string>(`${environment.api}/items/videos/${id}`);
  };

  updateVideo = (id: number, formData: any): Observable<any> => {
    return this.http.patch<any>(`${environment.api}/items/videos/${id}`, formData);
  }

  createVideo = (formData: any): Observable<any> => {
    return this.http.post<any>(`${environment.api}/items/videos`, formData);
  }

  deleteVideo = (id: number): Observable<any> => {
    return this.http.delete<any>(`${environment.api}/items/videos/${id}`);
  }

  // Used by consultants to get video for starting captioning
  captureVideo = (id: number, consultant_id: string): Observable<any> => {
    return this.http.patch<any>(`${environment.api}/items/videos/${id}`, { consultant_id, status: '2in_progress' });
  }

  releaseCapture = (id: number): Observable<any> => {
    return this.http.patch<any>(`${environment.api}/items/videos/${id}`, { consultant_id: null, status: '0created' });
  }
}
