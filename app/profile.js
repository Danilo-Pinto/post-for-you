const render = document.querySelector('h1');
const post = document.querySelector('#post');
const logout = document.querySelector('#logout');

const token = localStorage.getItem('token');
const user = localStorage.getItem('user');


if(!token){
    window.location = './login.html';
}


logout.onclick = () =>{
    localStorage.clear()
    window.location = './login.html';
}

const card_list = document.querySelector('.cards');
const data_user = document.querySelector('.conteiner-header');

data_user.innerHTML = `<i class="large material-icons">account_circle</i>
<p>${user}</p>`;


render.onclick = () =>{
    window.location = './index.html';
}

window.onload = loadPosts;

post.onclick = createPost;

function createPost() {
    const formData = new FormData();
    const title = document.querySelector('#title');
    const photo = document.querySelector('#file');
    
    formData.append("image", photo.files[0]);
    formData.append("title", title.value);
    
    if(title.value == "" || photo.files[0] == ""){
        return ;
    }

    axios.post('http://localhost/create_post.php', formData, {
        headers: {
            "Authorization" : token,
            "Content-Type": `multipart/form-data; boundary=${formData._boundary}`
        }
    }).then(
        res =>{
            loadPosts();
            title.value = "";
            photo.value = "";
        }
    ).catch(
        err => alert('Algo deu errado, tente novamente!')
    )
}


function loadPosts(){
    axios.get('http://localhost/profile.php',{
        headers: {"Authorization" : token}
    }).then(
        res =>{
            let list_card = ''
            res.data.map(
                e =>{
                    list_card += `
                    <div class="card">
                        <div class="card-body">
                            <p class="card-text">@${e.author} - ${e.title}</p>
                            
                            <button class="btn btn-danger mb-2" id="${e.id}" onClick="isChecking(this.id)">
                                <i class="material-icons">delete</i>
                            </button>
                        </div>
                        <img class="card-img-top" src="${e.photo}"/>
                    </div>
                    `
                }
            )
    
            card_list.innerHTML = list_card;
        }
    ).catch(
        err =>{
            localStorage.clear();
            window.location = './login.html';
        }
    )
}

function isChecking(id){
    var params = new URLSearchParams();
    params.append('id_post', id);
    axios.post('http://localhost/delete_post.php', params,{
        headers: {"Authorization" : token}
    }).then(
        res =>{
            loadPosts();
        }
    ).catch(
        err => console.log(err)
    )
}

var myModal = document.getElementById('myModal')
var myInput = document.getElementById('myInput')

myModal.addEventListener('shown.bs.modal', function () {
  myInput.focus()
})