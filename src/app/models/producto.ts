import {Proveedor} from './proveedor';
import {CategoriaProducto} from './categoria.producto';


export class Producto {
    nombre: string;
    descripcion: string;
    precio: number;
    costoEnvio: number;
    piezasDisponibles: number;
    imagenes: Array<string>;    
    colores: Array<string>;
    modelo: string;
    status: boolean;
    proveedor: Proveedor; 
    categoria: CategoriaProducto;
    oferta: boolean;
    caracteristicas: Array<any>;
    resurtir: boolean;
    fechaExpiracion: string;
    updateImage?: Array<boolean>;
}