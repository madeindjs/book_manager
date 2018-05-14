---
title: Cours de Javascript
begin: 2018-05-14
end: 2018-05-18
---
# Javascript

Création d'un projet

## Consignes du projet

- application one page
- pas de jQuery
- pre-processeur CSS (SASS ou LESS)
- pas de framework front
- vue par système d'oglet
- utilisation du local storage

### Exemples d'applications

- application de gestion de livres
- application de block-notes amélioré avec export PDF & HTML
- stockage de vidéo Youtube
- application jeux du style "le livre dont vous êtes le héro"

### Cahier des charges

Affichage du livre

- affichages des prêts
- afichage des marques pages

Gestion des livres _(B/A)_

- un bouton pour voir un livre
- un bouton pour ajouter un livre
- un bouton pour modifier un livre
- un bouton pour supprimer un livre
- affichage du tableau

| nom                               | autheur     | editeur | publieur | date publication | qté |
|-----------------------------------|-------------|---------|----------|------------------|-----|
| Harry Potter: l'école des sorcier | JK. Rolling | ??      | ??       | 2010             | 5   |


Gestion des favoris _(A)_

- un bouton pour ajouter un favori
- un bouton pour modifier un favori
- un bouton pour supprimer un favori
- un bouton exporter en XML

Gestion des marques pages pour les livres _(B)_

- un bouton pour ajouter un marque-page
- un bouton pour modifier un marque-page
- un bouton pour supprimer un marque-page
- un bouton exporter

| Livre                             | page | date       |
|-----------------------------------|------|------------|
| Harry Potter: l'école des sorcier | 150  | 11/05/2010 |

Gestion des prêt des livres _(B)_

- un bouton pour commencer un prêt
- un bouton pour signaler un retour
- un bouton exporter en XML

| Livre                             | who  | begin_at   | end_on     |
|-----------------------------------|------|------------|------------|
| Harry Potter: l'école des sorcier | Eric | 11/05/2010 | 01/04/2011 |
| Harry Potter: l'école des sorcier | Eric | 11/05/2015 | 01/04/2016 |


Exemple export en XML

```XML
<root>
  <books>

    <book title="Mon petit poney" author="Mike Horn" current_page="205" >
      <lends>
        <lend to="Alexandre" on="2018-05-24 08:00:00"/>
        <lend to="Marc" on="2018-08-05 10:00:00"/>
      </lends>
    </book>

  </books>
</root>
```

### Charte graphique

La couleur choisie est **le violet** car cette couleur véhicule des valeurs de sérénité et de spiritualité et peut être associée à la prospérité et à la noblesse.

La font choisie est [**YoungSerif**](https://github.com/uplaod/YoungSerif) qui imite la police utilisée dans l'imprimmerie mais en plus moderne.
