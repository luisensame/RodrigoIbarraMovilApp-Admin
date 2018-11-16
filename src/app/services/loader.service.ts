import { Injectable } from '@angular/core';

declare var $:any;

@Injectable()
export class LoaderService {	
	constructor() {}

	show(){
		$('.wrap-loader').css('display', 'block');
		console.log('show');
		return true;
	}

	hide(){
		$('.wrap-loader').css('display', 'none');
		console.log('hide');
		return true;
	}
}