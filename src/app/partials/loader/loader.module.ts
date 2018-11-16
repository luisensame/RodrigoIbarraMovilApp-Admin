import { NgModule } from '@angular/core';
import { LoaderComponent } from './loader.component';//loader component controller

@NgModule({
	imports: [], //add modules required for the loader module
	declarations: [LoaderComponent], //add components required for the loader
	exports: [LoaderComponent] //export components for use in other components into modules
})

//export class module
export class LoaderModule {}