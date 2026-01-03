// register.js - For FREE workshop registration
document.addEventListener('DOMContentLoaded', function() {
  var button = document.getElementById("checkout-btn");
  
  button.addEventListener("click", function (e) {
    e.preventDefault();

    // Form validation
    let name = document.getElementById("nameField").value;
    let email = document.querySelector('input[name="emailField"]').value;
    
    if (!name || !email) {
      alert("Please fill all required fields!");
      return false;
    }
    
    // You can send this data to your backend to save
    const formData = {
      name: name,
      email: email,
      workshop: document.querySelector('h1').textContent
    };
    
    // Optional: Send to backend to save registration
    // fetch('/save-registration', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(formData)
    // });
    
    // Show success message and redirect
    alert("✅ Registration Successful!");
    window.location.href = "../success.html";
  });
});