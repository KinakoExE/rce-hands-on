document.getElementById('form').addEventListener('submit', e => {
	e.preventDefault();

	fetch('/api/user', {
		method: 'POST',
		body: JSON.stringify({
			'user.username': document.querySelector('input[type=text]').value
		}),
		headers: {'Content-Type': 'application/json'}
	}).then(resp => {
		return resp.json();
	}).then(data => {
		document.getElementById('output').innerHTML = data.response;
	});

});