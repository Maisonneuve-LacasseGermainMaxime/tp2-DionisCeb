class App {
    #tasks;

    constructor() {
        this.extractAllTheTasks();
    }

    async extractAllTheTasks() {
        const response = await fetch("http://localhost:8080/backend/tasks/readAll.php");
        const tasks = await response.json();
        console.log(tasks);
    }
}

export default App;