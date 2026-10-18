// ===== LOGIN LOGIC =====

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim().toLowerCase();
    const password = document.getElementById("password").value.trim();

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const validUser = users.find(u => u.email === email && u.password === password);

    if (!validUser) {
      alert("Invalid email or password!");
      return;
    }

    // Save the logged-in user session
    localStorage.setItem("currentUser", JSON.stringify(validUser));

    alert(`Welcome back, ${validUser.name}!`);
    window.location.href = "../pages/dashboard.html"; // redirect to main dashboard
  });
});
