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

- gestion des livres _(B/A)_

| nom                               | autheur     | editeur | publieur | date publication |
|-----------------------------------|-------------|---------|----------|------------------|
| Harry Potter: l'école des sorcier | JK. Rolling | ??      | ??       | 2010             |

- gestion des favoris _(A)_
- gestion des marques pages pour les livres _(B)_

| Livre                             | page | date       |
|-----------------------------------|------|------------|
| Harry Potter: l'école des sorcier | 150  | 11/05/2010 |

- gestion des prêt des livres _(B)_

| Livre                             | who  | begin_at   | end_on     |
|-----------------------------------|------|------------|------------|
| Harry Potter: l'école des sorcier | Eric | 11/05/2010 | 01/04/2011 |

- export des données en XML, JSON et CSV _(A)_

Exemple XML

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

### Tableaux

#### liste des livres
