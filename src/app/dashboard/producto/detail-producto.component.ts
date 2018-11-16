import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';//modulo que provee un observable params


//Mapea los params de la ruta a un nuevo observable
import 'rxjs/add/operator/switchMap';

//models
import { Producto } from '../../models/producto';
import { CategoriaProducto } from '../../models/categoria.producto';
import { Proveedor } from '../../models/proveedor';

//servicios
import { ProductoService } from '../../services/producto.service';
import { AlertService } from '../../services/alert.service';
import { ColorPickerService } from 'angular2-color-picker';
import { CatalogoCategoriaProductoService } from '../../services/catalogo.categoria.producto.service';
import { ProveedorService } from '../../services/proveedor.service';
import { LoaderService } from '../../services/loader.service';

//datepicker
import {IMyDpOptions, IMyDateModel, IMyDate} from 'mydatepicker';

//config
import  {config} from '../../config';


declare var $:any;

@Component({
	moduleId: module.id,
	selector: 'detail-producto-cmp',
	templateUrl: 'detail-producto.component.html',
	styleUrls: ['../../../assets/css/producto.css']
})
export class DetailProductoComponent implements OnInit {
	
	private sub: any; //subscribe para params
	producto: Producto;	
	//colors
	colores: Array<string>;
	showColores: boolean;
	private color:string;

	//caracteristicas dinamicas
	showCaracteristicas: boolean;
	nuevaCaracteristica: Object;	

	categorias: Array<CategoriaProducto>;

	alertFile: Array<Object>;	
	imagenValida: Array<boolean>;
	files: Array<File>;

	proveedores: Array<Proveedor>;

	//declaracion de datepicker
	private myDatePickerOptions: IMyDpOptions = config.myDatePickerOptions;

	//date to datepicker definition
	date = new Date();
    // Initialized to specific date with current date
    private fechaExpiracion: Object;


	constructor(private productoService: ProductoService,
				private catalogoCategoriaProductoService: CatalogoCategoriaProductoService,
				private alertService: AlertService,
				private proveedorService: ProveedorService,
				private router: Router,
				private route: ActivatedRoute,
				private loaderService: LoaderService) {
		this.producto = new Producto();
		this.color = "#fff";
		this.nuevaCaracteristica = {nombre: '', valor: ''};
		this.categorias = [];
		this.alertFile = [
			{errValid: false, message: ''},
			{errValid: false, message: ''},
			{errValid: false, message: ''},
			{errValid: false, message: ''}
		];

		this.imagenValida = [false, false, false, false];
		this.files = [null, null, null, null];
	}

	ngOnInit(){

		this.sub = this.route.params.subscribe(params => {			
			this.findProductoPorId(params['id']);
		});

		this.obtenerCatalogoCategorias();
		this.obtenerProveedores();

		//options para que los input detecten populate desde Angular2	
		$.material.options.autofill = true;
        $.material.init()
	}

	ngOnDestroy(){
		this.sub.unsubscribe();
	}

	// dateChanged callback function called when the user select the date. This is mandatory callback
    // in this option. There are also optional inputFieldChanged and calendarViewChanged callbacks.
    onFechaExpiracionChanged(event: IMyDateModel) {
        // event properties are: event.date, event.jsdate, event.formatted and event.epoc
        this.producto.fechaExpiracion = ''+ event.jsdate;
    }

	/**
	 * Funcion que obtiene la informacion de un proveedor por id
	 * @param {string} id del proveedor
	 */
	findProductoPorId(id:string){		
		this.productoService.findById(id)
			.subscribe(res => {
				if(res && res['success']) {
					this.producto = res['producto'];
					if(this.producto){
						if(typeof this.producto.colores !== 'undefined' && this.producto.colores.length > 0){
							this.showColores = true;
						}					
						if(typeof this.producto.caracteristicas !== 'undefined' && this.producto.caracteristicas.length >0){
							this.showCaracteristicas = true;
						}

						let dateExpiracion = new Date(this.producto.fechaExpiracion);						
						this.fechaExpiracion = {date: { year: dateExpiracion.getFullYear(), month: dateExpiracion.getMonth() + 1, day: dateExpiracion.getDate()}};
					}					
					return true;
				}
				this.alertService.error(res['message'] || 'Error inesperado, si el problema persiste por favor contacta a soporte.');
				return false;
			}, err => {								
				let m = err['message'] || 'Internal Server Error';
				this.alertService.error(m);
				return false;
			});
	}

