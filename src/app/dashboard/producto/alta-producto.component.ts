import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

//Module for use api observable pattern and handler exception
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';

//services
import { ProveedorService } from '../../services/proveedor.service';
import { ProductoService } from '../../services/producto.service';
import { CatalogoCategoriaProductoService } from '../../services/catalogo.categoria.producto.service';
import { LoaderService } from '../../services/loader.service';
import { AlertService } from '../../services/alert.service';
import { ColorPickerService } from 'angular2-color-picker';

//models
import { Proveedor } from '../../models/proveedor';
import { Producto } from '../../models/producto';
import { CategoriaProducto } from '../../models/categoria.producto';

//datepicker
import {IMyDpOptions, IMyDateModel, IMyDate} from 'mydatepicker';

//config
import  {config} from '../../config';

declare var $:any;

@Component({
	moduleId: module.id,
	selector: 'alta-producto-cmp',
	templateUrl: 'alta-producto.component.html',
	styleUrls: ['../../../assets/css/producto.css']
})
export class AltaProductoComponent implements OnInit {

	proveedores: Array<Proveedor>;
	categorias: Array<CategoriaProducto>;
	producto: Producto;
	categoria: CategoriaProducto;
	proveedor: Proveedor;	
	//Array que almacenara las imgs files
	files: Array<File>;
	
	//Alerts para img files
	alertFile: Array<Object>;

	//Bandera que valida si la imagen es valida
	imagenValida: Array<boolean>;

	colores: Array<string>;
	showColores: boolean;
	private color:string;
	//caracteristicas dinamicas
	showCaracteristicas: boolean;
	nuevaCaracteristica: Object;
	caracteristicas: Array<Object>;


	//declaracion de datepicker
	private myDatePickerOptions: IMyDpOptions = config.myDatePickerOptions;

	//date to datepicker definition
	date = new Date();
    // Initialized to specific date with current date
    private fechaExpiracion: Object;

	constructor(private proveedorService: ProveedorService, 
				private productoService: ProductoService, 
				private catalogoCategoriaProductoService: CatalogoCategoriaProductoService,
				private alertService: AlertService,
				private loaderService: LoaderService) {
		this.producto = new Producto();
		this.proveedor = new Proveedor();
		this.categoria = new CategoriaProducto();
		
		this.files = [null, null, null, null];
		
		this.alertFile = [
			{errValid: false, message: ''},
			{errValid: false, message: ''},
			{errValid: false, message: ''},
			{errValid: false, message: ''}
		];

		this.imagenValida = [false,false,false,false];

		this.colores = [];
		this.showColores = false;
		this.color = "#fff";
		this.showCaracteristicas = false;
		this.nuevaCaracteristica = {nombre: '', valor: ''};
		this.caracteristicas = [];		
	}

	ngOnInit(){		
		this.obtenerProveedores();
		this.obtenerCatalogoCategorias();
	}

	// dateChanged callback function called when the user select the date. This is mandatory callback
    // in this option. There are also optional inputFieldChanged and calendarViewChanged callbacks.
    onFechaExpiracionChanged(event: IMyDateModel) {
        // event properties are: event.date, event.jsdate, event.formatted and event.epoc
        console.log('event: ', event);
        this.producto.fechaExpiracion = ''+ event.jsdate;
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
	 * Funcion que detecta el valor de cambio en el input file y lo agrega a la lista de files validos
	 * @param {any} fileInput cualquier valor File
	 */
	fileChangeEvent(fileInput: any, imgPosition: number){
		//reset alert object
		this.alertFile[imgPosition] = {errValid: false, message: ''};

		let file = fileInput ? fileInput.target.files[0] : null;
		if(file) {
			//validacion del tipo de archivo
			if(!file.type.match('.(jpeg)|(png)|(jpg)|(JPEG)|(PNG)|(JPG)')) {
				this.imagenValida[imgPosition] = false;
				this.alertService.error('El tipo de imagen no es valido');
				this.files[imgPosition] = null;
				return this.alertFile[imgPosition] = {errValid: true, message: 'El tipo de imagen no es valido'};
			}

			//peso del archivo no mayor a 3MB
			if(file.size > 3145728) {
				this.imagenValida[imgPosition] = false;
				this.alertService.error('El tamaño de la imagen excede el peso permitido');
				this.files[imgPosition] = null;
				return this.alertFile[imgPosition] = {errValid: true, message: 'El tamaño de la imagen excede el peso permitido'};
			}
			
			this.imagenValida[imgPosition] = true;
			this.files[imgPosition] = file;
		}else{
			this.imagenValida[imgPosition] = false;
			this.files[imgPosition] = null;
			return this.alertFile[imgPosition] = {errValid: true, message: 'La imagen del producto es requerida'};
		}
	}		

	/**
	 * Funcion que invoca al servicio de producto para crear un producto
	 */
	crear(FormCrearProducto: NgForm){
		this.loaderService.show();
		//Validacion de si existe al menos una imagen
		if (this.files) {
			let countImages = 0;
			for (let iterator = 0; iterator < this.files.length; iterator++){
				if (this.files[iterator] !== null) {
					countImages++;					
				}
			}

			//Si no se agrega almenos una imagen
			if (countImages === 0) {
				this.loaderService.hide();	
				this.alertService.error('Ingrese al menos una imagen valida para el producto');
				return false;
			}
		}

		this.producto.categoria = this.categoria;
		this.producto.proveedor = this.proveedor;
		//Si la bandera de colores esta activa
		if(this.showColores) {
			this.producto.colores = this.colores;
		}

		if(this.showCaracteristicas) {
			this.producto.caracteristicas = this.caracteristicas;
		}
		
		console.log(this.producto);
		
		this.productoService.crear(this.producto, this.files)
		.then((result) => {		
			this.loaderService.hide();	
			if(result && result['success']) {				
				//Reset de formulario y variables del modelo
				FormCrearProducto.reset();
				this.producto = new Producto();
				this.proveedor = new Proveedor();
				this.showColores = false;
				this.showCaracteristicas = false;
				this.colores = [];
				this.caracteristicas = [];

				//reset individual validations to images
				this.imagenValida = [false,false,false,false];
				
				//clean alert notifications
				this.alertFile = [
					{errValid: false, message: ''},
					{errValid: false, message: ''},
					{errValid: false, message: ''},
					{errValid: false, message: ''}
				];
				
				//clean array files
				this.files = [null, null, null, null];
				
				//clean inputs
				$("#imagen_1").val("");
				$("#imagen_2").val("");
				$("#imagen_3").val("");
				$("#imagen_4").val("");

				return this.alertService.success(result['message']);
			}

			return this.alertService.error(result['message'] || 'Error inesperado, inténtalo nuevamente.');
		}, (err)=> {			
			this.loaderService.hide();
			return this.alertService.error(err['message'] || 'Internal Server Error');
		});
	}

	/**
	 * Funcion que agrega el color del picker a la lista de colores
	 */
	addColor(){		
		this.colores.push(this.color);		
		this.color = '#fff';
	}

	/**
	 * Funcion que elimina el color de la lista de colores por medio del indice
	 * @param {Number} index indice del color a eliminar dentro del array
	 */
	deleteColor(index:any) {		
		if(index > -1) {			
			this.colores.splice(index, 1);
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
		this.caracteristicas.push({
			nombre: this.nuevaCaracteristica['nombre'],
			valores: valores
		});		

		this.nuevaCaracteristica = {nombre: '', valor: ''};
	}

	deleteCaracteristica(index: any){		
		if(index > -1) {
			this.caracteristicas.splice(index, 1);
		}
	}
}