import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule  } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common'; //module for use ngIf, ngFor, etc ...

import { MODULE_COMPONENTS, MODULE_ROUTES } from './dashboard.routes';//load sub routes and controllers for dahsboard

//services
import { ProveedorService } from '../services/proveedor.service';
import { AuthGuardService } from '../_guards/auth.guard';
import { ProductoService } from '../services/producto.service';
import { CatalogoCategoriaProductoService } from '../services/catalogo.categoria.producto.service';
import { CatalogoEstadosService } from '../services/catalogo.estados.service';
import { LoaderService } from '../services/loader.service';

//modulo para color picker
import { ColorPickerModule } from 'angular2-color-picker';

//datepicker
import { MyDatePickerModule } from 'mydatepicker';


@NgModule({
    imports: [
    	FormsModule,
    	HttpModule,    	
    	CommonModule,
    	ColorPickerModule,
    	MyDatePickerModule,
        RouterModule.forChild(MODULE_ROUTES)
    ],
    declarations: [ MODULE_COMPONENTS ],
    providers: [ ProveedorService, AuthGuardService, ProductoService, CatalogoCategoriaProductoService, CatalogoEstadosService, LoaderService ]
})

export class DashboardModule{}