import { Component, OnInit } from '@angular/core';
import {LocationStrategy, PlatformLocation, Location} from '@angular/common';

declare var $:any;

@Component({
  selector: 'my-app',
  moduleId: module.id,
  templateUrl: 'app.component.html'
})
export class AppComponent  {
	ngOnInit(){
        $.getScript('../assets/js/initMenu.js');
        $.getScript('../assets/js/material-dashboard.js');        
    }

    constructor(location: PlatformLocation) {

        location.onPopState(() => {
            $('.sidebar-wrapper .nav-container div').removeClass('.moving-tab');
            $.getScript('../assets/js/material-dashboard-angular.js');
            console.log('pressed back!');
        });

    }    
}
