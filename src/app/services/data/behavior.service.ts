import { Injectable } from '@angular/core';
import {BehaviorSubject,Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class BehaviorService {

  constructor() { }


  public searchValue$=new BehaviorSubject(null);


  public setData(data:any) : void
  {
    this.searchValue$.next(data);
  }

  public getData():Observable<any>
  {
    return this.searchValue$.asObservable();
  }
}
