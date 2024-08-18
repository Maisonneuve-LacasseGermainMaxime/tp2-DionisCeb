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

        //spans to update
        this.typeSpan = document.querySelector("[data-type]");
        this.timeSpan = document.querySelector("[data-duree]");
        this.dateSpan = document.querySelector("[data-date]");
        this.descriptionSpan = document.querySelector("[data-description]");
        this.timeSpan = document.querySelector("[data-duree]");
        this.difficultySpan = document.querySelector("[data-difficulte]");
        

        this.gabarit = document.querySelector("template#exercice-template");
        this.sectionDetails = document.querySelector("[data-panneau='detail']");
        console.log(this.sectionDetails);
        
        this.injecterHTML();
    }

    injecterHTML() {
        let clone = this.gabarit.content.cloneNode(true);

        // details
        const listExerciseDate = clone.querySelector('[data-exercice-date]');
        const listExerciseType = clone.querySelector('[data-exercice-type]');
        const detailLink = clone.querySelector('a.btn');
        
        listExerciseDate.textContent = this.date;
        listExerciseType.textContent = this.type;

        // Set up the href with the exercise ID
        detailLink.href = `#detail/${this.id}`;

        // Add click event listener to the anchor
        detailLink.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent the default anchor behavior
            this.handleClick(); // Handle the click event
        });

        this.conteneur.append(clone);
        this.elementHTML = this.conteneur.lastElementChild;
        this.elementHTML.id = this.id;
    }

    // Logic to handle the click event and extract the ID
    handleClick() {
        this.sectionDetails.classList.remove('hide');
        // extract the values
        let idDetail = this.id;
        let timeDetail = this.duree;
        let typeDetail = this.type;
        let descriptionDetail = this.description;
        let dateDetail = this.date;
        let difficultyDetail = this.difficulte;
        //update the spans the details of specific exercise
        this.timeSpan.innerHTML = timeDetail;
        this.typeSpan.innerHTML = typeDetail;
        this.descriptionSpan.innerHTML = descriptionDetail;
        this.dateSpan.innerHTML = dateDetail;
        this.difficultySpan.innerHTML = difficultyDetail;
        
    }
}

export default Exercise;
