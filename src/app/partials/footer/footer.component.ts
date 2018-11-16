import { Component } from '@angular/core';

@Component({
	moduleId: module.id,
	selector: 'footer-cmp',
	templateUrl: 'footer.component.html'
})

export class FooterComponent {
	fecha: Date;
	constructor(){
		this.fecha = new Date();
	}
}