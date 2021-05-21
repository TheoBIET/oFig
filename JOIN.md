# JOIN ... ON en SQL

Avec les mots-clés JOIN ... ON, on va pouvoir en une seule requête, récupérer les données cumulées de plusieurs tables

Syntaxe : On indique après le FROM xxxx
JOIN [nom_table] ON [critère de sélection | rapprochement]

```sql
SELECT * FROM figurine JOIN review ON figurine.id=review.figurine_id;
```