import { response } from "express";
import { verifyToken } from "../config/jwt.js";

export const auth = (requiredRole) => {
 return async (request, response, next) => {
   // logica de validacion 

   const token = request.headers ["authorization"];
   console.log("Cual es el token recibido en la cabecera de la peticion" + token);

   if (!token){
    return response.status(401).json({
      "mensaje": "No se encontro token, permiso denegado"
    });
   }



   //2VERIFICAR QUE EL TOKEN SEA PERMITIDO

   const allowedToken = token.split(" ") [1];
   console.log("token despues de separarlo del bearer:" + allowedToken)

   try {
    const decoded = await verifyToken (allowedToken);
    console.log("Informacion decodificada del token: " , decoded);

    //3 verificar si el rol es de administrador 
if(requiredRole === "admin" && decoded.admin === false){
  return response.status(401).json({
    "mensaje": "Acceso no permitido, no eres administrador"
  
  }); 
}


   } catch (error) {
    return response.status(401).json({
      mensaje: "Fallo la autorizacion no permitida"
    });


   }
   

   next ();
 }

}