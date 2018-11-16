import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; //module for use ngIf, ngFor, etc ...
import { RouterModule } from '@angular/router'; //module for work with routes
import { NavbarComponent } from './navbar.component';//main navbar component(controller)

@NgModule({
	imports: [CommonModule, RouterModule], //add modules required for the sidebar module
	declarations: [NavbarComponent], //add components required for the sidebar module (components, pipes, directives, etc...)
	exports: [NavbarComponent] //export components for use in other components into modules
})

//export class module
export class NavbarModule {}