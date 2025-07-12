# Monde De Dev

Bienvenue dans Monde De Dev ! Un réseau social informatif pour développeurs où vous pouvez vous inscrire, vous abonner à des thèmes donnés. Publier et consulter des articles selon les thèmes dont vous vous êtes abonnés. Ainsi que poster des commentaires aux articles !

## Front

Ce projet a été généré en [Angular CLI](https://github.com/angular/angular-cli) version 14.1.3.

Installez les nodes_modules à l'aide de la commande (`npm install`).

Lancez `npm run start` afin de démarrer le frontend. Puis, allez sur `http://localhost:4200/`.

## Base de données

L'outil de bases de données utilisé ici est [PostgreSQL](https://www.postgresql.org/download/).
Une fois téléchargé est installé, le serveur PostgreSQL [version] est présent par défaut avec une base de données et un utilisateur nommés "postgres". Vous pouvez utiliser celle-ci ou en créér une autre. Soit en faisant clic droit sur `PostgreSQL [version] -> Create -> Database` soit en executant dans l'outil de requêtes :
```
CREATE DATABASE [NOM_BASE_DE_DONNEES]
    WITH
    OWNER = [NOM_D'UTILISATEUR]
    ENCODING = 'UTF8'
    LOCALE_PROVIDER = 'libc'
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;
```
Note : Ceci est la requête lancé en faisant l'autre manière de créer la base de données PostgreSQL.

## Back

### Liaison à la base de données

Allez dans back/src/main/resources et créez le fichier `env.properties` dont vous insérez les trois lignes suivantes :

```
DB_USER=[YOUR DATABASE USERNAME]
DB_PASSWORD=[YOUR DATABASE PASSWORD]
DB_DATABASE_NAME=[YOUR DATABASE NAME]
```

### Démarrer le serveur backend

Installez les dépendances avec `mvn clean install` puis démarrez le backend avec `mvn spring-boot:run`

Une fois que vous avez démarré le serveur. Toutes les tables et les colonnes de votre base de données seront générés.

Vous pouvez populer la liste des thèmes en exécutant le script SQL inclut dans `resources/sql/topics.sql`
