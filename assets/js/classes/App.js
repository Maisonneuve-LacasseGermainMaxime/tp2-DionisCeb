import Exercise from "./Exercise.js";
import FormExercise from "./FormExercise.js";
import Router from "./Router.js";

class App {
    #exercises;

    constructor() {
       

        // List Section
        this.sectionList = document.querySelector("[data-panneau='liste']");
         // Details Section
         this.sectionDetails = document.querySelector("[data-panneau='detail']");
         this.sectionForm = document.querySelector("[data-panneau='formulaire']");

         this.extractAllTheExercises();
         /* this.router = new Router(this); */
         this.hideTheSections();
         /* this.displayFormSection(); */
    
        // Template to display the list of exercises
        this.template = document.querySelector('#exercice-template');
   
        // Container to display the list of exercises
        this.container = this.sectionList.querySelector('[data-liste-exercices]');

        //Select the nav to handle the displaying the sections
        this.nav = document.querySelector('nav');
        this.btnListDisplay = this.nav.querySelector('#displayList');
        this.btnReturn = this.sectionDetails.querySelector('#return-btn');
        this.btnFormDisplay = this.nav.querySelector('#displayForm');
        
        
        
        

        //add event listeners on click:
        //display List section
        this.btnListDisplay.addEventListener('click', this.displayListSection.bind(this));
        this.btnReturn.addEventListener('click', this.displayListSection.bind(this));
        //display Form section
        this.btnFormDisplay.addEventListener('click', this.displayFormSection.bind(this));

        

       

        // Initialize the FormExercise class
        this.formExercise = new FormExercise(this);



    }

    async extractAllTheExercises() {
        try {
            const response = await fetch("http://localhost:80/backend/exercises/readAll.php");
            const exercises = await response.json();
            this.#exercises = exercises;

            // Clear the container before displaying new exercises
            this.container.innerHTML = '';

            // Process each exercise using the Exercise class
            exercises.forEach((exercise) => {
                new Exercise(exercise, this.container, this);
            });
        } catch (error) {
            console.error('Error fetching exercises:', error);
        }
    }

    async deleteOneExercise(id) {
        try {
            const response = await fetch(`http://localhost:80/backend/exercises/deleteOne.php?id=${id}`);
            const result = await response.json();
            console.log(`L'exercice avec l'id "->${result.id}<-" a été supprimé`);

            // After deletion, refresh the exercise list
            this.extractAllTheExercises();
        } catch (error) {
            console.error('Error deleting exercise:', error);
        }
    }

    hideTheSections() {
        this.sectionList.classList.add('hide');
        this.sectionDetails.classList.add('hide');
        this.sectionForm.classList.add('hide');
    }

    //Display sections
    displayListSection() {
        this.hideTheSections();
        this.sectionList.classList.remove('hide');
    }
    //Display sections
    displayDetailSection() {
        this.hideTheSections();
        this.sectionDetails.classList.remove('hide');
    }
    //Display sections
    displayFormSection() {
        this.hideTheSections();
        this.sectionForm.classList.remove('hide');
    }
}

export default App;
