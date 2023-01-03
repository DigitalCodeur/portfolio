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
        // echo "Connected successfully";
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
        if ($_SERVER["REQUEST_METHOD"] === "POST") {
            $name = $email = $object = $message = null;
            if (!empty($_POST['name']) && !empty($_POST['email']) && !empty($_POST['object']) && !empty($_POST['message'])) {
                $name = htmlspecialchars($_POST['name']);
                $email = htmlspecialchars($_POST['email']);
                $object = htmlspecialchars($_POST['object']);
                $message = htmlspecialchars($_POST['message']);

                $success = createContact($name, $email, $object, $message);
                if ($success) {
                    $to = "lkoffisamuel@gmail.com";
                    $subject = "portfolio:" . $object;
                    $txt = "
                    <p>vous avez recu un message de " . $email . "</p>
                    <p>Nom:" . $name . "</p>
                    <p>Message:" . $message . "</p>
                    ";
                    // Always set content-type when sending HTML email
                    $headers = "MIME-Version: 1.0" . "\r\n";
                    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";

                    // More headers
                    $headers .= 'From: <' . $email . '>' . "\r\n";

                    $send = mail($to, $subject, $txt, $headers);
                } else {
                    // throw new Exception('Echec d\'envoi.');
                }
            } else {
                throw new Exception('veillez remplir tous les champ.');
            }
        }
    }

    addContact();
} catch (PDOException $e) {

    echo "error message: " . $e->getMessage();
}