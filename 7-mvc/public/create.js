const form = document.querySelector('form')
form.addEventListener('submit', (e) => {
    e.preventDefault()
    const formData = new FormData(form)
    fetch('http://localhost:3000/api/books/', {
        method: 'POST',
        body: formData,
    })
        .then((res) => res.json())
        .then((result) => {
            window.location = '/view/' + result.id
        })
        .catch((error) => console.log('Error:', error))
})
