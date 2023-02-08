# Justice plurielle

## Stack

```txt
Base de données Google Sheets chez Droit Pluriel
                        ↓
Cron qui tourne du mardi au samedi à 1 heure du matin chez Scalingo
                        ↓
Base de données PostgreSQL (1 seule table lieu) chez Scalingo
                        ↓
                  Backend NextJs
                        ↓
                  Frontend React → API Adresse du gouvernement

----------------------------------------------------------

Repository sur GitHub (deploy lors du merge d'une branche)
                        ↓
                  PaaS : Scalingo
```

## Installation

- `yarn`
- `touch .env.local` et y mettre les variables d'environnements pour développer

## Utilisation

Vous trouverez toutes ces commandes dans le fichier package.json.

### Lancer l'application pour développer

`yarn dev`

> Cette application fonctionne avec la dernière version LTS de node.

### Lancer la construction de l'application

`yarn build`

#### Puis lancer l'application comme si vous étiez en production

`yarn start`

### Lancer les tests

`yarn test`

### Lancer les tests avec le coverage

`yarn test:coverage`

### Lancer les tests de mutation du backend

`yarn test:mutation:backend`

### Lancer les tests de mutation du frontend

`yarn test:mutation:frontend`

### Lancer la vérification du typing

`yarn typecheck`

### Lancer la vérification du code

`yarn lint:typescript`

### Lancer la vérification du CSS

`yarn lint:css`

### Lancer la vérification de l'accessibilité, de la performance et de bonnes pratiques

`yarn lighthouse`

### Lancer la vérification de code mort

`yarn deadcode`

### Lancer la vérification de dépendances mortes

`yarn depcheck`

### Se connecter au bash de Scalingo (il faut avoir installé le CLI de Scalingo au préalable)

`yarn bash:production`

### Se connecter à PostgreSQL de Scalingo (il faut avoir installé le CLI de Scalingo au préalable)

`yarn psql:production`

### Se connecter à PostgreSQL en local

`yarn psql:local`

### Mettre à jour la base de données PostgreSQL via la Google Sheets

`yarn maj_lieux`

### Créer une migration

`yarn migration:create`

### Lancer une migration

`yarn migration:up`

### Enlever une migration

`yarn migration:down`

## Variables d'environnement

Pour pouvoir travailler en local correctement, il faut créer un fichier .env.local et y mettre les variables d'environnement vide du fichier .env.

## Limitation

- Utilisation de l'[API Adresse du gouvernement](https://adresse.data.gouv.fr/api-doc/adresse) : 50 requêtes par IP et par seconde ;
- Utilisation de l'[API Google Sheets](https://console.cloud.google.com/) : 300 requêtes par minute.

### Batch

Un cron tourne à 1 heure du matin du mardi au samedi pour récupérer les données de Google Sheets pour alimenter le PostgreSQL de Scalingo.

## Sécurité

Justice Plurielle a la note de [A](https://securityheaders.com/?q=https%3A%2F%2Fjustice-plurielle.osc-fr1.scalingo.io%2F).

## Architectural Decision Records (ADR)

### Open source (14/11/22)

- Rien n'empêche le contraire
- On peut utiliser des outils gratuits d'observabilité
- C'est nul d'être fermé

### Framework : Next.js (14/11/22)

- Facile d'utilisation
- Connu par une grosse majorité des développeurs
- Beaucoup de ressource sur Internet
- Peu être déployé en statique

### Hébergeur : Scalingo (14/11/22)

- Hébergeur Français
- Facile d'utilisation
- Payement à la minute utilisée
- Architecture très simple

### Dépôt de code : GitHub (14/11/22)

- Connu de tous
- Facile d'utilisation
- CI gratuite

### Écrire le code en Français (14/11/22)

- Métier en Français
- N'a pas vocation à s'exporter à l'étranger
- Diminutation de la charge cognitive

### Construire une Progressive Web App (PWA) (14/11/22)

- Installation comme une application native
- Avoir du offline
- Avoir du cache

### Utiliser une Google Sheets pour la base de données (14/12/22)

- Facile d'utilisation et Droit Pluriel avait déjà une feuille Excel
- Gratuit
- Partageable avec n'importe qui donc open data

### Base de données PostgreSQL pour pouvoir filtrer et paginer les données de Google Sheets

- Facile d'utilisation
- Un grand nombre de développeur la connaisse
- Scalingo nous l'offre gratuitement avec leur premier plan

### Leaflet pour l'affichage des la carte (15/12/22)

- L'API de Google map étant payante, il faut une alternative gratuite : Leaflet + Open Street map
- Pourra être remplacé par Google map si besoin par la suite si Droit Pluriel obtient des réductions auprès de Google

### Leaflet au lieu de React-Leaflet (19/12/22)

- React-leaflet provoque des erreurs étranges et est mal documenté
- À part la gestion du Client Side Rendering, leaflet n'est pas très compliqué à intégrer

### Fonctionnement du mode sombre (01/23)

- Quand l'utilisateur active le mode sombre, on stocke une valeur `themeDark` dans le local storage pour conserver son choix
- Idéalement, il faudrait lire cette valeur dans le local storage avant le premier rendu de la page pour appliquer directement le bon thème. Malheureusement, React ne permet pas de lancer une fonction avant le premier rendu de la page. Dans notre cas, cela provoque un "flash" au chargement de la page, puisque le thème light est utilisé par défaut au premier rendu avant même que l'on ait lu la valeur dans le local storage
- Pour éviter ce flash, on cache le body par défaut dans global.css pour masquer le premier rendu et n'afficher la page que lorsqu'on a chargé le bon thème

### [Tarte Au Citron](https://tarteaucitron.io/) pour le bandeau de cookies (06/02/23)

- Facile à utiliser et à configurer avec Google Analytics
- Permet d'être 100% en règle avec le RGPD
- Gratuit
- Communauté assez large, donc outil assez fiable
