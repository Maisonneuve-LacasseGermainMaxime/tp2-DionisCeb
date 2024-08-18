import Exercise from "./Exercise.js";

class App {
    #exercises;

    constructor() {
        this.extractAllTheExercises();

        // List Section
        this.sectionList = document.querySelector("[data-panneau='liste']");
    
        // Template to display the exercises
        this.template = document.querySelector('#exercice-template');
    
        // container to display the exercises
        this.container = this.sectionList.querySelector('[data-liste-exercices]');
    }

    async extractAllTheExercises() {
        try {
            const response = await fetch("http://localhost:80/backend/exercises/readAll.php");
            const exercises = await response.json();
            this.#exercises = exercises;

            // Process each exercise
            exercises.forEach((exercise) => {
                // Clone the template content
                const clone = document.importNode(this.template.content, true);

                // Fill in the details
                const listExerciseDate = clone.querySelector('[data-exercice-date]');
                const listExerciseType = clone.querySelector('[data-exercice-type]');
                
                listExerciseDate.textContent = exercise.date;
                listExerciseType.textContent = exercise.type;

                // Append the clone to the container
                this.container.appendChild(clone);
            });
        } catch (error) {
            console.error('Error fetching exercises:', error);
        }
    }

    

}

export default App;
