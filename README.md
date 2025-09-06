<p align="center">
    <a href="https://laravel.com" target="_blank">
        <img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo">
    </a>
</p>

## Requirements

-   Docker Desktop
-   WSL (Ubuntu)
-   Node (v20.19+ or v22.12)
-   Postman (optional)

## Tech Stacks used

-   Laravel (Sail)
-   Database Connection (MYSQL)
-   React (vite, typescript, axios, zustand, tailwindcss, shadcn, zod)

## Running The Backend

1. open your terminal
2. ```git clone git@github.com:mhardaniel/laravel--user-roles--react-api.git```
3. ```cd laravel--user-roles--react-api```
4. ```cp .env.example .env```
5. ```npm run docker:composer:install```
7. ```./vendor/bin/sail up -d```
8. ```./vendor/bin/sail artisan key:generate```
9. ```./vendor/bin/sail artisan migrate --seed```
10. you can access the api routes at: http://localhost:8000

## Running The Frontend

1. open your terminal
2. ```cd laravel--user-roles--react-api/client--react--app```
3. ```npm install```
4. ```npm run dev```
5. you can access the app. at: http://localhost:5174

## API Routes

1. http://localhost:8000/api/roles - to get all roles
2. http://localhost:8000/api/users/by-role/{roleName} - to get all users by role
3. http://localhost:8000/api/users - to create user with roles

## Testing API Routes via Postman

1. open your postman app
2. import the file ``` postman_collection.json```
3. http://localhost:8000/api/users - to create user with roles

## Screenshots
<img width="2561" height="1469" alt="Image" src="https://github.com/user-attachments/assets/7f9ad1bb-a3fb-48b6-89d9-e034e5cecd3d" />
<img width="2538" height="1604" alt="Image" src="https://github.com/user-attachments/assets/81c402b7-9603-43f3-af8d-83815cede310" />


### Thank you, Regards

mhardaniel
