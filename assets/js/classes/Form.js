class FormExercise {
    constructor(app) {
        this.app = app;
        this.formulaireHTML = document.querySelector("form");
        this.formulaireHTML.addEventListener("submit", this.onSoumettre.bind(this));
    }

    async onSoumettre(evenement) {
        evenement.preventDefault();

        if (this.formulaireHTML.checkValidity()) {
            const body = {
                type: this.formulaireHTML.type.value,
                duree: this.formulaireHTML.duree.value,
                description: this.formulaireHTML.description.value,
                date: this.formulaireHTML.date.value,
                difficulte: this.formulaireHTML.difficulte,
            };

            const config = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            };

            const reponse = await fetch("http://localhost:80/backend/exercises/addOne.php", config);
            const message = await reponse.json();
            console.log(message);
        }
    }
}

export default FormExercise;
