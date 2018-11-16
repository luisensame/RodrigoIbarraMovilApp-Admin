import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class AuthGuardService implements CanActivate {
	
	constructor(private router: Router) {}

	canActivate(){
		//if exist a token
		if(localStorage.getItem('rich-koua')) {
			return true;
		}else{
			//redirect to login
			this.router.navigate(['/login']);
			return false;
		}
	}
}