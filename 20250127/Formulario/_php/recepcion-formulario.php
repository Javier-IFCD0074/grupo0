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

    $btnEnviar = saveValueForm("enviar");

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
    }

    
    

?>