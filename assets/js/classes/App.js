import Exercise from "./Exercise.js";
import FormExercise from "./FormExercise.js";
import Router from "./Router.js";
import ToastModale from "../components/ToastModale.js";

class App {
    //stocker la liste des exercices
    #exercises;

    constructor() {
       

        // Section Liste
        this.sectionList = document.querySelector("[data-panneau='liste']");
        // Section Détails
        this.sectionDetails = document.querySelector("[data-panneau='detail']");
        // Section Formulaire
        this.sectionForm = document.querySelector("[data-panneau='formulaire']");

        // Extraire tous les exercices
        this.extractAllTheExercises();
        
        // Cacher les sections
        this.hideTheSections();
        // Initialiser la classe Router
        this.router = new Router(this);
         
    
         // Template pour afficher la liste des exercices
        this.template = document.querySelector('#exercice-template');
   
        // Conteneur pour afficher la liste des exercices
        this.container = this.sectionList.querySelector('[data-liste-exercices]');

         // Sélectionner la navigation pour gérer l'affichage des sections
        this.nav = document.querySelector('nav');
        this.btnListDisplay = this.nav.querySelector('#displayList');
        this.btnReturn = this.sectionDetails.querySelector('#return-btn');
        this.btnFormDisplay = this.nav.querySelector('#displayForm');

        // Ajouter des écouteurs d'événements sur les clics
        // Afficher la section Liste
        this.btnListDisplay.addEventListener('click', this.displayListSection.bind(this));
        this.btnReturn.addEventListener('click', this.displayListSection.bind(this));
        // Afficher la section Formulaire
        this.btnFormDisplay.addEventListener('click', this.displayFormSection.bind(this));     

        // Initialiser la classe FormExercise
        this.formExercise = new FormExercise(this);

        

    }


    // Afficher un message toast de réussite
    showSuccessToast(message) {
        new ToastModale(message, "success");
    }

    // Afficher un message d'erreur toast
    showErrorToast(message) {
        new ToastModale(message, "error");
    }

    // Méthode pour extraire tous les exercices depuis le backend
    async extractAllTheExercises() {
        try {
            const response = await fetch("http://localhost:80/backend/exercises/readAll.php");
            const exercises = await response.json();
            this.#exercises = exercises;

            // Vider le conteneur avant d'afficher de nouveaux exercices
            this.container.innerHTML = '';

            // Traiter chaque exercice en utilisant la classe Exercise
            exercises.forEach((exercise) => {
                new Exercise(exercise, this.container, this);
            });
        } catch (error) {
            console.error('Error fetching exercises:', error);
        }
    }

    // Méthode pour supprimer un exercice par son ID
    async deleteOneExercise(id) {
        try {
            const response = await fetch(`http://localhost:80/backend/exercises/deleteOne.php?id=${id}`);
            const result = await response.json();
            // Après la suppression, rafraîchir la liste des exercices
            this.extractAllTheExercises();
        } catch (error) {
            new ToastModale("Error to delete this exercise", "error");
            console.error('Error deleting exercise:', error);
        }
    }

    // Méthode pour cacher toutes les sections
    hideTheSections() {
        this.sectionList.classList.add('hide');
        this.sectionDetails.classList.add('hide');
        this.sectionForm.classList.add('hide');
    }

    // Afficher la section Liste
    displayListSection() {
        this.hideTheSections();
        this.sectionList.classList.remove('hide');
    }
    // Afficher la section Détails
    displayDetailSection() {
        this.hideTheSections();
        this.sectionDetails.classList.remove('hide');
    }
    // Afficher la section Formulaire
    displayFormSection() {
        this.hideTheSections();
        this.sectionForm.classList.remove('hide');
    }
}

export default App;
