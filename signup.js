function showMessage(message, type) {
    const messageBox = document.getElementById("message-box");
    
    messageBox.textContent = message;
    messageBox.className = "message-box " + type; 


    messageBox.classList.add("show");
    setTimeout(() => {
        hideMessage(); 
    }, 5000);
}


function hideMessage() {
    const messageBox = document.getElementById("message-box");
    messageBox.classList.remove("show");
}


function validatePassword(password, confirmPassword) {
    if (password !== confirmPassword) {
        return "Mật khẩu và xác nhận mật khẩu không khớp!";
    }

    if (password.length < 8) {
        return "Mật khẩu phải có ít nhất 8 ký tự!";
    }

    const regex = /^(?=.*[a-zA-Z])(?=.*\d).+$/;
    if (!regex.test(password)) {
        return "Mật khẩu phải chứa ít nhất một chữ cái và một số!";
    }

    const specialCharRegex = /[^a-zA-Z0-9]/;
    if (!specialCharRegex.test(password)) {
        return "Mật khẩu phải chứa ít nhất một ký tự đặc biệt!";
    }

    return null; 
}


document.getElementById("register-form").addEventListener("submit", async function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    const passwordMessage = validatePassword(password, confirmPassword);

    if (passwordMessage) {
        showMessage(passwordMessage, "error");
    } else {
        let formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("password", password);

        try {
    let res = await fetch("http://localhost/web/register.php", {
        method: "POST",
        body: formData
    });

    let data = await res.json();

    if (data.success) {
        showMessage(data.message, "success");
        setTimeout(() => {
            window.location.href = "login.html";
        }, 2000);
    } else {
        showMessage(data.message, "error");
    }
} catch (err) {
    showMessage("Có lỗi kết nối server!", "error");
    console.error(err);
}

    }
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