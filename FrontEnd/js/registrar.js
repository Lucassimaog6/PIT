const form = document.querySelector('form');

form.addEventListener('submit', async (e) => {
	e.preventDefault();
	const name = form.name.value;
	const email = form.email.value;
	const password = form.password.value;
	const age = form.age.value;
	const education = form.education.value;
	const genre = form.genre.value;

	const res = await fetch('http://localhost:8000/register', {
		method: 'POST',
		body: JSON.stringify({ name, email, password, age, education, genre }),
		headers: { 'Content-Type': 'application/json' },
	});

	if (res.ok) {
		alert('Cadastro efetuado com sucesso!');
		const user = await res.json();
		console.log(user);
	} else {
		alert('Cadastro não efetuado!');
		const error = await res.json();
		console.log(error);
	}
});
