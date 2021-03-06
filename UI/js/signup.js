const url = 'http://127.0.0.1:5000/api/v2/auth/register'
const register = document.getElementById('reg')
const success = document.getElementById('success')
const error = document.getElementById('error')

register.addEventListener('submit', r => {
	r.preventDefault();
	let fname = document.getElementById('firstname').value;
	let lname = document.getElementById('lastname').value;
	let username = document.getElementById('username').value;
	let phone = document.getElementById('phone').value;
	let email = document.getElementById('email').value;
	let pass = document.getElementById('password').value;
	let con_pass = document.getElementById('con_pass').value;

	if (pass != con_pass) {
		error.innerHTML = 'Password do not match'
		return
	}

	let data = {
		firstname : fname,
		lastname : lname,
		username : username,
		phone_number : phone,
		email : email,
		password : pass,
		confirm : con_pass
	};
	register_user(data);
});


const register_user = (user_details) => {
	fetch(url, {
		method: 'POST',
		headers: {
			Accept: 'application/json, text/plain, */*',
			'Content-type': 'application/json'
		},
		body: JSON.stringify(user_details)
	})
	.then((res) => {
		status_code = res.status
		return res.json();
	})
	.then((data) => {
		if (status_code === 201) {
			success.innerHTML = data.message;
			success.style.backgroundColor = "#228B22";
            success.style.padding = "5px";
			window.setTimeout(() => window.location.href = 'signin.html', 3000);
		}
		if (status_code === 409){
            error.innerHTML = data.message;
            error.style.backgroundColor = "#800000";
            error.style.padding = "5px";
        }
        if (status_code === 400){
            error.innerHTML = data.message;
            error.style.backgroundColor = "#800000";
            error.style.padding = "5px";
        }
	})
	.catch((err) => {
            console.log(err)
    });
};