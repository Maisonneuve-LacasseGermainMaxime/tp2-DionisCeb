import Exercise from "./Exercise.js";

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
    }

    async extractAllTheExercises() {
        try {
            const response = await fetch("http://localhost:80/backend/exercises/readAll.php");
            const exercises = await response.json();
            this.#exercises = exercises;

            // Process each exercise using the Exercise class
            exercises.forEach((exercise) => {
                new Exercise(exercise, this.container, this);
            });
        } catch (error) {
            console.error('Error fetching exercises:', error);
        }
    }

    //Extract one exercise

    async extractOneExercise(id) {
        try {
            const response = await fetch(`http://localhost:80/backend/exercises/readOne.php?id=${id}`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const exercise = await response.json();
            console.log(exercise);

            // Example: Handle the exercise data (e.g., display details)
            // this.displayExerciseDetails(exercise);

        } catch (error) {
            console.error('Error fetching the exercise:', error);
        }
    }

    //Delete one exercise

    async deleteOneExercise(id) {
        try {
            const response = await fetch(`http://localhost:80/backend/exercises/deleteOne.php?id=${id}`);
            const exercise = await response.json();

            // After deletion, refresh the exercise list
            /* this.extractAllTheExercises(); */

            console.log(`L'exercice avec l'id "->${exercise.id}<-" a été supprimé`);
        } catch (error) {
            console.error('Error deleting exercise:', error);
        }
    }

}

export default App;
