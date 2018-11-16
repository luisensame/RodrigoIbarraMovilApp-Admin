import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; //module for use ngIf, ngFor, etc ...
import { RouterModule } from '@angular/router'; //module for routes of sidebar elements
import { SidebarComponent } from './sidebar.component';//main sidebar component

@NgModule({
	imports: [ RouterModule, CommonModule ],//add modules required for the sidebar module
	declarations: [ SidebarComponent ], //add components required for the sidebar module (components, pipes, directives, etc...)
	exports: [ SidebarComponent ] //export components for use in other components into modules
})

//export class module
export class SidebarModule {}