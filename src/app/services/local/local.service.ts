import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalService {

  constructor() { }

  public set (key:string, value:any) :void
  {
    if(typeof value!='string')
    {
      value=JSON.stringify(value);
    }

    localStorage.setItem(key,value);

  }

  public get(key:string) :any
  {
    const data=localStorage.getItem(key);
    if(data?.length)
    {
      return JSON.parse(data);
    }
    return null;
  }

  public remove(key:string)
  {
     localStorage.removeItem(key);
  }

  public clear()
  {
     localStorage.clear();
  }
}
