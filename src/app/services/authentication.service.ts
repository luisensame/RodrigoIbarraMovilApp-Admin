import { Injectable } from '@angular/core';
import {Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

//config
import  {config} from '../config';
//models
import { UsuarioStaff } from '../models/usuario.staff';


@Injectable()
export class AuthenticationService {		
	
	//Api url
	private api = config.apiUrl + '/staff-authenticate';

	//create instace of http module
	constructor(private http: Http) {}

	auth(usuarioStaff: UsuarioStaff): Observable<Object>{		
    	
		return this.http.post(this.api, usuarioStaff)
			.map((res: Response) => {
				let result = res.json();
				if(result && result.success && result.token) {
					localStorage.setItem('rich-koua', result.token);
					return {success: true, message: 'User authenticate'};
				}
				return { success: false, message: 'Authentication not valid'};
			})
			.catch((error: Response | any) => {
				let errResult: Object;
				if (error instanceof Response) {
					 if(error.json()['message']){
					 	errResult = {success: false, message: error.json()['message']};
					 }else{
					 	errResult = {success: false, message: 'Internal Server error'};
					 }					
				} else {
					errResult = {success: false, message: (error.message || 'Internal Server Error')};
				}						
				return Observable.throw(errResult);
			});
	}

	isLoggedIn(){		
		let headers = new Headers({
					'Content-Type': 'application/json',
					'x-access-token': localStorage.getItem('rich-koua')
				});
    	let options = new RequestOptions({ headers: headers });
		return this.http.get(config.apiUrl + '/user-staff/me', options)
			.map((res: Response) => {
				let result = res.json();				
				if(result && result['success']) {
					return {success: true, message: 'Success user isLoggedIn'};
				}				
				return {success: false, message: 'User not authenticate'};
			})
			.catch((error: Response | any) => {
				let errResult: Object;
				if (error instanceof Response) {
					 if(error.json()['message']){
					 	errResult = {success: false, message: error.json()['message']};
					 }else{
					 	errResult = {success: false, message: 'Internal Server error'}					
					 }					
				} else {
					errResult = {success: false, message: (error.message || 'Internal Server error')};
				}						
				return Observable.throw(errResult);
			});				
	}

	
	logout(){
		return new Promise((resolve, reject) => {
			localStorage.removeItem('rich-koua');
			resolve({success: true});
		});
	}

}