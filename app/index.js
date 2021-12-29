const token = localStorage.getItem('token');
const user = localStorage.getItem('user');

const card_list = document.querySelector('.cards');
const data_user = document.querySelector('.conteiner-header');

data_user.innerHTML = `<i class="large material-icons">account_circle</i>
<p>${user}</p>`;

if(!token){
    window.location = './login.html';
}

axios.get('http://localhost/view_posts.php').then(
    res =>{
        let list_card = ''
        res.data.map(
            e =>{
                list_card += `
                <div class="card">
                    <div class="card-body">
                        <p class="card-text">@${e.author} - ${e.title}</p>
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