import { Component, OnInit } from '@angular/core';
//observable
import { Observable } from 'rxjs/Observable';

//models
import { Proveedor } from '../../models/proveedor';
//services
import { ProveedorService } from '../../services/proveedor.service';
import { AlertService } from '../../services/alert.service';

@Component({
	moduleId: module.id,
	selector: 'list-proveedores-cmp',
	templateUrl: 'list-proveedores.component.html'
})
export class ListProveedoresComponent implements OnInit {

	proveedores: Array<Proveedor>;
	
	constructor(private proveedorService: ProveedorService,
				private alertService: AlertService) {}

	ngOnInit() {
		this.proveedorService.findAll()
			.subscribe(res => {
				if(res['success']) {					
					return this.proveedores = res['proveedores'];					
				}
				return this.alertService.error(res['message'] || 'Error inesperado al obtener proveedores.');
			}, err => {
				this.alertService.error(err['message'] || 'Internal Server Error al obtener proveedores');
			});
	}
}