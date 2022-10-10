const user = document.querySelector('.searchUser');
let btnSearch = document.querySelector('.search');
const userStatus = document.querySelector('.perfil');
const infos = document.querySelector('.information');
const errorM = document.querySelector('.messageError');
const info = document.querySelector('.info');
let modal = document.querySelector('.modalInfo');
let exit = document.querySelector('.exit');
let all = document.querySelector('.all-content');
userStatus.style.display = 'none';
modal.classList.add('modalOff');

function fetchData() {

  const gitUser = user.value;

  fetch(`https://api.github.com/users/${gitUser}`)
    .then(res => res.json())
    .then(res => {

      if (res.status === 404) {
        return alert(' Esse perfil não existe ');
      }

      if (gitUser) {

        userStatus.innerHTML = `
      <div class="status">
        <img src=${res.avatar_url}/>
        <div class="bio">
          <p> ${res.bio} </p>
          <hr>
          <p> ${res.login} </p>
          </div>
         <div class="primary">
            <i class="fa-brands fa-square-github"> ${res.public_repos} Repositorios publicos</i>
          </div>
          <div class="secondary">
            <i class="fa-solid fa-circle-info" title="seguidores">  ${res.followers} followers </i> | <i class="fa-solid fa-circle-info" title="seguindo"> ${res.following} following </i>
          </div>
          <div class="location">
          <i class="fa-solid fa-location-dot"> ${res.location} </i> 
          </div>
      </div>
    `
      }
    })
    .catch(error => {
      console.log(error)
    })
}

function searchBio() {
  btnSearch.addEventListener('click', (e) => {
    e.preventDefault(e);

    if(user.value === ""){
      errorM.classList.add('errorMessage');
      errorM.innerHTML = `Informe o nome de um usuário`;
    }else{
      errorM.style.display = 'none'
      userStatus.style.display = 'block';
      fetchData();
    }

    if(user.value === undefined){
      userStatus.style.display = 'none';
    }

    user.focus();
    user.value = "";
  })
}


function modalInfo(){
  info.addEventListener('click' , () => {
    modal.classList.toggle('modalOff');
    all.classList.toggle('modalOff')
  })

  exit.addEventListener('click' , () => {
    modal.classList.add('modalOff');
    all.classList.remove('modalOff');
  })
}

modalInfo();
searchBio();
