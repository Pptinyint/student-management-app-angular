import { inject, Injectable } from '@angular/core';

import { IStudent, IUser } from '../interface/interface';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { Constant } from '../Constent/constant';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  
  http=inject(HttpClient)

  constructor() { }


createNewStudent(stdObj:IStudent): Observable<IStudent>{
   return this.http.post<IStudent>(environment.API+ Constant.API_END_POINT.CREATE_STUDENTS, stdObj)
}

//Get all data
getStudents(): Observable<IStudent[]>{
   return this.http.get<IStudent[]>(environment.API+Constant.API_END_POINT.GET_ALL_STUDENTS)
}
getStudentById(stdobj:IStudent): Observable<IStudent>{
   return this.http.get<IStudent>(environment.API+Constant.API_END_POINT.GET_ALL_STUDENTS +"/"+stdobj.id)
}


//delte all data
deleteStudents(stdObj:IStudent): Observable<IStudent>{
   return this.http.delete<IStudent>(environment.API+Constant.API_END_POINT.DELETE_STUDENTS + "/" + stdObj.id)
}

//update
updateStudent(stdObj:IStudent): Observable<IStudent>{
   return this.http.put<IStudent>(environment.API+Constant.API_END_POINT.UPDATE_STUDENTS + '/' + stdObj.id, stdObj)
}

//userLogin
createNewuser(stdObj:IUser): Observable<IUser>{
   return this.http.post<IUser>(environment.API+Constant.LOGIN_USER_END_POINT.CREATE_LOGIN_USER, stdObj)
}

//login
usersLogin(): Observable<IUser[]> {
   return this.http.get<IUser[]>(environment.API+Constant.LOGIN_USER_END_POINT.LOGIN_USER)
}
// //get user
// getuser(): Observable<IStudent[]>{
//    return this.http.get<IStudent[]>(environment.API+Constant.API_END_POINT.GET_ALL_STUDENTS)
// }


deleteLoginUser(id: string | number): Observable<IUser> {
   return this.http.delete<IUser>(environment.API + Constant.LOGIN_USER_END_POINT.LOGIN_USER + '/' + id);
}

}
