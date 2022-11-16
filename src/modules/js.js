"use strict"

document.addEventListener('DOMContentLoaded', function () {
    const text = document.getElementById('text');
    const form = document.getElementById('form');

    form.addEventListener('submit', formSent);

    function formSent(e) {
        e.preventDefault();

        let error = formValidate(form);

        if (error === 0) {
            postForm();
            alert('From sent!')
        } else {
            alert('Form entered incorrectly...');
        }
    }

    function postForm() {

        const formData = new FormData(form);
        const object = {};
        formData.forEach(function (value, key) {
            object[key] = value;
        });

        fetch('server.php', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(object)
        })
            .then(data => data.text())
            .then(data => {
                console.log(data);
            })
            .then(() => form.reset())
            .catch(() => {
                alert('Form not submitted...');
            });
    }


    function formValidate() {
        let error = 0;
        const textValue = text.value.trim();

        if (textValue === '') {
            setErrorFor(text,'Input cannot be blank');
            error++;
        } else {
            setSuccessFor(text)
        }

        return error;
    }

    function setErrorFor(text, message) {
        const formItem = text.parentElement;
        const small = formItem.querySelector('small')
        small.innerText = message
        formItem.className = 'field__input error';
    }

    function setSuccessFor(input) {
        const formItem = input.parentElement;
        formItem.className = 'field__input';
    }

});
