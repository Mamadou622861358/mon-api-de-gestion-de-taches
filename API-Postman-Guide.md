# Guide d'utilisation de l'API NodeF avec Postman

## 1. Importer la collection Postman

1. Ouvrez Postman.
2. Cliquez sur "Importer" (en haut à gauche).
3. Sélectionnez le fichier `NodeF-API.postman_collection.json` situé dans le dossier `NodeF`.
4. La collection "NodeF API" apparaîtra dans votre espace de travail Postman.

## 2. Définir l'URL de base

- Par défaut, la variable `base_url` est définie sur `http://localhost:5000`.
- Si votre serveur tourne sur un autre port ou une autre adresse, modifiez la variable dans la collection Postman.

---

## 3. Tester les routes

### Authentification

#### 1. Inscription (Register)
- **Méthode** : POST
- **URL** : `/api/v1/auth/register`
- **Body (JSON)** :
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### 2. Connexion (Login)
- **Méthode** : POST
- **URL** : `/api/v1/auth/login`
- **Body (JSON)** :
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

---

### Utilisateurs

#### 1. Récupérer tous les utilisateurs
- **Méthode** : GET
- **URL** : `/api/v1/users`

#### 2. Récupérer un utilisateur par ID
- **Méthode** : GET
- **URL** : `/api/v1/users/:id`
- Remplacez `:id` par l'identifiant réel de l'utilisateur.

#### 3. Modifier un utilisateur
- **Méthode** : PUT
- **URL** : `/api/v1/users/:id`
- **Body (JSON)** :
```json
{
  "name": "Jane Doe"
}
```

#### 4. Supprimer un utilisateur
- **Méthode** : DELETE
- **URL** : `/api/v1/users/:id`

---

### Tâches

#### 1. Récupérer toutes les tâches
- **Méthode** : GET
- **URL** : `/api/v1/tasks`

#### 2. Récupérer une tâche par ID
- **Méthode** : GET
- **URL** : `/api/v1/tasks/:id`
- Remplacez `:id` par l'identifiant réel de la tâche.

#### 3. Créer une tâche
- **Méthode** : POST
- **URL** : `/api/v1/tasks`
- **Body (JSON)** :
```json
{
  "title": "Nouvelle tâche",
  "description": "Description de la tâche",
  "status": "pending"
}
```

#### 4. Modifier une tâche
- **Méthode** : PUT
- **URL** : `/api/v1/tasks/:id`
- **Body (JSON)** :
```json
{
  "title": "Tâche modifiée",
  "status": "completed"
}
```

#### 5. Supprimer une tâche
- **Méthode** : DELETE
- **URL** : `/api/v1/tasks/:id`

---

## 4. Conseils
- Pour les routes protégées, ajoutez le header `Authorization` avec le token JWT obtenu lors de la connexion.
- Modifiez les exemples de données selon vos besoins pour tester différents cas.

---

N'hésitez pas à me demander si vous souhaitez des exemples de réponses ou des cas d'erreur spécifiques !
