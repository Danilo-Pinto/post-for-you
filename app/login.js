const username = document.querySelector('[name=user]');
const password = document.querySelector('[name=pass]');
const submit = document.querySelector('[name=submit]');

const token = localStorage.getItem('token');


if(token){
    window.location = './index.html';
}

submit.onclick = () =>{

    var params = new URLSearchParams();
    params.append('user', username.value);
    params.append('pass',password.value);
    axios.post('http://localhost/login.php', params).then(
        res =>{
            const data = res.data;

            localStorage.setItem('token',data.token);
            localStorage.setItem('user',data.username);

            window.location = './index.html';
        }
    ).catch(
        err =>{
            alert('Alo deu errado, tente novamente')
        }
    )

}