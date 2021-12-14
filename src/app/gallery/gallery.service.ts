import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  constructor(private http: HttpClient) { }

/**
   * Retrieve photos from NASA API
   * @param {number} sol - sol (ranges from 0 to max found in endpoint)
   * @param {number} page - 25 items per page returned default 1
   * @param {string} rover - values curiosity,opportunity,spirit
   * @return {Observable<any>} - Observable of type any.
   */
  getPhotos(sol: number, page: number, rover: string): Observable<any> {
    return this.http.get<any>(`${rover}/photos?sol=${sol}&page=${page}&api_key=${environment.api_key}`);
  }
    // https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&page=1&api_key=OXhhgVKehOwZtAamH2AviBNohT4DJ1yrSEiahs9n

}
