function submitExercise() {
    var exerciseInput = document.getElementById('exerciseInput').value;
    if (exerciseInput) {
        // Get the instance of the Google auth library
        var googleAuth = gapi.auth2.getAuthInstance();
        
        // Check if the user is signed in
        if (googleAuth.isSignedIn.get()) {
            // Get the ID token of the signed-in user
            var idToken = googleAuth.currentUser.get().getAuthResponse().id_token;
            
            // Cloud function URL
            var cloudFunctionUrl = 'https://us-west3-work-out-sheet-with-shetty.cloudfunctions.net/workoutSheetUpdater';

            // Make the POST request with the exercise data and the ID token
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
                    throw new Error('Network response was not ok: ' + response.statusText);
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
            document.getElementById('responseMessage').innerText = 'Please sign in to log your exercise.';
        }
    } else {
        document.getElementById('responseMessage').innerText = 'Please enter an exercise.';
    }
}

