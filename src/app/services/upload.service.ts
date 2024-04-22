import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  url: string = "http://localhost:8080";




  constructor(private http:HttpClient){}
  uploadFile( formData :FormData):Observable<any> {
    return this.http.post<void>(this.url + "/media/upload", formData);
}
}
