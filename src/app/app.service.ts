import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, take } from 'rxjs';

@Injectable({
  providedIn: 'any',
})
export class AppService {
  constructor(private http: HttpClient) {}

  public getCity(city: string) {
    const url: string = `https://ollie-weather-backend-cd657e24fe9a.herokuapp.com/${city}`;
    this.http
      .get(url)
      .pipe(
        map((data) => {
          console.log(data);
        }),
        take(1),
      )
      .subscribe();
  }
}
