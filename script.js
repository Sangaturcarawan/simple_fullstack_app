const mockUsers = [
  { email: "test@example.com", password: "123456" },
  { email: "user@example.com", password: "password" },
];

document.addEventListener("DOMContentLoaded", () => {
  const logInForm = document.getElementById("logInForm");
  const logOutBtn = document.getElementById("logOutBtn");

  if (logInForm) {
    logInForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const message = document.getElementById("message");

      const user = mockUsers.find(
        (u) => u.email === email && u.password === password
      );

      if (user) {
        localStorage.setItem("loggedInUser", JSON.stringify(user));
        window.location.href = "dashboard.html";
      } else {
        message.textContent = "Invalid email or password!";
        message.style.color = "red";
      }
    });
  }

  if (logOutBtn) {
    logOutBtn.addEventListener("click", () => {
      localStorage.removeItem("loggedInUser");
      window.location.href = "index.html";
    });
  }

  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  if (window.location.pathname.includes("dashboard.html")) {
    if (!user) {
      window.location.href = "index.html";
    } else {
      document.getElementById(
        "userEmail"
      ).textContent = `Logged in as: ${user.email}`;
    }
  }
});
