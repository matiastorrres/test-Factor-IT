# TEST-FACTOR-IT

Proyecto: e-commerce

Según el historial de compras del mes del usuario o de las fechas promocionables, hay tres tipos de carritos:

- Común: No tiene descuentos especiales, solo aplica el descuento del 25% si se compran exactamente 4 productos.
- Promocionable por Fecha Especial: Aplica un descuento fijo de $300 si se compran más de 10 productos.
- Promocionable por Usuario VIP: Aplica un descuento de $500 en el total del carrito y bonifica el producto más barato.

Funcionalidades del Carrito:

- Crear un nuevo carrito.
- Eliminar un carrito cuando el usuario lo decide o automáticamente si no se finaliza la compra.
- Agregar y eliminar productos del carrito.
- Consultar el estado del carrito para ver el total a pagar, considerando los descuentos aplicables.

Otros Requerimientos:
- Simular la fecha para gestionar promociones por fecha especial.
- Automatizar la actualización de clientes a VIP basado en sus compras mensuales.

## Datos a tener en cuenta

- Fechas especiales: Las fechas especiales se encuentran en el banner de la vista principal.
- Agregar productos al carrito: Para agregar productos al carrito, debe seleccionar algunos de los usuarios que se muestran en la vista de login.
- Vista de login: En la vista de login,también se puede ingresar al dashboard para ver la lista de usuarios VIP del mes seleccionado en el simulador de fecha, los usuarios que dejaron de ser VIP y los que pasaron a ser VIP según el mes ingresado en cada tabla.
- Persistencia de datos: Se implemento la persistencia de datos del carrito y del usuario seleccionado.
- Aplicación de lazy load
- Diseño responsive

## Requisitos Previos

Asegúrate de tener instalado lo siguiente en tu máquina:

- Node.js (versión recomendada)
- npm (o yarn, si lo prefieres)

## Instalación

1. Clona este repositorio:

   git clone <https://github.com/matiastorrres/test-Factor-IT.git>

   cd test-Factor-IT

2. Instala las dependencias del proyecto:

   npm install

   O, si prefieres usar yarn: yarn

3. Para ejecutar el proyecto en modo de desarrollo:

   npm run dev

   O con yarn: yarn dev