	/**
	 * Funcion que agrega el color del picker a la lista de colores
	 */
	addColor(){		
		this.producto.colores.push(this.color);
		this.color = '#fff';
	}

	/**
	 * Funcion que elimina el color de la lista de colores por medio del indice
	 * @param {Number} index indice del color a eliminar dentro del array
	 */
	deleteColor(index:any) {		
		if(index > -1) {			
			this.producto.colores.splice(index, 1);
		}
	}

	addCaracteristica(){
		//Se convierte la cadena de valores en array de string
		let valores = this.nuevaCaracteristica['valor'].split(',');
			//Se filtran solo los valores con contenido
			valores = valores.filter(function (val: any){
				return val !== '';
			});		

		//Se agrega la caracteristica a la lista
		this.producto.caracteristicas.push({
			nombre: this.nuevaCaracteristica['nombre'],
			valores: valores
		});		

		this.nuevaCaracteristica = {nombre: '', valor: ''};
	}

	deleteCaracteristica(index: any){		
		if(index > -1) {
			this.producto.caracteristicas.splice(index, 1);
		}
	}


	/**
	 * Funcion que obtiene una lista del catalogo de categorias
	 */
	obtenerCatalogoCategorias(){
		this.catalogoCategoriaProductoService.getCatalogoCategoriasProducto()
			.subscribe(res => {
				if(res && res['success']) {
					this.categorias = res['catalogo'];
				}
			}, err => {
				console.log('err catalogo: ', err);
			});
	}

	/**
	 * Funcion que obtiene la lista de proveedores registrados
	 */
	obtenerProveedores(){		
		this.proveedorService.findAll()
			.subscribe(res => {				
				if(res && res['success']) {
					this.proveedores =  res['proveedores'];
				}
			}, err => {
				console.log('err: ', err);
			});
	}


	/**
	 * Funcion que detecta el valor de cambio en el input file y lo agrega a la lista de files validos
	 * @param {any} fileInput cualquier valor File
	 */
	fileChangeEvent(fileInput: any, imgPosition:number){
		//reset alert object
		this.alertFile[imgPosition] = {errValid: false, message: ''};
		let file = fileInput ? fileInput.target.files[0] : null;
		if(file) {
			//validacion del tipo de archivo
			if(!file.type.match('.(jpeg)|(png)|(jpg)|(JPEG)|(PNG)|(JPG)')) {
				this.imagenValida[imgPosition] = false;
				this.files[imgPosition] = null;
				this.alertService.error('El tipo de imagen no es valido');
				return this.alertFile[imgPosition] = {errValid: true, message: 'El tipo de imagen no es valido'};
			}

			//peso del archivo no mayor a 3MB
			if(file.size > 3145728) {
				this.imagenValida[imgPosition] = false;
				this.files[imgPosition] = null;
				this.alertService.error('El tamaño de la imagen excede el peso permitido');
				return this.alertFile[imgPosition] = {errValid: true, message: 'El tamaño de la imagen excede el peso permitido'};
			}
			
			this.imagenValida[imgPosition] = true;
			this.files[imgPosition] = file;
			$('#img-producto-' + imgPosition).attr('src', window.URL.createObjectURL(file));
		}else{
			this.imagenValida[imgPosition] = false;
			this.files[imgPosition] = null;
			return this.alertFile[imgPosition] = {errValid: true, message: 'La imagen del producto es requerida'};			
		}
	}

	/**
	 * Funcion que actualiza la informacion de un producto
	 */
	updateProducto(FormUpdateProducto: NgForm){		
		this.loaderService.show();		
		//if flag not true clean array of colors
		if(!this.showColores) {
			this.producto.colores = [];
		}

		//if flag caracteristicas not true clean array of caracteristicas
		if(!this.showCaracteristicas) {
			this.producto.caracteristicas = [];
		}

		//Se agregan las posiciones de las imagenes a actualizar
		this.producto.updateImage = this.imagenValida;				

		this.productoService.update(this.producto, this.files)
			.then((res) => {
				this.loaderService.hide();
				if(res && res['success']) {
					this.alertService.success(res['message']);

					//Si el producto fue desactivado
					if (!this.producto.status) {
						setTimeout(() => {							
							//redireccion a lista de productos
							return this.router.navigate(['/dashboard/lista-productos']);
						}, 1000);
					}
					return true;
				}

				this.alertService.error(res['message'] || 'Error inesperado, inténtalo nuevamente.');
				return false;
			}, (err) => {
				this.loaderService.hide();
				this.alertService.error(err['message'] || 'Internal Server Error');
				return false;
			});
	}
}