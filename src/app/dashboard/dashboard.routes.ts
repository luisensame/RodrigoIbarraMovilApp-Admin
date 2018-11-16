import { Routes } from '@angular/router';

//components
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './home/home.component';
import { AltaProductoComponent } from './producto/alta-producto.component';
import { AltaProveedorComponent } from './proveedor/alta-proveedor.component';
import { ListProductoComponent } from './producto/list-producto.component';
import { ListProveedoresComponent } from './proveedor/list-proveedores.component';
import { DetailProveedorComponent } from './proveedor/detail-proveedor.component';
import { DetailProductoComponent } from './producto/detail-producto.component';

//service guard
import { AuthGuardService } from '../_guards/auth.guard';


export const MODULE_ROUTES: Routes =[	
    { 
    	path: 'dashboard', component: DashboardComponent,
    	canActivate: [ AuthGuardService ],
    	children: [
            { path: 'lista-productos', component: ListProductoComponent },
            { path: 'alta-producto', component: AltaProductoComponent },
		    { path: 'lista-proveedores', component: ListProveedoresComponent },
		    { path: 'alta-proveedor', component: AltaProveedorComponent },
            { path: 'detail-proveedor/:id', component: DetailProveedorComponent },
            { path: 'detail-producto/:id', component: DetailProductoComponent },
		    { path: '', component: HomeComponent}
    	]
    },
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
]

export const MODULE_COMPONENTS = [
    HomeComponent,
    AltaProductoComponent,
    AltaProveedorComponent,
    ListProductoComponent,
    ListProveedoresComponent,
    DetailProveedorComponent,
    DetailProductoComponent
]