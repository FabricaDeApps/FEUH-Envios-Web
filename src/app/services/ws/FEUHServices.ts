import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { LocalStoreService } from '../local-store.service';
import { Subject } from 'rxjs/Rx';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { Constants } from '../constants';


@Injectable()
export class FEUHServices {

  public subject = new Subject<string>();

  public car: any;

  constructor(private http: Http,
    private constants: Constants,
    private ls: LocalStoreService,
  ) { }


  isLoggedIn(): Boolean {
    if (this.ls.getItem("hashClient") == null) {
      return false;
    } else {
      return true;
    }
  }

  LoginAdmin(body: String) {
    return this.http.post(this.constants.PATH_API + 'admins/login', body, this.constants.getHeaders()).map(
      (response: Response) => {
        const data = response.json();
        console.log(data);
        return data;
      }
    )
      .catch(
        (error: Response) => {
          return Observable.throw('Something went wrong');
        }
      );
  }

  LoginClient(body: String) {
    return this.http.post(this.constants.PATH_API + 'users/login', body, this.constants.getHeaders()).map(
      (response: Response) => {
        const data = response.json();
        console.log(data);
        return data;
      }
    )
      .catch(
        (error: Response) => {
          return Observable.throw('Something went wrong');
        }
      );
  }

  RegisterUser(body: String) {
    return this.http.post(this.constants.PATH_API + 'users/preregister', body, this.constants.getHeaders()).map(
      (response: Response) => {
        const data = response.json();
        console.log(data);
        return data;
      }
    )
      .catch(
        (error: Response) => {
          return Observable.throw('Something went wrong');
        }
      );
  }


  GetUsers(body: String) {
    return this.http.post(this.constants.PATH_API + 'users/findAllPagination', body, this.constants.getHeaders()).map(
      (response: Response) => {
        const data = response.json();
        console.log(data);
        return data;
      }
    )
      .catch(
        (error: Response) => {
          return Observable.throw('Something went wrong');
        }
      );
  }




}