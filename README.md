	Eccomerce ADMIN APP

Panel administrativo Eccomerce

Tecnologías definidas para este proyecto:

	- Angular 2
	- HTML, CSS, JS
	- Bootstrap
	- Typescript

- Estructura de la aplicación core Ecommerce Admin
				
			Files fuera de SRC
			Conciernen a la contrucción, despliegue y pruebas para la aplicación.
		* node_modules folder --- Contiene los modulos y dependencias configurados en package.json						
		* package.json --- Archivo de configuracion de dependencias o modulos necesarios para Ecommerce ADMIN
		* README.md --- Resumen para ambientar aplicación, conceptos y estructura de la aplicación admin de Eccomerce
		* tslint.json --- File config para comprobar el código de TypeScript para los errores de legibilidad, mantenimiento y funcionalidad.

			Files dentro de src
			Archivos pertenecientes a la aplicación, agregar nuevos archivos como HTML,CSS, Fonts entre otros assets.

		Tres archivos principales de la aplicación
		* app/app.component.ts
			Este archivo define el AppComponent. Este componente es el componente raíz, el cual contendra la anidación de diferentes componentes a medida que evolucione la aplicación.
		* app/app.module.ts
			Este archivo define el modulo raíz qie indicara a Angular como iniciar la aplicación.
		* main.ts
			Este archivo compila la aplicación con el compilador JIT y ejecuta el modulo principal de la aplicación definido en el archivo app.module.ts (AppModule) para ejecutarse en el browser.


Ambiente de Desarrollo

1.- Clonar el repositorio
	
		git clone url-repositorio

2.- Instalar dependecias 
	
		npm install

3.- Ejecutar ambiente de desarrollo
	
		npm start

4.- El browser se abrirá mostrando una página.
