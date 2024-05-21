import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { environment } from '@environments/environment';
import { memberRequest } from '@app/models/memberRequest';
import { skillTypeId } from '@app/enums/skillTypeId';

@Injectable({
  providedIn: 'root',
})
export class MembersService {
  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'x-functions-key': environment.apiDefaultKey
    }),
    observe: 'response' as 'body',
    params: new HttpParams({}),
  };

  addMember(name: string, rank: string, designation: string, organization: string, placeOfBirth: string, 
    currentLocation: string, skills: string[] | skillTypeId[], weapons: string[], devilFruits: string[], bounty: number
  ): Observable<HttpResponse<null>> {
    let memberReq = new memberRequest(name, rank, designation, organization, placeOfBirth, 
      currentLocation, skills, weapons, devilFruits, bounty);
    let url = environment.apiUrl + '/addmember';
    return this.http
      .post<HttpResponse<null>>(url, memberReq, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError))

  }

  handleError(error: any) {
    let errorMessage = error.statusText;
    return throwError(() => {
      return errorMessage;
    });
  }
}
