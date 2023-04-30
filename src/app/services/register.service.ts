import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http'
import { User } from '../user-type';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService  {

 

 private url :string= "http://localhost:3000/userReg";

 
  constructor(private http:HttpClient) { }

  // To get Data from server 
  getUserdata():Observable<User[]>{
   return this.http.get<User[]>(this.url);
  }

  // To Add data from form to server data

  addUserdata(course:any):Observable<User[]>{
    return this.http.post<User[]>(this.url , course);
  }

  // TO Delete the user from server

  deleteUser(id:number){
    return this.http.delete(`${this.url}/${id}`);
  }

  updateUser(id:number,data:any):Observable<User>{
    return this.http.put<User>(`${this.url}/${id}`,data);
  }

}
