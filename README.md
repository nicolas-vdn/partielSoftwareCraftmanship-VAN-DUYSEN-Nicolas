## 1. Corrigez ce code écrit par le stagiaire de votre équipe qui n’est pas encore familier avec le métier

```./CODE/OrderSystem.java```

## 2 Qu'est-ce que du code propre ?
Un code propre, c'est un code lisible et compréhensible par n'importe quel autre développeur, qui exprime clairement son intention, ne comporte pas d'erreur et est correctement testé.

##  3. De votre expérience de l’agilité en entreprise, en vous basant sur les piliers du manifeste vu en cours. Que pourriez vous améliorer dans la gestion de vos projets ?
J'estime que le double cycle TDD (création d'un test qui casse, développement de la solution puis boucle d'amélioration) est un point crucial d'amélioration sur la gestion des projets et du développement des features.
J'ai créé de multiples projets en omettant constamment cette partie importante du processus et me suis retrouvé bien trop de fois dans une situation où plus rien ne fonctionnait, impossible de savoir pourquoi et comment réparer ce problème.

## 4. Aie aie aie, l’équipe a reçu un nouveau ticket métier pour notre gestion des achats durant vos congés, évidemment, ils ont dû chiffrer tout ça et réduire le temps initialement demandé. Vous rentrez donc de congés et voyez un ticket :
 En tant que client je veux:
 1. Vérifier la disponibilité des articles en stock.
 2. Enregistrer la commande dans la base de données.
 3. Envoyer un e-mail de confirmation au client.
 4. Mettre à jour l’inventaire en fonction des articles commandés. 
 5. Appliquer une remise pour les clients fidèles.
   
Voici le code produit par votre équipe, tout beau et bien commenté 

Faites-en la code review, avec une proposition de code alternative

```java
 public class OrderProcessor {
    private Database database;
    private EmailService emailService;
    private InventorySystem inventorySystem;
    public OrderProcessor() {
        this.database = new Database();
        this.emailService = new EmailService();
        this.inventorySystem = new InventorySystem();
    }
    public void processOrder(Order order) {
        // Vérifier la disponibilité des articles en stock
        List<Item> items = order.getItems();
        for (Item item : items) {
            if (!inventorySystem.isItemAvailable(item)) {
                throw new RuntimeException("Item not available in inventory");
            }
        }
        // Enregistrer la commande dans la base de données
        database.saveOrder(order);
        // Envoyer un e-mail de confirmation au client
        String message = "Your order has been received and is being processed.";
        emailService.sendEmail(order.getCustomerEmail(), "Order Confirmation", message);
        // Mettre à jour l'inventaire
        for (Item item : items) {
            inventorySystem.updateInventory(item, item.getQuantity() * -1);
        }
        // Appliquer une remise pour les clients fidèles
        if (order instanceof LoyalCustomerOrder) {
            LoyalCustomerOrder loyalCustomerOrder = (LoyalCustomerOrder) order;
            loyalCustomerOrder.applyDiscount();
        }
    }
 }
 public class LoyalCustomerOrder extends Order {
    @Override
    public void applyDiscount() {
        // Appliquer une remise de 10%
        setTotalPrice(getTotalPrice() * 0.9);
    }
 }
 ```

 - Commentaires dans le code => Mauvaise idée. Si le code vient à évoluer, les commentaires seront instantanément obsolètes. Solution : Supprimer les commentaires et rendre le code plus clair et explicit.

 - Définir les string dans des variables puis en définir d'autres directement dans les fonctions => Mauvaise pratique, violation d'une loi dont je n'ai plus le nom mais qui stipule que les déclarations de variables, fonctions et méthodes doivent être au même niveau. Solution : Adapter le code à cette bonne pratique

 - Tout dans une même fonction (à part applyDiscount qui vient d'une autre classe) => Mauvaise pratique. Complexifie la lisibilité du code ainsi que sa maintenance. Solution : Diviser le code en le plus de fonctions différentes pour améliorer les deux points critiques exprimés précédemment.

 - Rajouter des tests pour s'assurer du bon fonctionnement du métier.

 - Arrêter d'utiliser Java (parce que Typescript c'est mieux).

 Voici la proposition d'amélioration du code, tout beau et pas commenté :

```./CODE/OrderProcessor.java```

## 5. Place au kata ! Votre dernier (dans le langage de votre choix)

Vous êtes un survivant dans un monde post-apocalyptique rempli de zombies.
Vous devez explorer une zone pour trouver des ressources telles que de la nourriture, de l’eau et des armes, tout en évitant les zombies.
Vous avez une carte de la zone qui vous indique l’emplacement des ressources et des zombies.
Vous pouvez vous déplacer vers le nord, le sud, l’est et l’ouest, mais vous devez faire attention à ne pas vous retrouver piégé ou entouré de zombies.
Points d’attentions :
Je ne m’attends pas à une interface graphique ou quoi que ce soit. Ni même d’implémentation d’appel http
via rest controller. Vous n’avez à implémenter (et tester) que le DOMAINE (voir image ci dessous), c’est à
dire que seule la logique métier m’intéresse

 Les règles:
 1. Créer une classe Survivant qui a une position (x, y) sur la carte, une orientation (nord, sud, est,
 ouest), et un niveau de santé.
 2. Créer une classe Carte qui représente la zone que vous devez explorer. La carte est une grille de
 taille fixe (par exemple, 10x10, naviguer hors de cette zone est fatal pour le Survivant).
 3. Créer une classe Ressource qui représente les différents types de ressources que vous pouvez
 trouver sur la carte, comme de la nourriture, de l’eau et des armes.
 4. Créer une classe Zombie qui a une position (x, y) sur la carte et qui se déplace aléatoirement. Si le
 survivant entre en collision avec un zombie, il perd de la santé.
 5. Implémenter une méthode explorer() qui permet de se déplacer sur la carte en fonction des
 commandes entrées par l’utilisateur (par exemple, “avancer”, “tourner à gauche”, “tourner à droite”).
 (Je ne m’attends pas à une console interactive via shell non plus, juste une méthode qui prend les bons
 paramètres)
 6. Implémenter une méthode rencontrerZombie() qui permet de gérer les rencontres avec les
 zombies et de réduire la santé du survivant en fonction du nombre de zombies rencontrés.

 Veillez à respecter les principes SOLID et aidez vous des tests pour approcher le problème.
 N’oubliez pas, on test les fonctionnalités, pas l’implémentation du code. Tester que ma liste de ressource
 ajoute un objet car j’appelle add() ne nous apprend pas grand chose si ce n’est que le langage fait son
 travail. Par contre, tester que quand le survivant marche sur un objet, on le trouve dans son inventaire, là ça
 m’interèsse