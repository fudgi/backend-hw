const form = document.querySelector('form')
form.addEventListener('submit', (e) => {
    e.preventDefault()
    const formData = new FormData(form)
    fetch('http://localhost:3000/api/books/' + document.title, {
        method: 'PUT',
        body: formData,
    })
        .then((result) => {
            console.log('Success:', result)
            window.location = '/view/' + document.title
        })
        .catch((error) => console.log('Error:', error))
})
