<?php

try {
    function dbConnect()
    {
        $servername = "localhost";
        $username = "root";
        $password = "";
        $dbname = "portfolio";
        $database = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
        // set the PDO error mode to exception
        $database->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        echo "Connected successfully";
        return $database;
    }

    function createContact(string $name, string $email, string $object, string $message)
    {
        $database = dbConnect();
        $statement = $database->prepare(
            'INSERT INTO contacts (name, email, object, message, created_at) VALUES (?, ?, ?, ?, NOW())'
        );
        $affectedLine = $statement->execute([$name, $email, $object, $message]);
        return ($affectedLine > 0);
    }

    function addContact()
    {
        $name = $email = $object = $message = null;
        if (!empty($_POST['name']) && !empty($_POST['email']) && !empty($_POST['object']) && !empty($_POST['message'])) {
            $name = $_POST['name'];
            $email = $_POST['email'];
            $object = $_POST['object'];
            $message = $_POST['message'];

            $success = createContact($name, $email, $object, $message);
            if ($success) {
                echo "envoi reussi";
            } else {
                throw new Exception('Echec d\'envoi.');
            }
        } else {
            throw new Exception('veillez remplir tous les champ.');
        }
    }

    addContact();

} catch (PDOException $e) {

    echo "error message: " . $e->getMessage();
}