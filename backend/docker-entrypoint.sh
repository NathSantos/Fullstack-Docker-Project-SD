#!/bin/sh

echo "Esperando o MongoDB iniciar..."
./wait-for db-cidades:27017 
./wait-for db-paises:27018 


echo "Iniciando o servidor..."
npm start 