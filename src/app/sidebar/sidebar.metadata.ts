/**
 * This file will be used in sidebar.component and config routes
 */
//Enum types for constants
export enum MenuType {
    BRAND,
    LEFT,
    RIGHT
}

//Inteface for route info
export interface RouteInfo {
    path: string;
    title: string;
    menuType: MenuType;//use enum menuType
    icon: string;
}
