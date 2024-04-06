function submitExercise() {
    var exerciseInput = document.getElementById('exerciseInput').value;
    if (exerciseInput) {
        // Assuming you have a cloud function URL and a method to generate an ID token
        var cloudFunctionUrl = 'YOUR_CLOUD_FUNCTION_URL';
        var idToken = 'YOUR_IDENTITY_TOKEN';

        fetch(cloudFunctionUrl, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + idToken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ exercise: exerciseInput })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            document.getElementById('responseMessage').innerText = 'Exercise logged successfully!';
            console.log(data);
        })
        .catch(error => {
            document.getElementById('responseMessage').innerText = 'Error logging exercise.';
            console.error('There has been a problem with your fetch operation:', error);
        });
    } else {
        document.getElementById('responseMessage').innerText = 'Please enter an exercise.';
    }
}
