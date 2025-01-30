
document
.getElementById("btnEnviar")
.addEventListener(
    "click",
    () => {

        let nom = 
        document
        .getElementById(
            "nom"
        ).value;

        let ape = 
        document
        .getElementById(
            "ape"
        ).value;

        let tlfn = 
        document
        .getElementById(
            "tlfn"
        ).value;

        let mail = 
        document
        .getElementById(
            "mail"
        ).value;

        let edad = 
        document
        .getElementById(
            "edad"
        ).value;

        let comprobacionRadio = null;

        const FILTRO_SOLO_TEXTO = 
        /\b^[a-záéíóúñü ]{2,25}$\b/gi;

        const FILTRO_EDAD = 
        /\b^[0-9]{2,2}$\b/;

        const FILTRO_NUMERO_TLFN = 
        /\b^[0-9]{9,9}$\b/;

        const COMUNIDAD = 
        document
        .getElementById(
            "input-comunidad"
        ).options;

        const VALUE_SELECT = 
        COMUNIDAD[COMUNIDAD.selectedIndex].value;

        if(FILTRO_SOLO_TEXTO
            .test(nom)) {

            document
            .getElementById(
                "valor_msg_error_nom"
            ).innerHTML = ``;

            if(/*FILTRO_SOLO_TEXTO
                .test(ape)*/true) {

                document
                .getElementById(
                    "valor_msg_error_ape"
                ).innerHTML = ``;

                if(FILTRO_EDAD.test(tlfn)) {

                    const RADIO = 
                    document
                    .getElementsByName(
                        "sexo"
                    );

                    RADIO
                    .forEach(
                        (item) => {

                            if(item
                                .checked) {

                                comprobacionRadio = 
                                item.value;

                                alert(
                                    `La opción seleccionada es ${item.value}`
                                );
                            }
                        }
                    );

                    if(comprobacionRadio != null) {
                        
                        if(VALUE_SELECT == -1) {

                            alert("No has elegido una opción en el select.")

                        } else {

                           const FORM = 
                           new FormData();

                           const OPTIONS_FORM = {
                            method: "POST"
                          };

                           FORM
                           .append(
                                "nombre", nom
                            );

                            FORM
                           .append(
                                "apellido", ape
                            );

                            FORM
                           .append(
                                "tlfn", tlfn
                            );

                            FORM
                           .append(
                                "sex", 
                                comprobacionRadio
                            );

                            FORM
                            .append(
                                "Comunidad", 
                                VALUE_SELECT
                            );

                            fetch("./_php/recepcion-formulario.php", 
                                OPTIONS_FORM
                            ).then(response => () => {

                                //response.text()
                            });
                        }

                    } else {

                        alert(`Por favor, selecciona uno de los radio buttons.Grasias. Su tabaco.`);
                    }

                } else {

                    alert(`El valor introducido en el campo "edad" no es correcto. Por favor, introduce un número de dos dígitos.`);
                }

            } else {

                document
                .getElementById(
                    "valor_msg_error_ape"
                ).innerHTML = `El valor introducido en el campo "apellido" no es correcto. Por favor, introduce un nombre que tenga un máximo de 25 caracteres.`;
            }

        } else {

            document
            .getElementById(
                "valor_msg_error_nom"
            ).innerHTML = `El valor introducido en el campo "nombre" no es correcto. Por favor, introduce un nombre que tenga un máximo de 25 caracteres.`;
        }        
   }
);

