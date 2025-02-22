# Aplicación de Gestión de Productos

Una aplicación web construida con Angular 17 para gestionar productos y carritos de compra.

## Requisitos Previos

- Node.js v20.17.0
- npm v10.2.0 o superior
- Angular CLI v18.0.0 o superior

## Instalación

1. Clonar el repositorio:

```bash
git clone https://github.com/tu-usuario/tu-repositorio.git
```

2. Instalar dependencias:

```bash
npm install
```

3. Iniciar servidor de desarrollo:

```bash
ng serve
```

4. La aplicación estará disponible en `http://localhost:4200`

## Características

- Listado de productos con filtrado por categorías
- Carrito de compras con gestión de cantidades
- Panel de administración de productos
- Sistema de autenticación
- Permisos basados en roles y ubicación
- Diseño responsive

## Estructura del Proyecto

```
src/
├── app/
│   ├── products/         # Módulo de productos
│   ├── services/         # Servicios compartidos
│   ├── shared/          # Componentes compartidos
│   ├── guards/          # Guards de rutas
│   └── directives/      # Directivas personalizadas
```

## Usuarios de Prueba

- Admin:

  - Usuario: yesenia@sdi.com
  - Contraseña: 123456
  - Ciudad: Logroño

  - Usuario: admin@sdi.com
  - Contraseña: admin123
  - Ciudad: Madrid

- Usuario Regular:
  - Usuario: usuario@ejemplo.com
  - Contraseña: 123456

## Tecnologías

- Angular 18
- Angular Material
- RxJS
- TypeScript
- SCSS

## Scripts Disponibles

- `ng serve`: Inicia servidor de desarrollo
- `ng build`: Construye el proyecto
- `ng test`: Ejecuta tests unitarios
- `ng lint`: Ejecuta linter

## Licencia

MIT
