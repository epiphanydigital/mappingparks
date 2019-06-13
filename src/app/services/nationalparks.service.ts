import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NationalparksService {
  private NPS_API_KEY = 'W3QOn2pba2nEPBLJaFOc5hzpdwohepiZ12kpFCGw';

  constructor(private http: HttpClient) {}

  public getParks = (stateCode: string[]): Observable<HttpResponse<any>> => {
    const states: string = stateCode.join();
    const url = `https://developer.nps.gov/api/v1/parks?limit=99999&stateCode=${states}&api_key=${this.NPS_API_KEY}`;
    return this.http.get<any>(url);
  };
}
