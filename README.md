# Cahier de lecture

Application de lecture pour Android, installable depuis Chrome et utilisable hors ligne.
Pour chaque livre : citations (recopiées ou photographiées), notes, sources, signet de lecture,
et une **idée maîtresse** établie par Claude. Les livres qui partagent un thème peuvent
**dialoguer** dans une synthèse croisée.

Ce dépôt ne contient que le code de l'application. Vos fiches et votre clé d'API restent
dans votre téléphone : elles ne sont jamais envoyées sur GitHub.

## Installer sur Android

1. Ouvrez l'adresse de l'application dans **Chrome** : `https://VOTRE-COMPTE.github.io/cahier-de-lecture/`
2. Touchez le menu **⋮**, puis **Installer l'application** (ou **Ajouter à l'écran d'accueil**).
3. L'icône du Cahier apparaît sur l'écran d'accueil. L'application s'ouvre en plein écran, même sans réseau.

## Reprendre vos fiches depuis Claude

1. Dans le Cahier de lecture de Claude : menu **⋯**, puis **Sauvegarder le cahier**. Un fichier `.json` est enregistré.
2. Dans l'application : menu **⋯**, puis **Importer une sauvegarde**, et choisissez ce fichier.

L'import ajoute les fiches nouvelles et remplace seulement les fiches plus anciennes que la sauvegarde. Il n'efface rien.

## Activer Claude (clé d'API)

L'idée maîtresse, la lecture des photos de pages et les thèmes croisés passent par l'API Claude.

1. Créez une clé sur la console Claude : <https://platform.claude.com/>, rubrique **API Keys**.
2. Dans l'application : menu **⋯**, **Réglages**, collez la clé, puis touchez **Enregistrer et vérifier**.
3. Choisissez le modèle : Haiku (économique), Sonnet (recommandé) ou Opus (le plus fin).

L'usage de l'API est facturé à la demande sur votre compte API, en dehors de tout abonnement Claude.

## Hors ligne

- Tout ce que vous écrivez est enregistré dans le téléphone, avec ou sans réseau.
- Une demande à Claude faite sans réseau (idée maîtresse, thème croisé, photo de page) est mise en attente.
  Elle part automatiquement au retour de la connexion.
- Une page photographiée hors ligne apparaît ensuite dans la fiche, rubrique **Pages photographiées à trier**.

## Vos données

- Les fiches sont stockées dans le navigateur du téléphone (IndexedDB). Installez l'application :
  Android protège alors ce stockage contre l'effacement automatique.
- La clé d'API reste dans le téléphone. Elle n'est envoyée qu'à `api.anthropic.com`.
- Sauvegardez régulièrement (menu **⋯**, **Sauvegarder le cahier**) : désinstaller l'application
  ou effacer les données de Chrome supprime aussi les fiches.
- Les pages publiées sous la même adresse `VOTRE-COMPTE.github.io` partagent le même espace de stockage.
  Ne publiez à cette adresse que du code en qui vous avez confiance.

## Mettre à jour l'application

1. Modifiez les fichiers du dépôt.
2. Dans `sw.js`, changez la valeur de `VERSION` (par exemple `cahier-1.0.1`).
3. Publiez la modification. Le téléphone reçoit la nouvelle version à la prochaine ouverture avec du réseau.

## Publication sur GitHub Pages

Dans le dépôt : **Settings**, **Pages**, **Build and deployment**, source **Deploy from a branch**,
branche `main`, dossier `/ (root)`. L'adresse apparaît en haut de la page au bout d'une minute ou deux.

## Fichiers

| Fichier | Rôle |
|---|---|
| `index.html` | L'application entière : interface, stockage, appels à Claude, exports Word et Markdown |
| `sw.js` | Garde l'application dans le téléphone pour l'ouvrir sans réseau |
| `manifest.webmanifest` | Nom, couleurs et icônes de l'application installée |
| `icons/` | Icônes de l'écran d'accueil |
