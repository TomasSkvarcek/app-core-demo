## App Core demo

App Core demo showcases part of DDD inspired architecture for Laravel framework with React front-end.

It is a monolithic architecture where Laravel is used for back-end REST API endpoints with cookie based authentication and React is used for front-end.

### Demo includes
- authentication
- custom authorization system with roles and privileges
- CRUD for user management including table view with lots of filtering options
- CRUD for role and privilege management
- password setup/reset by email

### Installation instructions
- run command: composer install
- run command: npm install
- create .env file (use .env.example as template)
- specific important things to set in .env:
  - set APP_URL, CORS_ALLOWED_ORIGIN, and VITE_API_BASE_URL to your server url (for instance http://localhost:8000) Note: if you are not using https and not running on localhost also change SESSION_SECURE_COOKIE to false
  - create database and update database connection variables
  - set LOCALE and VITE_LOCALE for app language (viable options en, sk)
  - set MAIL connection variables (optional: required only for new user registration and password resets)
- generate your application encryption key using command: php artisan key:generate
- run command: npm run build
- run command: php artisan app:install - this creates all necessary database tables and records
- this also creates first admin user that can be used to log in with email: admin@admin.test and password: app-core
