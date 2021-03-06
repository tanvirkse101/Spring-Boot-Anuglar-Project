import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, from} from 'rxjs';

const baseUrl = 'http://localhost:8080/api/tutorials';


@Injectable({
  providedIn: 'root'
})
export class TutorialService {

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<any> {
    return this.http.get(baseUrl);
  }

  get(id: string): Observable<any> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  create(data: object): Observable<object> {
    return this.http.post(baseUrl, data);
  }

  createWithImage(title: string, description: string, published: boolean, image: File): Observable<any> {
    // @ts-ignore
    // headers: {
    //   "Content-Type": file.type
    // }
    return this.http.post(`${baseUrl}/image?title=${title}&description=${description}&image=${image}`,
      {headers: {'Content-Type': 'multipart/form-data'}});
  }

  getTutorialWithImage(id: string): Observable<any>{
    return this.http.get(`http://localhost:8080/api/tutorialimage/${id}`);
  }

  update(id: string, data: object): Observable<object> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  findByTitle(title: string): Observable<any> {
    return this.http.get(`${baseUrl}?title=${title}`);
  }
}
