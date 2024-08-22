class Exercise {
    constructor(exerciseInfos, conteneur, app) {
        // Extraction des informations de l'exercice
        const { id, duree, type, description, date, difficulte } = exerciseInfos;
        // Conteneur pour afficher l'exercice
        this.conteneur = conteneur;
        // Instance de l'application
        this.app = app;

        // Propriétés de l'exercice
        this.id = id;
        this.duree = duree;
        this.type = type;
        this.description = description;
        this.date = date;
        this.difficulte = difficulte;

        // Sélection du template HTML pour les exercices et la section des détails
        this.template = document.querySelector('#exercice-template');
        this.sectionDetails = this.app.sectionDetails;

        // Sélection du bouton de suppression
        this.deleteButton = this.sectionDetails.querySelector('button.danger');

        // La méthode pour injecter le HTML de l'exercice
        this.injecterHTML();
    }

    // Méthode pour cloner le template
    injecterHTML() {
        // template pour créer un nouvel élément d'exercice
        const exerciseElement = this.template.content.cloneNode(true);
        // Mise à jour du contenu de l'élément
        exerciseElement.querySelector('[data-exercice-date]').textContent = this.date;
        exerciseElement.querySelector('[data-exercice-type]').textContent = this.type;

        // Configuration du lien avec l'ID de l'exercice
        const detailLink = exerciseElement.querySelector('a.btn');
        detailLink.href = `#detail/${this.id}`;

        // gérer le clic
        detailLink.addEventListener('click', (event) => {
            // Empêche le comportement par défaut du lien
            event.preventDefault();
            // Appelle la méthode pour gérer le clic
            this.handleClick();
        });

       // Ajout de l'élément d'exercice au conteneur
        this.conteneur.appendChild(exerciseElement);
    }

    // Méthode pour gérer le clic sur le lien de détails
    handleClick() {
        // Affiche la section des détails et met à jour les informations de l'exercice
        this.app.displayDetailSection();
    
         // Stocke l'ID de l'exercice dans la variable --> "exerciseId"
        const exerciseId = this.id;
    
        // Définit l'ID du bouton de suppression avec l'ID de l'exercice
        if (this.deleteButton) {
            this.deleteButton.id = `${exerciseId}`;
        } else {
            console.error('Le bouton de suppression n\'est pas défini');
        }
    
        // Ajoute un écouteur d'événements au bouton de suppression pour gérer le clic
        if (this.deleteButton) {
            this.deleteButton.addEventListener('click', () => {
                this.deleteOneExercise(exerciseId);
            });
        }
    
        // Met à jour la section des détails avec les informations de l'exercice actuel
        const detailsSection = this.sectionDetails;
        detailsSection.querySelector('[data-type]').textContent = this.type || 'N/A';
        detailsSection.querySelector('[data-duree]').textContent = this.duree || 'N/A';
        detailsSection.querySelector('[data-date]').textContent = this.date || 'N/A';
        detailsSection.querySelector('[data-description]').textContent = this.description || 'N/A';
        detailsSection.querySelector('[data-difficulte]').textContent = this.difficulte || 'N/A';
    }
    
    // Méthode pour supprimer un exercice en fonction de son ID
    async deleteOneExercise(id) {
        try {
            console.log(`Deleting exercise with ID: ${id}`);
            //appelle la méthode deleteOneExercise de l'application
            await this.app.deleteOneExercise(id);
            this.app.showSuccessToast("L'exercice a été supprimé avec succès");
        } catch (error) {
            this.app.showErrorToast("Échec de la suppression de l'exercice");
        }
    }
    
}

export default Exercise;
