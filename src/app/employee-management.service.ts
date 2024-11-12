import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeManagementService {

  private apiUrl = 'http://canteen.benzyinfotech.com/api/v3/customer/report';


  constructor(private http: HttpClient) { }

  getFoodOrderDetails(data: number): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }
}
