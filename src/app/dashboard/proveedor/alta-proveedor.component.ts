import { Component, OnInit } from '@angular/core';

//Module for use api observable pattern and handler exception
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';

//models
import { Proveedor } from '../../models/proveedor';
import { Representante } from '../../models/representante';
import { Estado } from '../../models/estado';

//servicios
import { ProveedorService } from '../../services/proveedor.service';
import { AlertService } from '../../services/alert.service';
import { CatalogoEstadosService } from '../../services/catalogo.estados.service';
import { LoaderService } from '../../services/loader.service';



@Component({
	moduleId: module.id,
	selector: 'alta-proveedor-cmp',
	templateUrl: 'alta-proveedor.component.html'
	//No provider for service, the service use on dashbord module	
})
export class AltaProveedorComponent implements OnInit{
	proveedor: Proveedor;
	representante: Representante;
	catalogoEstados: Array<Estado>;
	estado: Estado;
	
	constructor(private proveedorService: ProveedorService,
				private alertService: AlertService,
				private catalogoEstadosService: CatalogoEstadosService,
				private loaderService: LoaderService) {
		this.proveedor = new Proveedor();
		this.representante = new Representante();
		this.estado = new Estado();		
	}

	ngOnInit(){
		this.obtenerCatalogoEstados();
	}


	/**
	 * Funcion que obtiene el catalogo de estados
	 */
	obtenerCatalogoEstados(){
		this.catalogoEstadosService.getCatalogoEstados()
			.subscribe( res => {
				if (res && res['success']) {
					this.catalogoEstados = res['estados'];					
				}
			}, err => {
				console.log('err catalogo estados: ', err);
			});
	}
	
	crearProveedor(){				
		this.loaderService.show();
		this.proveedor.representante = this.representante;
		this.proveedor.estado = this.estado;		
		console.log(this.proveedor);
		this.proveedorService.crear(this.proveedor)
			.subscribe(
				response => {
					this.loaderService.hide();	
					console.log('response: ', response);
					if(response && response['success']) {
						this.proveedor = new Proveedor();
						this.representante = new Representante();
						return this.alertService.success(response['message']);						
					}

					this.alertService.error(response['message'] || 'Error inesperado, inténtalo nuevamente');
				},
				errorResponse => {
					this.loaderService.hide();	
					let m = errorResponse['message'] || 'Internal Server Error';
					this.alertService.error(m);
				});	
	}
}