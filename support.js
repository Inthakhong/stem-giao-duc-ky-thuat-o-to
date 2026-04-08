

const supportWidgetHTML = `

<div id="support-widget">

    <button id="chat-toggle-btn">💬</button>



    <div id="chat-window">

        <div class="chat-header">Trợ lý STEM Ô tô</div>



        <div class="chat-body" id="chat-body"></div>



        <div class="chat-input-area">

            <input type="text" id="chat-input" placeholder="Nhập tin nhắn...">

            <button id="chat-send-btn">➤</button>

        </div>

    </div>

</div>

`;



const BOT_AVATAR = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPKk7F7yBjzADqb0qVxDpeJqxMg8bPlocjog&s";  

const USER_AVATAR = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTI8lWiqQYX242qRZogw9O7o3qqEufrN1hu7w&s";




const questions = [

    { id: 'age', text: '1. Chương trình STEM dành cho độ tuổi nào?', answer: 'Chương trình STEM dành cho độ tuổi từ 11 đến 18 tuổi.' },

    { id: 'prereq', text: '2. Tôi có cần kiến thức nền về Ô tô không?', answer: 'Không cần. Bạn có thể bắt đầu từ cơ bản.' },

    { id: 'cost', text: '3. Chi phí tham gia là bao nhiêu?', answer: 'Chi phí tùy thuộc vào từng dự án.' },

    { id: 'signup', text: '4. Làm thế nào để đăng ký?', action: 'signup' },

    { id: 'other', text: 'Khác.', action: 'showContactForm' },

    { id: 'end', text: 'Kết thúc trò chuyện', action: 'endChat' },

];



function addMessage(role, html) {

    const wrap = document.createElement("div");

    wrap.className = `message-wrapper ${role}`;



    const avatar = document.createElement("img");

    avatar.className = "avatar";

    avatar.src = role === "user" ? USER_AVATAR : BOT_AVATAR;



    const bubble = document.createElement("div");

    bubble.className = "message-bubble";

    bubble.innerHTML = html;



    wrap.appendChild(avatar);

    wrap.appendChild(bubble);



    document.getElementById("chat-body").appendChild(wrap);

    scrollBottom();

}



function bot(text) {

    addMessage("bot", `<div class="bot-message"><strong>Assistant:</strong> ${text}</div>`);

}



function user(text) {

    addMessage("user", `<div class="user-message"><strong>You:</strong> ${text}</div>`);

}



function scrollBottom() {

    const body = document.getElementById("chat-body");

    body.scrollTop = body.scrollHeight;

}




function appendMenuOptions() {

    const body = document.getElementById("chat-body");

    

    const existingMenu = body.querySelector('.chat-interactive-options');

    if (existingMenu) existingMenu.remove();



    const list = document.createElement("div");

    list.className = "chat-interactive-options";



    questions.forEach(q => {

        const b = document.createElement("button");

        b.className = "chat-option-btn";

        b.textContent = q.text;

        b.onclick = () => handleSelect(q);

        list.appendChild(b);

    });



    body.appendChild(list);

    scrollBottom();

}



function renderMenu(isInitial = true) {

    const body = document.getElementById("chat-body");

    

    if (isInitial) {

        body.innerHTML = "";

    } else {

        const existingMenu = body.querySelector('.chat-interactive-options');

        if (existingMenu) existingMenu.remove();

    }

    

    bot("Chào bạn! Chúng tôi có thể giúp gì cho bạn?");



    appendMenuOptions();

}



function handleSelect(q) {


    const body = document.getElementById("chat-body");

    const existingMenu = body.querySelector('.chat-interactive-options');

    if (existingMenu) existingMenu.remove();



    user(q.text);



    if (q.action === "signup") {

        bot(`

            Để đăng ký, vui lòng nhấn vào đây:<br>

            <a href="signup.html" class="chat-response-link">TỚI TRANG ĐĂNG KÝ</a>

        `);

    } else if (q.action === "endChat") {

        bot("Cảm ơn bạn đã sử dụng dịch vụ hỗ trợ của chúng tôi. Chúc bạn một ngày tốt lành!");


        setTimeout(() => {

            document.getElementById("chat-window").classList.remove("open");

            document.getElementById("chat-toggle-btn").innerHTML = "💬";

            renderMenu(true); 

        }, 3000);

        return; 

    } else if (q.action === "showContactForm") {


        bot(`

            Với các câu hỏi chi tiết hơn, vui lòng điền vào Form Liên hệ chính thức của chúng tôi để nhận được phản hồi từ chuyên gia:<br>

            <a href="#contact" onclick="window.closeChatAndScroll('#contact')" class="chat-response-link">ĐI TỚI FORM LIÊN HỆ</a>

        `);

    } else {

        bot(q.answer);

    }


    if (q.action !== "endChat" && q.action !== "showContactForm") {

        setTimeout(() => {

            bot("Bạn còn thắc mắc gì nữa không?"); 

            renderMenu(false); 

        }, 800); 

    }



    scrollBottom(); 

}



function handleUserInput() {

    const input = document.getElementById("chat-input");

    const text = input.value.trim();

    if (!text) return;


    const body = document.getElementById("chat-body");

    const existingMenu = body.querySelector('.chat-interactive-options');

    if (existingMenu) existingMenu.remove();



    user(text);

    input.value = "";



    setTimeout(() => {

        bot(`

            Cảm ơn bạn đã đặt câu hỏi. Do đây là câu hỏi ngoài danh sách FAQ, vui lòng điền chi tiết vào Form Liên hệ chính thức để đội ngũ hỗ trợ phản hồi bạn sớm nhất:<br>

            <a href="#contact" onclick="window.closeChatAndScroll('#contact')" class="chat-response-link">ĐI TỚI FORM LIÊN HỆ</a>

        `);


        body.innerHTML += '<button class="chat-option-btn" onclick="handleSelect({action: \'endChat\', text: \'Kết thúc trò chuyện\'})">✖ Kết thúc cuộc trò chuyện</button>';



    }, 800); 



    scrollBottom();

}



window.closeChatAndScroll = function(targetSelector) {

    document.getElementById("chat-window").classList.remove("open");

    document.getElementById("chat-toggle-btn").innerHTML = "💬";

    

    document.querySelector(targetSelector).scrollIntoView({

        behavior: "smooth"

    });

    

    renderMenu(true);

}





function initChat() {

    document.body.insertAdjacentHTML("beforeend", supportWidgetHTML);



    const toggle = document.getElementById("chat-toggle-btn");

    const win = document.getElementById("chat-window");



    toggle.onclick = () => {

        win.classList.toggle("open");

        toggle.innerHTML = win.classList.contains("open") ? "✖" : "💬";



        if (win.classList.contains("open")) {
            renderMenu(true);

        }

    };



    document.getElementById("chat-send-btn").onclick = handleUserInput;
    document.addEventListener("keydown", e => {
        if (e.key === "Enter" && document.getElementById("chat-window").classList.contains("open")) {
            handleUserInput();
            e.preventDefault(); 

        }

    });

}



document.addEventListener("DOMContentLoaded", initChat);