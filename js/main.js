const user = document.querySelector('.searchUser');
let btnSearch = document.querySelector('.search');
const userStatus = document.querySelector('.perfil');
const infos = document.querySelector('.information');
const errorM = document.querySelector('.messageError');
const info = document.querySelector('.info');
let modal = document.querySelector('.modalInfo');
let exit = document.querySelector('.exit');
let all = document.querySelector('.all-content');
let repo = document.querySelector('.repos');
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
            <i class="fa-brands fa-square-github"> ${res.public_repos} Repositorios</i>
          </div>
          <div class="secondary">
            <p title="seguidores">  ${res.followers} followers </p> | <p title="seguindo"> ${res.following} following </p>
          </div>
          <div class="location">
          <i class="fa-solid fa-location-dot"> ${res.location} </i> 
          </div>
          <div class="repos">
            <h4 class="title> Repositories: </h4>
            
              </div>
          </div>
      </div>
    `
      }

      fetch(`https://api.github.com/users/${gitUser}/repos`)
        .then(res => res.json())
        .then(res => repositories(res))


      repositories();
    })
    .catch(error => {
      console.log(error)
    })
}

function searchBio() {
  btnSearch.addEventListener('click', (e) => {
    e.preventDefault(e);

    if (user.value === "") {
      errorM.classList.add('errorMessage');
      errorM.innerHTML = `Informe o nome de um usuário`;
    } else {
      errorM.style.display = 'none'
      userStatus.style.display = 'block';
      fetchData();
    }

    if (user.value === undefined) {
      userStatus.style.display = 'none';
    }

    user.focus();
    user.value = "";
  })
}

function modalInfo() {
  info.addEventListener('click', () => {
    modal.classList.toggle('modalOff');
    all.classList.toggle('modalOff')
  })

  exit.addEventListener('click', () => {
    modal.classList.add('modalOff');
    all.classList.remove('modalOff');
  })
}

function repositories(res) {

  const repoDiv = document.querySelector('.repos');

  res.forEach((r) => {
    let liRepo = document.createElement('a');
 
  
    liRepo.style.textDecoration = 'none';
    liRepo.classList.add('Repositories')

    liRepo.href = r.html_url;
    liRepo.target = "_blank";
    liRepo.innerText = r.name;

    repoDiv.appendChild(liRepo);

  });

}

document.addEventListener('keypress', (e) => {
  if (e.code === 13) {
    searchBio();
  } else {
    return;
  }
})


modalInfo();
searchBio();
