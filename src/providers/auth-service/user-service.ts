import {Injectable} from '@angular/core';
import { Http, Headers, Response ,RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { AppSettings } from '../../app/app-settings';
import { AppContext } from "../shared/app-context";
//let apiUrl = 'http://weishen.000webhostapp.com/mobileapi/';
//let apiUrl = 'http://localhost/';
/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserServiceProvider {

     public token: string;
    headers = new Headers({'Accept': 'application/json','content-type':'application/json'}); //use for natans post method
    options = new RequestOptions({headers: this.headers});

  constructor(
    private http: Http,
    private appContext: AppContext) {
  }


  postData(url,data) : Observable<string[]> 
  {
    console.log(AppSettings.API_STARTPOINT);
  return this.http.post(url, JSON.stringify(data),this.options)
                  .map(this.extractData)
                  .catch(this.handleError);
  }

  getData(url) : Observable<string[]> 
  {
    return this.http.get(url)
                  .map(this.extractData)
                  .catch(this.handleError);
  }

  deleteData(url) : Observable<string[]> 
  {
    return this.http.delete(url)
                  .map(this.extractData)
                  .catch(this.handleError);
  }

  putData(url,data) : Observable<string[]> 
  {
    console.log(AppSettings.API_STARTPOINT);
  return this.http.put(url, JSON.stringify(data),this.options)
                  .map(this.extractData)
                  .catch(this.handleError);
  }


  verifyEmail(credentials) : Observable<string[]> 
  {
  return this.http.post(AppSettings.API_STARTPOINT +'user/emailvalidation', JSON.stringify(credentials),this.options)
                  .map(this.extractData)
                  .catch(this.handleError);
  }

   reference(key) : Observable<string[]> 
  {
     return this.http.get(AppSettings.API_STARTPOINT +'user/getusers?searchKey='+key)
                  .map(this.extractData)
                  .catch(this.handleError);
  }


  userRegistration(params) : Observable<string[]> 
  {
  return this.http.post(AppSettings.API_STARTPOINT +'user/signup', JSON.stringify(params),this.options)
                  .map(this.extractData)
                  .catch(this.handleError);
  }


  private extractData(res: Response) {
  let body = res.json();
  return body || { };
}

private handleError (error: Response | any) {
  let errMsg: string;
  if (error instanceof Response) {
    const body = error.json() || '';
    const err = body.error || JSON.stringify(body);
    errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
  } else {
    errMsg = error.message ? error.message : error.toString();
  }
  console.error(errMsg);
  return Observable.throw(errMsg);
}

  findUsers(data) : Observable<any>
  {
    var url = `${AppSettings.API_STARTPOINT}user/findusers`;
    return this.http.post(url, data, this.options)
                  .map(this.extractData)
                  .catch(this.handleError);
  }

  markAsFavoritePlayer(player: any, favorite: number = 1 ){
    
    var request = {
      "favoriteType": "PLAYER",
      "favoriteUserId": player["userid"],
      "favoriteFlag": favorite,
      "userId": this.appContext.userInfo.user.userid
    }
    var url = `${AppSettings.API_STARTPOINT}user/favorite`;
    return this.http.post(url, request, this.options)
                  .map(this.extractData)
                  .catch(this.handleError);
  }
}
