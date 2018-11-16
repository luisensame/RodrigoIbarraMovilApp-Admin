import { Component, OnInit  } from '@angular/core';
import { Router } from '@angular/router';


//models
import { UsuarioStaff } from '../models/usuario.staff';

//service to authenticate user
import { AuthenticationService } from '../services/authentication.service';
import { AlertService } from '../services/alert.service';


@Component({
	moduleId: module.id,
	selector: 'login-cmp',
	templateUrl: 'login.component.html',
	styleUrls: ['../../assets/css/login.css']
})
export class LoginComponent implements OnInit {

	usuarioStaff: UsuarioStaff;
	message: string;
	procesando: boolean;

	//create instance of services and modules
	constructor(private authenticationService: AuthenticationService,
				private router: Router,
				private alertService: AlertService) {
		this.usuarioStaff = new UsuarioStaff();
		this.procesando = false;
	}

	ngOnInit(){
		//reset login
		this.authenticationService.logout();		
	}

	/**
	 * Funcion to authenticate a user staff
	 */
	login(){
		this.procesando = true;
		//call service to authenticate user
		this.authenticationService.auth(this.usuarioStaff)
			.subscribe(
				response => {
					this.procesando = false;
					if(response && response['success']) {
						//redirect to dashboard user						
						return this.router.navigate(['/dashboard']);
					}

					//show error
					this.alertService.error(this.message || '');					
					return this.message = 'Error inesperado, inténtalo nuevamente.';
				},
				errorResponse => {					
					//show error
					this.message = errorResponse.message;
					this.alertService.error(this.message || '');
					this.procesando = false;
				}
			);
	}
}