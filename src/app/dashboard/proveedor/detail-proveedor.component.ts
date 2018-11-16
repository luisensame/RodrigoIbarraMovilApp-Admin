import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';//modulo que provee un observable params


//Mapea los params de la ruta a un nuevo observable
import 'rxjs/add/operator/switchMap';

//models
import { Proveedor } from '../../models/proveedor';
import { Representante } from '../../models/representante';
import { Estado } from '../../models/estado';

//servicios
import { ProveedorService } from '../../services/proveedor.service';
import { AlertService } from '../../services/alert.service';
import { CatalogoEstadosService } from '../../services/catalogo.estados.service';
import { LoaderService } from '../../services/loader.service';


declare var $:any;

@Component({
	moduleId: module.id,
	selector: 'detail-proveedor-cmp',
	templateUrl: 'detail-proveedor.component.html'
})
export class DetailProveedorComponent implements OnInit {	
	
	private sub: any; //subscribe para params
	proveedor: Proveedor;	
	representante: Representante;
	catalogoEstados: Array<Estado>;

	constructor(private proveedorService: ProveedorService,
				private alertService: AlertService,
				private route: ActivatedRoute,
				private catalogoEstadosService: CatalogoEstadosService,
				private loaderService: LoaderService) {
		this.proveedor = new Proveedor();		
		this.representante = new Representante();
	}

	ngOnInit(){
		//options para que los input detecten populate desde Angular2	
		$.material.options.autofill = true;
        $.material.init()

		this.sub = this.route.params.subscribe(params => {			
			this.findProveedorPorId(params['id']);			
		});		

		this.obtenerCatalogoEstados();
	}

	ngOnDestroy(){
		this.sub.unsubscribe();
	}

	/**
	 * Funcion que obtiene la informacion de un proveedor por id
	 * @param {string} id del proveedor
	 */
	findProveedorPorId(id:string){		
		this.proveedorService.findById(id)
			.subscribe(res => {						
				if(res && res['success']) {
					this.proveedor = res['proveedor'];
					if(this.proveedor) {						
						this.representante = this.proveedor['representante'] ? this.proveedor['representante'] : new Representante();
						this.proveedor['representante'] = new Representante();	
					}
					return false;
				}

				return this.alertService.error(res['message'] || 'Error inesperado, si el problema persiste contacta a soporte.');
			}, err => {								
				let m = err['message'] || 'Internal Server Error';
				this.alertService.error(m);
			});
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

	/**
	 * Funcion que actualiza la informacion de un proveedor
	 */
	updateProveedor(){		
		this.loaderService.show();
		this.proveedor.representante = this.representante;
		this.proveedorService.update(this.proveedor)
			.subscribe(
				response => {	
					this.loaderService.hide();
					if(response && response['success']) {						
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