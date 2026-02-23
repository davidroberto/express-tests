- démarrer docker Desktop (ou docker sur linux)
- créer le fichier .env.local à la racine du projet (copie du .env) et remplir les variables d'environnement (avec les valeurs que vous voulez)
- démarrer le serveur : "docker compose --env-file .env.local up" à la racine du projet
- installer les dépendances en local pour l'autocomplétion : "npm install" à la racine du projet
- installer Postman et tester les services : 

- App Node.js : localhost:3000 - health check retourne OK
- Adminer : localhost:8080 - accessible (HTTP 200)

Pour te connecter à Adminer :
- Système : PostgreSQL
- Serveur : db
- Utilisateur : postgres
- Mot de passe : postgres
- Base de données : shopshop
