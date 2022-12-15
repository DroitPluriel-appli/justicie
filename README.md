# Justice plurielle

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

### Lancer les tests avec mutation en mode incrémental

`yarn test:mutation`

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

### Utiliser une Google Sheet pour la base de données (14/12/22)

- Facile d'utilisation et Droit Pluriel avait déjà une feuille Excel
- Gratuit
- Partageable avec n'importe qui donc open data
