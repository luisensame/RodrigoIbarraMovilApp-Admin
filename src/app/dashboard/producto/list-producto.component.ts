import { Component, OnInit } from '@angular/core';

import { ProductoService } from '../../services/producto.service';
import { AlertService } from '../../services/alert.service';
import { Producto } from '../../models/producto';

@Component({
	moduleId: module.id,
	selector: 'list-producto-cmp',
	templateUrl: 'list-producto.component.html'
})
export class ListProductoComponent implements OnInit {
	
	productos:Array<Producto>;

	constructor(private productoService: ProductoService,
				private alertService: AlertService) {}

	ngOnInit() {
		this.getAllProducts();
	}

	getAllProducts(){
		this.productoService.getAllProducts()
		.subscribe(res=>{			
			if(res && res['success']) {
				return this.productos = res['productos'];
			}
			return this.alertService.error(res['message'] || 'Error inesperado al obtener productos.');
		}, err => {
			this.alertService.error(err['message'] || 'Internal Server Error al obtener productos');
		});		
	}
}