import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';


//components
import { AppComponent }  from './app.component';
import { LoginComponent }  from './login/login.component';
import { NotFoundComponent } from './notfound/notfound.component';
import { DashboardComponent } from './dashboard/dashboard.component';

//modules
import { DashboardModule } from './dashboard/dashboard.module';
import { SidebarModule } from './sidebar/sidebar.module';
import { NavbarModule } from './partials/navbar/navbar.module';
import { FooterModule } from './partials/footer/footer.module';
import { LoaderModule } from './partials/loader/loader.module';
import { AuthModule } from './modules/auth.module';

//services
import {AuthenticationService} from './services/authentication.service';
import { AlertService } from './services/alert.service';

//Configuracion de rutas
const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { //default route for application
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports:      [ 
  	BrowserModule,  	
    FormsModule,
  	DashboardModule,
  	SidebarModule,
  	NavbarModule,
  	FooterModule,
    LoaderModule,
    AuthModule,
  	RouterModule.forRoot(appRoutes)
  ],
  declarations: [ AppComponent, LoginComponent, NotFoundComponent, DashboardComponent ],
  providers: [ AuthenticationService, AlertService ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
