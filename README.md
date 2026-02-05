## QuioscoFast
Pasos para la instalación: 

Antes de empezar, asegúrate de tener instalado:

- PHP >= 8.x  
- Composer  
- MySQL / PostgreSQL  
- XAMPP, Laragon o WAMP  


### 1. Clonar el proyecto

```bash
$ git clone https://github.com/Perseo-2025/quiosco-fullstack.git
```

### 2. Entrar al proyecto
cd repositorio

### 3. Crear el archivo .env y generar la api key
```bash
$ php artisan key:generate
```

### 4. Configurar BD en .env antes de continuar
COLOCAR LAS CREDENCIALES 
```bash
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=devjobs
DB_USERNAME=root
DB_PASSWORD=
```
CONFIGURACIÓN PARA EL EMAIL
En este caso se puede utilizar gmail o cualquier gestor de email
-> mailtrap.io
```bash
MAIL_MAILER=smtp
MAIL_HOST=sandbox.smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USERNAME=
MAIL_PASSWORD=
MAIL_ENCRYPTION=null
MAIL_FROM_ADDRESS="hello@example.com"
MAIL_FROM_NAME="${APP_NAME}"
```

En un gestor de base de datos preferida (Mysql) crear la base de datos
-> 🛢 quiosco
```bash
$ php artisan migrate
$ php artisan db:seed
```

### 6. Levantar servidor
En distintas terminal ejecutar el comando:

Ejecuta el frotend
```bash
$ pnpm i
$ pnpm run dev
```

```bash
$ php artisan serve
```

