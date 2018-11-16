import { Component, OnInit } from '@angular/core';
import { MenuType } from './sidebar.metadata';//metadata for routes
import { ROUTES } from './sidebar-routes.config';//routes config
import { Router } from '@angular/router';

//services
import { AuthenticationService } from '../services/authentication.service';

//declare var for set any values
declare var $:any;
@Component({
	moduleId: module.id,
	selector: 'sidebar-cmp',
	templateUrl: 'sidebar.component.html'
})
export class SidebarComponent implements OnInit {

	constructor(private authenticationService: AuthenticationService,
				private router: Router){}
	public menuItems: any[];	
	ngOnInit() {
		$.getScript('../../assets/js/material-dashboard-angular.js');
		//set values to array when menuType are different to BRAND
        this.menuItems = ROUTES.filter(menuItem => menuItem.menuType !== MenuType.BRAND);
	}

	logout(){
		this.authenticationService.logout()
			.then(res => {
				if(res['success']) {
					return this.router.navigate(['/login']);
				}			
			});
	}
}