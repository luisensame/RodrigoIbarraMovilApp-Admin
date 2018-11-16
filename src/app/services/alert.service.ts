import { Injectable } from '@angular/core';

//declare var for set any values
declare var $:any;

@Injectable()
export class AlertService {	

	info(message: string){
		this.notify('info', 'success', message);
	}

	success(message: string){
		this.notify('check_circle', 'success', message);
	}

	warning(message: string){
		this.notify('warning', 'warning', message);
	}

	error(message: string){
		this.notify('report', 'danger', message);
	}	

	notify(icon:string, type: string, message: string){
		$.notify({
    		icon: icon,
    		message: message
	    },{
	        type: type,
	        timer: 4000,
	        delay: 4000,
	        placement: {
	            from: 'top',
	            align: 'center'
	        }
	    });
	}
}