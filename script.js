// Initialize Firebase
var firebaseConfig = {
    // Your Firebase config object
  };
  firebase.initializeApp(firebaseConfig);
  
  // Handle sign-in form submission
var signInForm = document.getElementById('signInForm');
signInForm.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent form submission

  var username = document.getElementById('username').value;
  var password = document.getElementById('password').value;

  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL) // Set persistence type
    .then(function() {
      return firebase.auth().signInWithEmailAndPassword(username, password);
    })
    .then(function(userCredential) {
      // Sign-in successful
      var user = userCredential.user;
      console.log('User signed in:', user);
      // Redirect or perform other actions
    })
    .catch(function(error) {
      // Handle sign-in errors
      var errorCode = error.code;
      var errorMessage = error.message;
      console.error('Sign-in error:', errorCode, errorMessage);
      // Display error message to the user
    });
});





// Function to fetch user information from Firebase
function fetchUserInfo(userId) {
  return firebase.database().ref('users/' + userId).once('value').then(snapshot => {
      return snapshot.val();
  });
}

// Function to render user profile page
function renderUserProfile(userId) {
  fetchUserInfo(userId).then(userInfo => {
      // Replace placeholders with user information
      const username = userInfo.username;
      const profilePicture = userInfo.profilePicture;
      const bio = userInfo.bio;

      // Update HTML elements with user information
      document.getElementById('username').innerText = username;
      document.getElementById('profile-picture').src = profilePicture;
      document.getElementById('bio').innerText = bio;
  });
}

// Assume userId is obtained from Firebase Authentication
const userId = 'user123'; // Replace with actual user ID
renderUserProfile(userId);
