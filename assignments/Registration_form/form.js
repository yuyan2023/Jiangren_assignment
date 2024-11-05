document.addEventListener('DOMContentLoaded', function() {
    const submitButton = document.querySelector('#submit');

    // Add hover effect to submit button
    submitButton.addEventListener('mouseover', function() {
        submitButton.style.backgroundColor = '#4CAF50';
    });

    submitButton.addEventListener('mouseout', function() {
        submitButton.style.backgroundColor = '';
    });

    // Form validation
    const form = document.querySelector('#registrationForm');
    form.addEventListener('submit', function(event) {
        if (!form.checkValidity()) {
            event.preventDefault();
            alert('Please fill out all required fields correctly.');
        }
    });
});