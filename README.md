# 🫒 Coopérative Elghousni - Système de Gestion des Commandes

Une application React moderne pour gérer les commandes de produits de la coopérative Elghousni, spécialisée dans l'huile d'olive, les olives et autres produits du terroir marocain.

## 🌟 Fonctionnalités Principales

### 📝 Création de Commandes
- **Formulaire de commande intuitif** : Interface utilisateur moderne pour créer de nouvelles commandes
- **Informations client** : Saisie du nom et du numéro de téléphone du client
- **Validation des données** : Validation en temps réel avec messages d'erreur
- **Bouton de réinitialisation** : Possibilité de vider le formulaire à tout moment

### 🛒 Sélection de Produits
- **Catalogue de produits** : Affichage de tous les produits disponibles avec leurs détails
- **Recherche avancée** : Recherche par nom de produit ou catégorie
- **Gestion des quantités** : Sélection flexible des quantités pour chaque produit
- **Calcul automatique** : Calcul automatique des sous-totaux et du total général
- **Produits disponibles** :
  - Huile d'olive extra vierge bio (750ml, 1L)
  - Olives Beldi (naturelles, marinées)
  - Tapenade d'olives noires artisanale
  - Miel naturel de la région
  - Savon à l'huile d'olive
  - Confiture d'olives

### 📋 Gestion des Commandes
- **Liste des commandes** : Affichage de toutes les commandes avec informations essentielles
- **Tri chronologique** : Les commandes les plus récentes apparaissent en premier
- **Détails expandables** : Clic pour afficher/masquer les détails complets d'une commande
- **Informations affichées** :
  - Numéro de commande unique
  - Nom du client
  - Date de création
  - Statut actuel
  - Montant total
  - Liste détaillée des produits

### 🏷️ Gestion des Statuts
- **Trois statuts disponibles** :
  - **En attente** (🟡) : Commande nouvellement créée
  - **Préparée** (🔵) : Commande préparée, prête pour livraison
  - **Livrée** (🟢) : Commande livrée au client
- **Modification de statut** : Changement facile du statut directement depuis la fiche commande
- **Badges colorés** : Identification visuelle rapide du statut

### 🔍 Filtrage et Recherche
- **Filtrage par statut** : Affichage des commandes selon leur statut
- **Compteurs en temps réel** : Affichage du nombre de commandes par statut
- **Filtre "Toutes"** : Vue d'ensemble de toutes les commandes
- **Résultats dynamiques** : Mise à jour automatique du nombre de commandes affichées

### 🗑️ Suppression de Commandes
- **Suppression sécurisée** : Confirmation avant suppression d'une commande
- **Mise à jour immédiate** : Suppression instantanée de la liste

### 📱 Interface Responsive
- **Design mobile-first** : Interface optimisée pour tous les appareils
- **Menu burger** : Navigation mobile avec menu latéral
- **Sidebar responsive** : Barre latérale adaptative avec overlay sur mobile
- **Boutons accessibles** : Interface tactile optimisée

## 🏗️ Structure du Code

### 📁 Organisation des Fichiers
```
src/
├── components/           # Composants React réutilisables
│   ├── OrderForm.jsx    # Formulaire de création de commande
│   ├── OrderList.jsx    # Liste des commandes
│   ├── OrderCard.jsx    # Carte individuelle d'une commande
│   ├── FilterBar.jsx    # Barre de filtres par statut
│   ├── ProductSelector.jsx # Sélecteur de produits avec recherche
│   ├── OrderSummary.jsx # Résumé de commande en temps réel
│   └── StatusBadge.jsx  # Badge d'affichage du statut
├── data/
│   └── products.js      # Données des produits et statuts
├── App.jsx              # Composant principal de l'application
├── main.jsx            # Point d'entrée de l'application
├── App.css             # Styles CSS globaux
└── index.css           # Styles de base
```

### 🔧 Composants Détaillés

#### `App.jsx` - Composant Principal
- **État global** : Gestion de toutes les commandes, vue actuelle, filtres
- **Navigation** : Basculement entre formulaire et liste des commandes
- **Logique métier** :
  - `addOrder()` : Ajoute une nouvelle commande avec ID unique et timestamp
  - `updateOrderStatus()` : Met à jour le statut d'une commande
  - `deleteOrder()` : Supprime une commande
  - `filteredOrders` : Filtre les commandes selon le statut sélectionné
- **Responsive** : Gestion du menu mobile avec état `sidebarOpen`

