import { MenuType, RouteInfo } from './sidebar.metadata';

//create and export constant object with interface RouteInfo and Enum MenuType 
export const ROUTES: RouteInfo[] = [
    { path: '', title: 'Dashboard', menuType: MenuType.LEFT, icon: 'material-icons' },
    { path: 'lista-productos', title: 'Lista de productos', menuType: MenuType.LEFT, icon:'material-icons' },
    { path: 'alta-producto', title: 'Alta producto', menuType: MenuType.LEFT, icon:'material-icons' },
    { path: 'lista-proveedores', title: 'Lista de proveedores', menuType: MenuType.LEFT, icon:'material-icons' },
    { path: 'alta-proveedor', title: 'Alta proveedor', menuType: MenuType.LEFT, icon:'material-icons' }
];
