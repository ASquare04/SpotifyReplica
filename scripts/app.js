const panels = document.querySelectorAll('.panel');

panels.forEach((panel) => {
    panel.addEventListener('mouseenter', () => {
        removeActiveClasses();
        panel.classList.add('active');
    });
});

function removeActiveClasses() {
    panels.forEach((panel) => {
        panel.classList.remove('active');
    });
}

function validateForm(event) {
    event.preventDefault(); // Prevents the form from submitting by default

    var email = document.getElementById('mail').value;
    var password = document.getElementById('pass').value;
    var passwordError = document.getElementById('passwordError');
    var successMessage = document.getElementById('successMessage');

    passwordError.innerHTML = '';
    successMessage.innerHTML = '';
    document.getElementById('pass').classList.remove('shake');

    if (email.trim() === '' || password.trim() === '') {
        alert('Please fill in all fields');
    } else {
        // Password validation: Check length and presence of lowercase and uppercase characters
        if (password.length < 8) {
            displayError('Must be at least 8 characters long');
            animateField('pass');
        } else if (!/[a-z]/.test(password) || !/[A-Z]/.test(password)) {
            displayError('Must contain both lower and upper case characters');
            animateField('pass');
        } else {
            displaySuccess('Form submitted successfully');
            // Uncomment the line below to submit the form
            // event.target.submit();
        }
    }
}

function displayError(message) {
    var passwordError = document.getElementById('passwordError');
    passwordError.innerHTML = message;
}

function displaySuccess(message) {
    var successMessage = document.getElementById('successMessage');
    successMessage.innerHTML = message;
}

function animateField(fieldId) {
    document.getElementById(fieldId).classList.add('shake');
}


