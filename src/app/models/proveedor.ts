import { Representante } from './representante';
import { Estado } from './estado';

export class Proveedor{	
	public _id: string;
	public nombreEmpresa: string;
	public email: string;
	public telefono: string;
	public direccion: string;
	public estado: Estado;
	public codigoPostal: string;
	public representante: Representante;
}