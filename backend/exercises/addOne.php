<?php
try {//Afficher les erreurs
    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);

    $host = "localhost";
    $port = "3306";
    $dbname = "fitness-app";
    $username = "root";
    $password = "";
    

    //Connexion
    $pdoConnexion = new PDO("mysql:host=$host;dbname=$dbname;port=$port", $username, $password);

    //Requête à la base de données
    $data = json_decode(file_get_contents("php://input"));

    $type = $data->type;
    $duree = $data->duree;
    $description = $data->description;
    $date = $data->date;
    $difficulte = $data->difficulte;

    //Prepared statement
    $sql = "INSERT INTO exercices (type, duree, description, date, difficulte) VALUES (:type, :duree, :description, :date, :difficulte)";
    $query = $pdoConnexion->prepare($sql);
    $query->execute(
        array(
            ":type" => $type,
            ":duree" => $duree,
            ":description" => $description,
            ":date" => $date,
            ":difficulte" => $difficulte,
        )
    );

    // Récupérer l'id de l'élément ajouté
    $id = $pdoConnexion->lastInsertId();
    $message = ["message" => "L'élément a été ajouté avec succès", "id" => $id];

    //Retourne la réponse
    header("Content-Type: application/json");
    http_response_code(200);
    echo json_encode($message);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["message" => $e->getMessage()]);
}