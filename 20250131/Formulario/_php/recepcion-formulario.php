<?php

    // linea de comentario
    /* BLOQUE DE COMENTARIO */

    //$_POST[""]
    //$_GET[""]

    /*
    $arrayEjemplo = [
        1,
        "dos",
        3.5
    ];

    echo $arrayEjemplo[0]; // Esto devolvería el 1.
    echo $arrayEjemplo[1]; // Esto devolvería el "dos".
    echo $arrayEjemplo[2]; // Esto devolvería el 3.5

    $arrayEjemploComplejo = [
        [
            "uno", "dos", "tres"
        ],
        [
            "uno-dos", "dos-dos", "tres-dos"
        ],
        [
            "uno-tres", "dos-tres", "tres-tres"
        ]
    ];

    echo $arrayEjemplo[1][1];*/

    function saveValueForm($tagName) {

        if(isset($_POST[$tagName])) {

            $value = 
            $_POST[$tagName];

            echo $value . "<br>";

            return $value;

        } else {

            return null;
        }
    }

    /*$btnEnviar = saveValueForm("enviar");

    if($btnEnviar != null) {

        $nom = 
        saveValueForm(
            "nombre"
        );

        $ape = 
        saveValueForm(
            "apellidos"
        );

        $tlfn = 
        saveValueForm(
            "telefono"
        );

        $email = saveValueForm("correo");
        $edad = saveValueForm("edad");
        $sexo = saveValueForm("sexo");
        $comunidad = saveValueForm("comunidad");
        $fichero = saveValueForm("fichero");
        $lectura = saveValueForm("ck-lectura");
        $cocina = saveValueForm("ck-cocina");
        $informatica = saveValueForm("ck-informatica");
        $cosasFrikis = saveValueForm("ck-cosas-frikis");
        $recomendaciones = saveValueForm("recomendaciones");
    } else {

        echo "Hijoputa. ¿A dónde vas?";
    }*/

    // URL DE LA BBDD
    $servername = "localhost";
    
    // NOMBRE DEL USUARIO QUE HARÁ LA CONSULTA
    $username = "username";

    // CONTRASEÑA DEL USUARIO
    $password = "password";

    // CREAR LA CONEXIÓN Y ABRIRLA
    $conn = 
    new mysqli(
        $servername, 
        $username, 
        $password
    );

    // VER EL SIGUIENTE ENLACE PARA ENCRIPTAR/DESENCRIPTAR UN CAMPO DE LA BBDD
    //https://www.tutorialesprogramacionya.com/mysqlya/temarios/descripcion.php?cod=86&punto=84&inicio=#google_vignette

    // Check connection
    if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
    }
    echo "Connected successfully";

    $sql = "CREATE TABLE MyGuests (
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    firstname VARCHAR(30) NOT NULL,
    lastname VARCHAR(30) NOT NULL,
    email VARCHAR(50),
    reg_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )";
    
    if ($conn->query($sql) === TRUE) {
        echo "Table MyGuests created successfully";
    } else {
        echo "Error creating table: " . $conn->error;
    }

    /* CUANDO UNA CONSULTA DEVUELVE DATOS */
    $sql = "SELECT id AS codUsu, firstname, lastname FROM MyGuests";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
        echo "id: " . $row["id"]. " - Name: " . $row["firstname"]. " " . $row["lastname"]. "<br>";
    }
    
    // RECORDAR CERRAR LA BASE DE DATOS
    $conn->close();

    echo json_encode([
        "message" => 'Mensaje recibido',
        "David" => "Se pone muy rojo"
    ]);
?>