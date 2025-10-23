async function getUsers() {
  try {
    const response = await fetch("users.json");
    if (!response.ok) throw new Error("Failed to fetch users");
    const users = await response.json();
    return users;
  } catch (err) {
    console.error(err);
    return [];
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const logInForm = document.getElementById("logInForm");
  const logOutBtn = document.getElementById("logOutBtn");

  if (logInForm) {
    logInForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const message = document.getElementById("message");

      const users = await getUsers();
      const user = users.find(
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
