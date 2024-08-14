PTKCRM
Prueba Técnica PTKCRM Backend
Este repositorio contiene el proyecto backend de la prueba técnica fullstack para las API.

Las peticiones en este proyecto se basan en dos entidades: usuarios, con roles de empleado y administrador, y solicitudes.

El rol de administrador puede consultar, crear y eliminar usuarios y solicitudes. Las solicitudes se asignan a un usuario con el rol de empleado y solo pueden ser creadas por los administradores.

Instalación y Ejecución
Para instalar el proyecto y ejecutarlo, sigue estos pasos:

Instalar los módulos:

bash
Copiar código
npm install
Configurar la base de datos:

La base de datos utilizada es PostgreSQL. Debes agregar las credenciales de tu base de datos y crear la tabla de usuarios. Puedes usar la siguiente consulta:

sql
Copiar código
CREATE TABLE "Users" (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    salario INTEGER NOT NULL,
    fechaIngreso DATE NOT NULL,
    rol VARCHAR,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    createdAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
Crear la tabla de solicitudes:

sql
Copiar código
CREATE TABLE "Requests" (
    id SERIAL PRIMARY KEY,
    codigo VARCHAR(50) NOT NULL,
    resumen VARCHAR(50) NOT NULL,
    descripcion VARCHAR(50) NOT NULL,
    id_empleado INTEGER NOT NULL,
    fechaSolicitud DATE NOT NULL,
    createdAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_empleado) REFERENCES "Users" (id)
);
Crear el primer administrador:

Una vez que hayas creado las tablas principales, debes crear un administrador. Recuerda que para crear el primer administrador debes desactivar temporalmente los middlewares para evitar errores de autenticación. Ejemplo del cuerpo de la solicitud para crear el administrador:

json
Copiar código
{
    "nombre": "Susana",
    "salario": 5000,
    "rol": "admin",
    "password": "12345",
    "email": "susy13@gmail.com"
}
Una vez que tengas el primer administrador, puedes iniciar la creación de usuarios y solicitudes sin comentar los middlewares.