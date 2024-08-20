import Exercise from "./Exercise.js";
import FormExercise from "./Form.js";

class App {
    #exercises;

    constructor() {
        this.extractAllTheExercises();

        // List Section
        this.sectionList = document.querySelector("[data-panneau='liste']");
    
        // Template to display the list of exercises
        this.template = document.querySelector('#exercice-template');
   
        // Container to display the list of exercises
        this.container = this.sectionList.querySelector('[data-liste-exercices]');

        // Details Section
        this.sectionDetails = document.querySelector("[data-panneau='detail']");

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
}

export default App;
