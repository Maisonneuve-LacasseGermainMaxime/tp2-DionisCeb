<?php
// Display the errors
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$host = "localhost";
$port = "3306";
$dbname = "to-do-list";
$username = "root";
$password = "";

//Connexion
$pdoConnexion = new PDO("mysql:host=$host;dbname=$dbname;port=$port", $username, $password);

// Query to extract the data from DB
$sql = "SELECT * FROM taches";
$query = $pdoConnexion->query($sql);
$taches = $query->fetchAll(PDO::FETCH_ASSOC);

// Return the response
header("Content-Type: application/json");
echo json_encode($taches);


