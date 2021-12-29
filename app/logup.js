const username = document.querySelector('[name=user]');
const email = document.querySelector('[name=email]');
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
    params.append('email',email.value);
    axios.post('http://localhost/logup.php', params).then(
        res =>{
            const data = res.data;

            localStorage.setItem('token',data.token);
            localStorage.setItem('user',data.user);

            window.location = './index.html';
        }
    ).catch(
        err =>{
            alert('Alo deu errado, tente novamente')
        }
    )

}