import { userCurrent } from '../model/modelFirebase.js';
// import { TextPost } from '../controller/postContr.js'
export const itemPost = (publication) => {
    // console.log(data);
    const divElement = document.createElement('div');
    divElement.innerHTML += `  
    <div class="post postear">
    <div class="user-post">
    <p class="">Publicado por:  ${publication.email} </p>
    ${userCurrent().uid === publication.id ? `
    <button id="${publication.id}" class="like">eliminar</button>` : ``}
    </div>
      <textarea id="${publication.id}" class="">${publication.textPost}</textarea>
      <div class="">
        <div class="">
          <button class="like" >LIKE</i></button>
          <button  class="like">CMP</button>
        </div>
        <div class="comment-sub1 mp">
           <input id="" class="comentario" placeholder ="Escribe un comentario" type=text/>
          </div>
      </div>
    `;
  return divElement;
}