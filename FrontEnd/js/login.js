const form = document.querySelector('form');

form.addEventListener('submit', async (e) => {
	e.preventDefault();
	const email = form.email.value;
	const password = form.password.value;
	const res = await fetch('http://localhost:8000/login', {
		method: 'POST',
		body: JSON.stringify({ email, password }),
		headers: { 'Content-Type': 'application/json' },
	});

	if (res.ok) {
		alert('Login efetuado com sucesso!');
		const user = await res.json();
		console.log(user);
	} else {
		alert('Email ou senha incorretos!');
		const error = await res.json();
		console.log(error);
	}
});

function Login(googleUser) {
	var profile = googleUser.getBasicProfile();
	console.log('Name: ' + profile.getName());
	console.log('Image URL: ' + profile.getImageUrl());
	console.log('Email: ' + profile.getEmail());
}
