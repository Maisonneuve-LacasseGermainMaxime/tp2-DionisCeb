import ToastModale from "../components/ToastModale";
class FormExercise {
    constructor(app) {
        //instance de l'application (app)
        this.app = app;
        // Sélection du formulaire HTML
        this.formulaireHTML = document.querySelector("form");
        // Sélection du bouton de soumission du formulaire
        this.submitBtn = this.formulaireHTML.querySelector("input[type='submit']");

        // vérifier la validité du formulaire à chaque modification du champ
        this.formulaireHTML.addEventListener("input", this.checkFormValidity.bind(this));
        // Ajout d'un écouteur d'événements pour gérer la soumission du formulaire
        this.formulaireHTML.addEventListener("submit", this.onSoumettre.bind(this)); 
        
        //l'état du bouton de soumission en fonction de la validité du formulaire
        this.checkFormValidity();
    }

    // Méthode pour vérifier la validité du formulaire et activer/désactiver le bouton de soumission en conséquence
    checkFormValidity() {
        // Vérifie si le formulaire est valide
        const isValid = this.formulaireHTML.checkValidity();

        // Validation supplémentaire pour 'difficulte'
        const difficultyInput = this.formulaireHTML.difficulte;
        const difficultyValue = parseFloat(difficultyInput.value);

        if (difficultyInput.value !== '' && (difficultyValue < 0 || difficultyValue > 5)) {
            difficultyInput.setCustomValidity("La difficulté doit être un nombre entre 0 et 5.");
        } else {
            difficultyInput.setCustomValidity("");
        }

        // Ajoute ou retire la classe 'disabled' et modifie l'état du bouton de soumission en fonction de la validité
        if (isValid) {
            this.submitBtn.classList.remove("disabled");
            this.submitBtn.disabled = false;
        } else {
            this.submitBtn.classList.add("disabled");
            this.submitBtn.disabled = true;
        }
    }

    // Méthode pour gérer la soumission du formulaire
    async onSoumettre(evenement) {
        evenement.preventDefault();

         // Empêche le comportement par défaut de soumission du formulaire
        if (this.formulaireHTML.checkValidity()) {
            // L'objet à envoyer au serveur avec les données du formulaire
            const body = {
                type: this.formulaireHTML.type.value,
                duree: this.formulaireHTML.duree.value,
                description: this.formulaireHTML.description.value,
                date: this.formulaireHTML.date.value,
                difficulte: this.formulaireHTML.difficulte.value,
            };
            
            // La requête POST
            const config = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            };
            try {
                const reponse = await fetch("http://localhost:80/backend/exercises/addOne.php", config);
                const message = await reponse.json();
                console.log(message);

                // Appelle la méthode showSuccessToast de l'application pour afficher un message de succès
                if (this.app && typeof this.app.showSuccessToast === 'function') {
                    this.app.showSuccessToast("L'exercice a été ajouté avec succès");
                }
            } catch (error) {
                 // Gestion des erreurs en cas d'échec de la soumission
                if (this.app && typeof this.app.showErrorToast === 'function') {
                    this.app.showErrorToast("Impossible d'ajouter l'exercice");
                }
            }
        }
    }
}

export default FormExercise;
