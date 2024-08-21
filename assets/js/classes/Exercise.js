class Exercise {
    constructor(exerciseInfos, conteneur, app) {
        const { id, duree, type, description, date, difficulte } = exerciseInfos;
        this.conteneur = conteneur;
        this.app = app;

        this.id = id;
        this.duree = duree;
        this.type = type;
        this.description = description;
        this.date = date;
        this.difficulte = difficulte;

        // Template and section for details
        this.template = document.querySelector('#exercice-template');
        this.sectionDetails = this.app.sectionDetails;

        //Delete btn
        this.deleteButton = this.sectionDetails.querySelector('button.danger');

        this.injecterHTML();
    }

    injecterHTML() {
        // Clone the exercise template and update the details
        const exerciseElement = this.template.content.cloneNode(true);
        exerciseElement.querySelector('[data-exercice-date]').textContent = this.date;
        exerciseElement.querySelector('[data-exercice-type]').textContent = this.type;

        // Set up the href with the exercise ID
        const detailLink = exerciseElement.querySelector('a.btn');
        detailLink.href = `#detail/${this.id}`;

        // Add click event listener to the detail link
        detailLink.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent the default anchor behavior
            this.handleClick(); // Handle the click event
        });

        // Append the exercise to the container
        this.conteneur.appendChild(exerciseElement);
    }

    handleClick() {
        // Display the details section and update with exercise info
        this.app.displayDetailSection();
        /* this.sectionDetails.classList.remove('hide'); */
        console.log(`Id of the exercise = ${this.id}`);
    
        // Store the ID in a variable
        const exerciseId = this.id;
    
        // Set the ID of the delete button to the stored exercise ID
        if (this.deleteButton) {
            this.deleteButton.id = `${exerciseId}`;
            console.log(`Id of the button: ${this.deleteButton.id}`);
        } else {
            console.error('Delete button is not defined');
        }
    
        // event listener for the delete button
        if (this.deleteButton) {
            this.deleteButton.addEventListener('click', () => {
                this.deleteOneExercise(exerciseId);
            });
        }
    
        // details section with the current exercise info
        const detailsSection = this.sectionDetails;
        detailsSection.querySelector('[data-type]').textContent = this.type || 'N/A';
        detailsSection.querySelector('[data-duree]').textContent = this.duree || 'N/A';
        detailsSection.querySelector('[data-date]').textContent = this.date || 'N/A';
        detailsSection.querySelector('[data-description]').textContent = this.description || 'N/A';
        detailsSection.querySelector('[data-difficulte]').textContent = this.difficulte || 'N/A';
    }
    
    deleteOneExercise(id) {
        //logic to delete an exercise by its ID
        console.log(`Deleting exercise with ID: ${id}`);
        this.app.deleteOneExercise(id);
    }
    
}

export default Exercise;
