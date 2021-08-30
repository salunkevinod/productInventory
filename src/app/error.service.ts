import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor() { }

  handleError(err:HttpErrorResponse) {
    let errorMessage = "An error occurred.Please trg again."
    return throwError(errorMessage);
  }
}
