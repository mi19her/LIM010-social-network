//---------------------------------------------------------------------//
//REGISTRO DE UN NUEVO USUARIO
//---------------------------------------------------------------------//
import { db } from '../../main.js';
export const registerFunction = () => {
    //Obtener los campos email y password
    //Comprobando que el email sea real
    const username = document.getElementById('txt-username').value;
    const email = document.getElementById('txt-email').value;
    const pass = document.getElementById('txt-password1').value;
    const mensajeError = document.getElementById('mensaje-error');
    const auth = firebase.auth();
    //Validando datos del email y password
    // validar(email, pass);
    //Login
    auth.createUserWithEmailAndPassword(email,pass).then((result) => {
        location.hash = '#/';
        return db.collection('users').doc(result.user.uid).set({
            Username: username,
            Foto: 'https://image.flaticon.com/icons/png/512/16/16363.png',
            Email: email
        });
        // console.log(result);
        // alert('Usuario creado correctamente');
      })
      .catch ( error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // alert(`Error detectado: ${errorMessage}, Tipo:${errorCode}`);
        console.log('Detectado un error:', error, errorMessage);
        switch(errorCode){
            case 'auth/email-already-in-use':
                mensajeError.innerHTML = '*La dirección de correo electrónico ya existe.';
                break;
              case 'auth/weak-password':
                mensajeError.innerHTML = '*La contraseña debe tener al menos 6 caracteres.';
                break;
              case 'auth/invalid-email':
                mensajeError.innerHTML = '*El formato del correo ingresado no es válido, verifica e intente de nuevo.';
                break;
              default:
                mensajeError.innerHTML = 'Se ha producido un error';
        }
    });
};
//---------------------------------------------------------------------//
//VALIDACION DEL EMAIL Y PASSWORD
//---------------------------------------------------------------------//
const validar = (email, password) =>{
    //Normalmente el formato de un email es: texto.123@texto.texto
    const expresionEmail =/\w+@\w+\.+[a-z]/; //email lo mas simple
    //Ingresar constraseña solo texto y numero
    const expresionPassword = /[a-z][0-9]/;
    if(email === "" && password === ""){
        alert('Todos los campos son obligatorios');
        return false;
    }else if (email === ""){
        alert('Campo email obligatorio');
        return false;
    }else if (password === ""){
        alert('Campo Password obligatorio');
        return false;
    }else if (!expresionEmail.test(email)){
        alert('Email no válido');
        return false;
    }else if(!expresionPassword.test(password)) {
        alert('Constraseña no válido (Solo texto y números)');
        return false;
    }
};