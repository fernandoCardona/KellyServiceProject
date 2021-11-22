//Referencia Endpoints

METHOD -------- PATH ------ DESCRIPTION
_____________________________________________
get   --------  /  -------- Index

--------- CLIENT ---------------------------
_____________________________________________
post  -------- / --------- guarda la información del login del cliente
post  -------- / -------- guarda al cliente en la bbdd
get   -------- /dashBoard/client         -------- muestra el dashboard del cliente :
              - Informacion del Cliente
              - Boton editar Client Profile
              - La lista de todos los servicios solicitados
              - Boton de solicitud de nuevo servicio
              - Boton editar servicio existente
              - Lista de historial de servicios terminados
              - Boton Cancelar servicio

get   -------- /dashBoard/client/profile-edit --- muestra el editor de perfil (el perfil aparece en el dashboard)
post  -------- /dashBoard/client/profile-edit --- hace un update de la informacion del perfil de Client
get   -------- /dashBoard/client/services/new        --- muestra formulario para crear nuevo servicio
post  -------- /dashBoard/client/services/new        --- guarda el nuevo servicio en la bbdd
get   -------- /dashBoard/client/current-services    --- - Lista de servicios activos
                                                  - Lista de workers que aceptan la propuesta
                                                  - boton acetar worker
                                                  - boton rechazar worker
                                                  - Boton finalizacion servicio
                                                  - Boton volver al Dashboard


--------- WORKER ---------------------------
_____________________________________________
post  -------- / --------- guarda la información del login del trabajador
post  -------- / -------- guarda al trabajador en la bbdd
get   -------- /dashBoard/worker         -------- muestra el dashboard del trabajador:
              - Informacion del trabajador
              - Boton editar Worker Profile
              - La lista de todos los servicios que se solicitan
              - Boton aceptar servicio (para que le salga la solicitud en el current service del cliente)
              - Lista historial de servicios terminados
get   -------- /dashBoard/worker/profile-edit --- muestra el editor de perfil (el perfil aparece en el dashboard)
post  -------- /dashBoard/worker/profile-edit --- hace un update de la informacion del perfil del Worker
get   -------- /dashBoard/worker/current-services --- 
              - Lista de servicios activos
              - Boton detalles del servicio (informacion de ese servicio y mapa)
              - Boton volver al dashBoard



