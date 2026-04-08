let questions = [];
let currentQuestion = 0;
let score = 0;
let timerInterval;
let timeLeft = 30;


const questionEl = document.getElementById("question");
const choicesEl = document.getElementById("choices");
const nextBtn = document.getElementById("nextBtn");
const timerEl = document.getElementById("timer");
const resultEl = document.getElementById("result");


const backBtn = document.getElementById('backBtn');
const historyBtn = document.getElementById('historyBtn');
const historyArea = document.getElementById('historyArea');
const historyList = document.getElementById('historyList');
const clearHistoryBtn = document.getElementById('clearHistoryBtn');
const timerContainer = document.querySelector(".timer"); 


fetch("get_questions.php")
  .then(res => res.json())
  .then(data => {
    questions = data;
    loadQuestion();
  })
  .catch(error => {
    console.error("Lỗi khi tải câu hỏi:", error);
    questionEl.textContent = "Lỗi tải câu hỏi. Vui lòng thử lại sau.";
  });

function startTimer() {
  clearInterval(timerInterval);
  timeLeft = 30;
  timerEl.textContent = timeLeft;
  timerInterval = setInterval(() => {
    timeLeft--;
    timerEl.textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      nextQuestion();
    }
  }, 1000);
}

function loadQuestion() {
  historyArea.style.display = 'none'; 
  
  const q = questions[currentQuestion];
  questionEl.textContent = q.question_text;
  choicesEl.innerHTML = "";

  questionEl.style.display = "block";
  choicesEl.style.display = "block";
  nextBtn.style.display = "block";
  timerContainer.style.display = "block";
  resultEl.style.display = "none";
  
  document.querySelector(".action-buttons").style.display = "flex"; 

  q.answers.forEach((ans) => {
    const div = document.createElement("div");
    div.className = "choice";
    div.textContent = ans.answer_text;
    div.onclick = () => selectAnswer(ans.is_correct, div);
    choicesEl.appendChild(div);
  });

  startTimer();
}

function selectAnswer(isCorrect, div) {
  clearInterval(timerInterval); 
  
  const choiceDivs = document.querySelectorAll(".choice");
  choiceDivs.forEach((el) => {
    el.style.pointerEvents = "none";
  });

  if (isCorrect == 1) {
    div.classList.add("correct");
    score++;
  } else {
    div.classList.add("wrong");
    
    const correctAnswerDiv = Array.from(choiceDivs).find(
        (el, index) => questions[currentQuestion].answers[index].is_correct == 1
    );
    if (correctAnswerDiv) {
        correctAnswerDiv.classList.add("correct");
    }
  }
}

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    showResult();
  }
}


/**
 * Lưu kết quả Quiz vào Local Storage.
 * @param {number} score - Điểm số đạt được.
 * @param {number} totalQuestions - Tổng số câu hỏi.
 */
function saveHistory(score, totalQuestions) {
    const history = JSON.parse(localStorage.getItem('quizHistory')) || [];
    const now = new Date();
    
    const newRecord = {
        date: now.toLocaleDateString('vi-VN'),
        time: now.toLocaleTimeString('vi-VN'),
        score: score,
        total: totalQuestions,
        result: `${score}/${totalQuestions}`
    };

    history.push(newRecord);
    localStorage.setItem('quizHistory', JSON.stringify(history));
}

function showResult() {
  clearInterval(timerInterval);
  
  timerContainer.style.display = "none";
  questionEl.style.display = "none";
  choicesEl.style.display = "none";
  nextBtn.style.display = "none";
  
  resultEl.style.display = "block";
  resultEl.textContent = `🎉 Bạn đã hoàn thành Quiz! Điểm của bạn: ${score}/${questions.length} câu đúng.`;
  
  saveHistory(score, questions.length); 
}


function renderHistory() {
    const history = JSON.parse(localStorage.getItem('quizHistory')) || [];
    historyList.innerHTML = ''; 

    if (history.length === 0) {
        historyList.innerHTML = '<li>Chưa có lịch sử làm Quiz nào được ghi nhận.</li>';
        return;
    }

    history.slice().reverse().forEach((record, index) => {
        const listItem = document.createElement('li');
        const statusClass = record.score >= record.total / 2 ? 'pass' : 'fail'; 
        
        listItem.innerHTML = `
            <span>#${history.length - index} | Ngày: ${record.date} ${record.time}</span> 
            <strong class="${statusClass}">Điểm: ${record.result}</strong>
        `;
        historyList.appendChild(listItem);
    });
}



nextBtn.addEventListener("click", nextQuestion);

backBtn.addEventListener('click', () => {
    clearInterval(timerInterval);
    window.location.href = 'main.html'; 
});

historyBtn.addEventListener('click', () => {
    questionEl.style.display = "none";
    choicesEl.style.display = "none";
    nextBtn.style.display = "none";
    timerContainer.style.display = "none";
    resultEl.style.display = "none";
    

    if (historyArea.style.display === 'block') {

        historyArea.style.display = 'none';
        historyBtn.textContent = '⏳ LỊCH SỬ QUIZ';

        currentQuestion = 0;
        score = 0;
        loadQuestion();
    } else {
        renderHistory();
        historyArea.style.display = 'block';
        historyBtn.textContent = '❌ QUAY LẠI QUIZ';
    }
});


clearHistoryBtn.addEventListener('click', () => {
    if (confirm("Bạn có chắc chắn muốn xóa toàn bộ lịch sử làm Quiz không?")) {
        localStorage.removeItem('quizHistory');
        renderHistory(); 
    }
});