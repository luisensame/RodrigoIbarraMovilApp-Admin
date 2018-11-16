import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Observable } from 'rxjs/Observable';
import { config } from '../config';

@Injectable()
export class CatalogoCategoriaProductoService {	

	private api = config.apiUrl + '/categoria-producto';

	constructor(private http: AuthHttp){}


	getCatalogoCategoriasProducto(): Observable<Object>{
		return this.http.get(this.api)
			.map((res: Response) => {
				return res.json();
			})
			.catch((err: Response | any) => {
				let errResult: Object;
				if (err instanceof Response) {
					errResult = err.json() || {success: false, message: 'Server error'};
				} else {
					errResult = {success: false, message: (err.message || 'Server error')};
				}							
				return Observable.throw(errResult);
			});		
	}
}