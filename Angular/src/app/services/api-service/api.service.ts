import { HttpClient, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  public get<T>(url: string, options: any): Observable<T>{
    return this.http.get<T>(url,<Object>options).pipe(catchError(this.handleError));
  }

  public delete<T>(url: string, options: any): Observable<T>{
    return this.http.delete<T>(url,<Object>options).pipe(catchError(this.handleError));
  }

  public post<T>(url: string, options: any, data: string): Observable<T>{
    return this.http.post<T>(url,data,<Object>options).pipe(catchError(this.handleError));
  }

  public put<T>(url: string, options: any, data: string): Observable<T>{
    return this.http.put<T>(url,data,<Object>options).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {

     
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })

    console.error(`Code: ${error.status}, Message: `, error.error);
    if (error.status === 0) {
     
      console.error('An error occurred:', error.error);
      Toast.fire({
        icon: 'error',
        title: 'Network Error'
      })
       
    } 
    else if(error.status === 419){
      Toast.fire({
        icon: 'error',
        title: 'Invalid credentials'
      })
    }

    else if(error.status === 404){
      Toast.fire({
        icon: 'error',
        title: 'Resource Not found'
      })
    }

    else if(error.status === 500){
      Toast.fire({
        icon: 'error',
        title: 'Operation failed'
      })
    }

    else {
      Toast.fire({
        icon: 'error',
        title: 'Unknown Error'
      })
    }
    
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
