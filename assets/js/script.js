// ===== Landing Page Script =====
// Future JS logic can go here (for animations, or redirect if user already logged in)

// Example: Auto redirect if user is already authenticated
document.addEventListener("DOMContentLoaded", () => {
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
        window.location.href = "../pages/dashboard.html"; // redirect to dashboard if logged in
    }
});
