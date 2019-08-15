// NOTA: Instalar el LIVE SERVER para usar puerto
import {signInWithEmailAndPassword} from '../model/modelFirebase.js'
// ---------------------------------------------------------------------//
// AUTENTICACIÓN CON CUALQUIER OTRA CUENTA
// ---------------------------------------------------------------------//
export const loginFunction = () => {
  // Obtener los campos email y password
  const email = document.getElementById('txt-email').value;
  const pass = document.getElementById('txt-password').value;
  const mensajeError = document.getElementById('mensaje-error');
  // const auth = firebase.auth();
  // Login
  const promise = signInWithEmailAndPassword(email, pass).then((result) => {
    location.hash = '#/home';
    console.log('autenticado usuario ', result);
  })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // alert(`Error detectado: ${errorMessage}, Tipo:${errorCode}`);
      console.log('Detectado un error:', error, errorMessage);
      switch(errorCode){
          case 'auth/user-not-found':
              mensajeError.innerHTML = '*Usuario no registrado. Por favor, registrarse.';
              break;
            case 'auth/wrong-password':
              mensajeError.innerHTML = '*La contraseña es incorrecta.';
              break;
            case 'auth/invalid-email':
              mensajeError.innerHTML = '*El formato del correo ingresado no es válido, verifica e intente de nuevo.';
              break;
            default:
              mensajeError.innerHTML = 'Se ha producido un error';
      }
    });
  promise.catch(evento => console.log(evento.message));
};
// ---------------------------------------------------------------------//
// AUTENTICACIÓN CON GOOGLE EN FIREBASE
// ---------------------------------------------------------------------//
export const authAccountGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  const authService = firebase.auth();
  authService.signInWithPopup(provider).then((result) => {
    const user = result.user;
    const token = result.credential.accessToken;
    location.hash = '#/home';
    console.log('autenticado usuario ', result.user, user, token);
  })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(`Error detectado: ${errorMessage}, Tipo:${errorCode}`);
      console.log('Detectado un error:', error);
    });
};
// ---------------------------------------------------------------------//
// AUTENTICACIÓN CON FACEBOOK EN FIREBASE
// ---------------------------------------------------------------------//
export const authAccountFacebook = () => {
  // creando el provider de autenticacion
  const provider = new firebase.auth.FacebookAuthProvider();
  // accediendo al servicio de autenticación
  const authService = firebase.auth();
  authService.signInWithPopup(provider).then((result) => {
    const user = result.user;
    const token = result.credential.accessToken;
    location.hash = '#/home';
    // todo correcto
    console.log('autenticado usuario ', result.user, user, token);
  })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(`Error detectado: ${errorMessage}, Tipo:${errorCode}`);
      console.log('Detectado un error:', error);
    });
};
