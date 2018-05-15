![](http://jpsierens.com/wp-content/uploads/2016/06/react-eco-wp.gif)



# Quiniela Widget 2018

Este es un proyecto echo en React para llevar el control de los partidos y predicciones del mundial. Abajo se adjuntan las instrucciones para su instalación y modificación junto a la estructura y detalles para su correcto uso.

![
](https://preview.ibb.co/jvEW5d/Screen_Shot_2018_05_14_at_2_25_27_AM.png)


## Archivos

 1. **SQL:** Contiene el .sql (MySQL) dump para inicializar el proyecto.
 2. **[API](https://github.com/misterpoloy/quiniela-prensa-api):** Rest API (Lumen Laravel) para manejar la información.
 3. **[React Widget](https://github.com/misterpoloy/quiniela-widget):** Contiene el código fuente de react para el widget.
 4.  **[React Admin:](https://github.com/misterpoloy/quiniela-admin)** Contiene el código para el administrador.


# API
El API es la encargada de la comunicación entre las aplicaciones en React con la base de datos para guardar información del proyecto.

*Los variables que se necesiten modificar se hace desde **.env***

Primero, hay que instalar y correr la base de datos MySQL

Luego, Instalar las dependencias en la carpeta del proyecto:

    composer install

correr comando:
(www.quiniela.com:8080) representa el host y puerto donde se va a correr:

    php -S www.quiniela.com:8080 -t public



# React widget y react Admin
## Editar y modificar versión de desarollo
*Atención:  Las variables que se necesiten modificar se hace desde **/constants***

Para correr el proyecto primero es necesario instalar las dependencias:

    npm install

Luego para correro es necesario entrar en la carpeta del proyecto y correr:

    npm start


## Compilar para producción

*Atención: esto es necesario hacer cada vez que se modifique el proyecto*

Esto construirá la aplicación en el directorio "dist" en la raíz del proyecto. Contiene el index.html junto con los activos minificados, listo para producción.

Para mas información sobre como correr la versión de producción puede ingresar a la documentación oficial de [Facebook](https://github.com/facebook/create-react-app)
Esto genera las versiones ejecutables para producción.

Para crear una versión de producción con las archivos:

    npm run build

![enter image description here](https://camo.githubusercontent.com/2e8b474ed6893c4e8055051c497762cf41c278f3/687474703a2f2f692e696d6775722e636f6d2f755567324133532e706e67)

## Recursos:

Para futuras modificaciones si quieren entender mas a fondo como es que funciona el proyecto se puede consultar en:

-   [configuring webpack](http://jpsierens.com/tutorial-react-redux-webpack/)
-   [understanding the app, part 1 (index.js, store, reducers)](http://jpsierens.com/simple-react-redux-application/)
-   [understanding the app, part 2 ( Root.js, router and the rest of the app)](http://jpsierens.com/simple-react-redux-application-2/)
