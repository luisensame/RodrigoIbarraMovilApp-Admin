import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
//client http to consume rest api
import { AuthHttp } from 'angular2-jwt';

//config
import { config } from '../config';

//producto model
import { Producto } from '../models/producto';

@Injectable()
export class ProductoService {	
	
	//Provisional var for path api
	private api = config.apiUrl + '/producto';
	private emptyFile:File = new File([""], "no-file");

	constructor(private http: AuthHttp){}

	/**
	 * Funcion que crea un producto
	 * @param {Producto}    producto objecto
	 * @param {Array<File>} files    collección de imagenes
	 */
	crear(producto: Producto, files: Array<File>) {
		return new Promise((resolve, reject) => {
			let formData = new FormData();
			let xhr = new XMLHttpRequest();
			for (let i in files) {
				if(files[i] == null){
					console.log("image no agregada")
				}else{
					formData.append('files[]', files[i], files[i].name);
				}
			}

			formData.append('producto', JSON.stringify(producto));
			xhr.onreadystatechange = function (){
				if(xhr.readyState == 4) {					
					if(xhr.status === 200) {
						resolve(JSON.parse(xhr.response));
					}else if(xhr.status === 500){
						reject(JSON.parse(xhr.response));
					}else{
						reject({success: false, message: 'Internal Server Error'});
					}											
				}
			};

			xhr.open('POST', this.api, true);
			xhr.setRequestHeader('x-access-token', localStorage.getItem('rich-koua'));
			xhr.send(formData);
		});
	}

	/**
	 * Funcion que obtiene todos los productos
	 * @return {Observable<Object>} json result
	 */
	getAllProducts(): Observable<Object> {
		
		return this.http.get(this.api)
			.map((res: Response) => {
				let result = res.json();				
				if(result && result['success']) {
					console.log("productos "+result['productos'])
					return {success: true, productos: result['productos']};
				}				
				return {success: false, message: result['message'] || 'Internal Server Error'};
			})
			.catch((error: Response | any) => {
				let errResult: Object;
				if (error instanceof Response) {
					 if(error.json()['message']){
					 	errResult = {success: false, message: error.json()['message']};
					 }else{
					 	errResult = {success: false, message: 'Internal Server error'};
					 }					
				} else {
					errResult = {success: false, message: (error.message || 'Internal Server error')};
				}						
				return Observable.throw(errResult);
			});				
	}

	findById(id: string){
		return this.http.get(this.api + '/' + id)
				.map((res: Response) => {
						let result = res.json();						
						if(result && result['success']) {
							return {success: true, producto: result['producto']};
						}				
						return {success: false, message: result['message'] || 'Internal Server Error'};
					}).catch((error: Response | any) => {
						let errResult: Object;
						if (error instanceof Response) {
							 if(error.json()['message']){
							 	errResult = {success: false, message: error.json()['message']};
							 }else{
							 	errResult = {success: false, message: 'Internal Server error'};
							 }					
						} else {
							errResult = {success: false, message: (error.message || 'Internal Server error')};
						}						
						return Observable.throw(errResult);
					});
	}

	update(producto: Producto, files: Array<File>){
		return new Promise((resolve, reject) => {
			let formData = new FormData();
			let xhr = new XMLHttpRequest();
			for (let i in files) {				
				//Si file null
				if (!files[i]) {
					//Se agrega archivo vacio en la posicion del array para respetar posiciones back
					files[i] = this.emptyFile;
				}				
				formData.append('files[]', files[i], files[i].name);
			}

			formData.append('producto', JSON.stringify(producto));
			xhr.onreadystatechange = function (){
				if(xhr.readyState == 4) {
					if(xhr.status === 200) {
						resolve(JSON.parse(xhr.response));
					}else if(xhr.status === 500){
						reject(JSON.parse(xhr.response));
					}else{
						reject({success: false, message: 'Internal Server Error'});
					}											
				}
			};

			xhr.open('PUT', this.api, true);
			xhr.setRequestHeader('x-access-token', localStorage.getItem('rich-koua'));
			xhr.send(formData);
		});
	}
}