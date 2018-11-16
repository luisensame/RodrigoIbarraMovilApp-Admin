import { Injectable } from '@angular/core';
import { Response } from '@angular/http';

//client http to consume rest api
import { AuthHttp } from 'angular2-jwt';


//observable
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

//models
import { Proveedor } from '../models/proveedor';

//config
import { config } from '../config';


@Injectable()
export class ProveedorService {
	
	//Provisional var for path api
	private api = config.apiUrl + '/proveedor';

	constructor(private http: AuthHttp) {}

	/**
	 * Funcion que invoca ws para crear un proveedor.
	 * @param  {Proveedor}          proveedor objeto proveedor
	 * @return {Observable<Object>}           Valor de retorno de  la funcion.
	 */
	crear(_proveedor:Proveedor): Observable<Object> {
		let proveedor = {
			'proveedor': _proveedor
		};
		return this.http.post(this.api, proveedor)
					.map((res: Response) => {						
			    		return res.json();
					}).catch((error: Response | any) => {
						let errResult: Object;
						if (error instanceof Response) {
							if(error.json()['message']){
							 	errResult = {success: false, message: error.json()['message']};
							 }else{
							 	errResult = {success: false, message: 'Internal Server Error'};
							 }												
						} else {
							errResult = {success: false, message: (error.message || 'Internal Server Error')};
						}						
						return Observable.throw(errResult);
					});
	}

	findAll(): Observable<Object> {
		return this.http.get(this.api + '/all')
				.map((res: Response) => {						
			    		let result = res.json();
						if(result && result['success']) {
							return {success: true, proveedores: result['proveedores']};
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


	/**
	 * Funcion que obtiene un proveedor por id
	 * @param  {string}             id del proveedor
	 * @return {Observable<Object>}    resultado del web service
	 */
	findById(id: string): Observable<Object> {
		return this.http.get(this.api + '/id/' + id)
				.map((res: Response) => {
						let result = res.json();
						if(result && result['success']) {
							return {success: true, proveedor: result['proveedor']};
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

	update(_proveedor: Proveedor){
		let proveedor = {
			'proveedor': _proveedor
		};
		return this.http.put(this.api, proveedor)
					.map((res: Response) => {
						return res.json();
					}).catch((error: Response | any) => {
						let errResult: Object;
						if (error instanceof Response) {
							if(error.json()['message']){
							 	errResult = {success: false, message: error.json()['message']};
							 }else{
							 	errResult = {success: false, message: 'Internal Server Error'};
							 }												
						} else {
							errResult = {success: false, message: (error.message || 'Internal Server Error')};
						}						
						return Observable.throw(errResult);
					});		
	}
}