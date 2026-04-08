function showMessage(message, type) {
    const messageBox = document.getElementById("message-box");
    messageBox.textContent = message;
    messageBox.className = "message-box " + type; 
    messageBox.classList.add("show");

    setTimeout(() => {
        messageBox.classList.remove("show");
    }, 4000);
}

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("login-form");

    form.addEventListener("submit", async function (e) {
        e.preventDefault();

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;

        let formData = new FormData();
        formData.append("email", email);
        formData.append("password", password);

        try {
            const response = await fetch("http://localhost/web/login.php", {
                method: "POST",
                body: formData
            });

            const data = await response.json();

            if (data.success) {
                showMessage(data.message, "success");

                setTimeout(() => {
                    window.location.href = "main.html";
                }, 1500);
            } else {
                showMessage(data.error || "Sai email hoặc mật khẩu", "error");
            }
        } catch (error) {
            console.error("Login error:", error);
            showMessage("Không thể kết nối đến server", "error");
        }
    });
});
const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");

  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
      mainNav.classList.toggle("show");
    });

    document.querySelectorAll("#mainNav a").forEach(link => {
      link.addEventListener("click", () => {
        mainNav.classList.remove("show");
      });
    });
  }
