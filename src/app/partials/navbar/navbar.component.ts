import { Component, OnInit } from '@angular/core';
//list group with routes config
import { ROUTES } from '../.././sidebar/sidebar-routes.config';
//interfacce of metadata for router info
import { MenuType } from '../.././sidebar/sidebar.metadata';

@Component({
	moduleId: module.id,
	selector: 'navbar-cmp',
	templateUrl: 'navbar.component.html'
})

export class NavbarComponent implements OnInit {		
	private listTitles: any[];
	ngOnInit() {
		//set list titles from routes config when menuType are different BRAND
		this.listTitles = ROUTES.filter(listTitle => listTitle.menuType !== MenuType.BRAND);
	}

	getTitle(){
		let title = window.location.pathname;		
		title = title.substring(1);
		for (let t of this.listTitles) {
			if(t.path === title) {
				return t.title;
			}			
		}

		return 'Dashboard';
	}
}