#### `OrderForm.jsx` - Formulaire de Commande
- **État local** : Informations client, produits sélectionnés, erreurs de validation
- **Validation** : 
  - Nom client requis
  - Téléphone requis
  - Au moins un produit sélectionné
- **Fonctionnalités** :
  - `handleCustomerChange()` : Gestion des champs client avec effacement des erreurs
  - `validateForm()` : Validation complète avant soumission
  - `handleSubmit()` : Soumission avec validation et calcul du total
  - `resetForm()` : Réinitialisation complète du formulaire

#### `ProductSelector.jsx` - Sélecteur de Produits
- **Recherche** : Filtrage en temps réel par nom ou catégorie
- **Gestion des quantités** :
  - `handleQuantityChange()` : Ajout/modification/suppression de produits
  - `getSelectedQuantity()` : Récupération de la quantité sélectionnée
- **Calculs automatiques** : Sous-total par produit (quantité × prix)

#### `OrderSummary.jsx` - Résumé de Commande
- **Affichage conditionnel** : Message si aucun produit sélectionné
- **Calcul total** : Somme de tous les sous-totaux
- **Informations client** : Affichage des données saisies
- **Liste produits** : Détail de chaque produit avec quantités et prix

#### `OrderList.jsx` - Liste des Commandes
- **Tri** : Affichage des commandes les plus récentes en premier
- **État vide** : Message informatif si aucune commande
- **Délégation** : Transmission des événements aux `OrderCard`

#### `OrderCard.jsx` - Carte de Commande
- **Affichage expandable** : Détails masqués/affichés selon l'état `showDetails`
- **Actions** :
  - `handleStatusChange()` : Changement de statut avec état de chargement
  - `handleDelete()` : Suppression avec confirmation utilisateur
- **Interface** : Boutons colorés pour chaque statut, bouton de suppression

#### `FilterBar.jsx` - Barre de Filtres
- **Filtres dynamiques** : Boutons générés depuis les statuts disponibles
- **Compteurs** : Affichage du nombre total et filtré
- **Styles conditionnels** : Couleurs selon le statut sélectionné

#### `StatusBadge.jsx` - Badge de Statut
- **Configuration dynamique** : Couleur et libellé selon le statut
- **Sécurité** : Gestion des statuts inconnus

### 📊 Données

#### `products.js` - Catalogue et Configuration
- **Produits** : 8 produits avec ID, nom, prix, catégorie, description
- **Statuts** : Configuration des 3 statuts avec valeurs, libellés et couleurs
- **Structure produit** :
  ```javascript
  {
    id: 1,
    name: "Huile d'olive extra vierge bio 750ml",
    price: 120,
    category: "Huile d'olive",
    description: "Description détaillée"
  }
  ```

## 🚀 Installation et Utilisation

### Prérequis
- Node.js 16+ 
- npm ou yarn

### Installation
```bash
# Cloner le projet
git clone [URL_DU_REPO]
cd elghousni-order-management

# Installer les dépendances
npm install
```

### Développement
```bash
# Démarrer le serveur de développement
npm run dev
```

### Production
```bash
# Construire pour la production
npm run build

# Prévisualiser la build
npm run preview
```

### Qualité du Code
```bash
# Vérifier le code avec ESLint
npm run lint
```

## 🛠️ Technologies Utilisées

- **React 19.1.1** : Framework JavaScript moderne
- **Vite 7.1.7** : Outil de build rapide
- **ESLint** : Linting et qualité du code
- **CSS3** : Styles avec Flexbox/Grid pour le responsive
- **JavaScript ES6+** : Syntaxe moderne

## 🎨 Fonctionnalités UX/UI

- **Design cohérent** : Interface uniforme avec système de couleurs
- **Feedback utilisateur** : Messages d'erreur, confirmations, états de chargement
- **Accessibilité** : Labels, navigation clavier, contrastes appropriés
- **Performance** : Composants optimisés, re-renders minimisés
- **Internationalisation** : Interface entièrement en français

## 📈 Évolutions Possibles

- Persistance des données (localStorage/base de données)
- Export des commandes (PDF, Excel)
- Gestion des clients récurrents
- Statistiques et rapports
- Notifications en temps réel
- Multi-utilisateurs avec authentification
- Gestion des stocks
- Intégration paiement

---

*Développé pour la Coopérative Elghousni - Système de gestion moderne et efficace pour les commandes de produits du terroir marocain.*
