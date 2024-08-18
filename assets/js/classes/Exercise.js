class Exercise {
    constructor(exerciseInfos, conteneur, app) {
        const { id, type, description, date, difficulte } = exerciseInfos;
        this.conteneur = conteneur;
        this.app = app;

        this.id = id;
        this.type = type;
        this.description = description;
        this.date = date;
        this.difficulte = difficulte;

        this.gabarit = document.querySelector("template#exercice-template");
        this.injecterHTML();
    }

    injecterHTML() {
        let clone = this.gabarit.content.cloneNode(true);

        this.conteneur.append(clone);
        this.elementHTML = this.conteneur.lastElementChild;

        this.elementHTML.id = this.id;
        this.elementHTML.innerHTML = this.elementHTML.innerHTML.replaceAll(/{{type}}/g, this.type);

        this.elementHTML.addEventListener("click", this.onClic.bind(this));
    }
}

export default Exercise;
