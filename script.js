// ===== Hamburger Menu =====
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('site-nav');

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      nav.classList.toggle('open');
    });
  }

  // ===== Active Link =====
  const links = document.querySelectorAll('#site-nav a');
  const path = location.pathname.split('/').pop() || 'index.html';

  links.forEach(a => {
    if (a.getAttribute('href') === path) {
      a.classList.add('active');
    }
  });

  // ============================================================
  // ✅ NEW: Multiple Choice Checking System (Separate)
  // ============================================================

  function checkMCQ(sectionSelector, scoreSelector) {
    const groups = document.querySelectorAll(sectionSelector + " [data-quiz]");
    let correctCount = 0;
    let total = groups.length;

    groups.forEach(group => {
      const correct = group.dataset.answer.toLowerCase();
      const result = group.querySelector(".result");

      // Supports both multiple-choice (radio) and fill-in-the-blank (text) questions
      const selectedRadio = group.querySelector('input[type="radio"]:checked');
      const textInput = group.querySelector('input[type="text"]');
      const userAnswer = selectedRadio ? selectedRadio.value : (textInput ? textInput.value.trim() : null);

      if (!userAnswer) {
        result.textContent = "Please choose an answer";
        result.style.color = "#F59E0B";
        return;
      }

      if (userAnswer.toLowerCase() === correct) {
        correctCount++;
        result.textContent = "Correct! ✅";
        result.style.color = "#10B981";
      } else {
        result.textContent = `Incorrect ❌ (Correct answer: ${correct})`;
        result.style.color = "#EF4444";
      }
    });

    const scoreBox = document.querySelector(scoreSelector);
    if (scoreBox) {
      scoreBox.textContent = `Score: ${correctCount}/${total}`;
      scoreBox.style.fontWeight = "bold";
      scoreBox.style.marginTop = "10px";
    }
  }

  // ✅ Vocabulary button
  document.getElementById("check-vocab")?.addEventListener("click", () => {
    checkMCQ("#vocab-exercises", "#vocab-score");
  });

  // ✅ Grammar button
  document.getElementById("check-grammar")?.addEventListener("click", () => {
    checkMCQ("#grammar-exercises", "#grammar-score");
  });

  // ============================================================
  // ===== Activities Rendering (Conversation + Reading)
  // ============================================================

  const conversationPool = [
    { text: "Ask for directions to a place in school.", img: "assets/images/conv-c1.jpg" },
    { text: "Make weekend plans with a friend.", img: "assets/images/conv-c2.jpg" },
    { text: "Order food in a restaurant.", img: "assets/images/conv-c3.jpg" },
    { text: "Buy a drink at a café.", img: "assets/images/conv-c4.jpg" },
    { text: "Ask someone about their hobbies.", img: "assets/images/conv-c5.jpg" },
    { text: "Talk about your favorite subject.", img: "assets/images/conv-c6.jpg" },
    { text: "Ask a friend for help with homework.", img: "assets/images/conv-c7.jpg" },
    { text: "Make a phone call to a classmate.", img: "assets/images/conv-c8.jpg" },
    { text: "Ask about the weather.", img: "assets/images/conv-c9.jpg" },
    { text: "Talk about your morning routine.", img: "assets/images/conv-c10.jpg" }
  ];

  const readingPool = [
    { text: "Read a paragraph and find the main idea.", icon: "📘" },
    { text: "Identify the speakers in a dialogue.", icon: "🗣️" },
    { text: "Find where the story takes place.", icon: "📍" },
    { text: "Find 3 new vocabulary words.", icon: "📝" },
    { text: "Summarize a paragraph in one sentence.", icon: "✍️" },
    { text: "Identify details in a description.", icon: "🔍" },
    { text: "Read a schedule and answer questions.", icon: "📅" },
    { text: "Read a menu and choose what to order.", icon: "🍽️" },
    { text: "Read a map and locate a place.", icon: "🗺️" },
    { text: "Read a message and identify the purpose.", icon: "💬" }
  ];

  function pickFive(arr) {
    return arr.sort(() => Math.random() - 0.5).slice(0, 5);
  }

  function renderActivities() {
    const convBox = document.getElementById("conversation-container");
    const readBox = document.getElementById("reading-container");

    if (convBox) {
      convBox.innerHTML = "";
      pickFive(conversationPool).forEach(item => {
        convBox.innerHTML += `
          <div class="activity-card">
            <img src="${item.img}" alt="">
            <p>${item.text}</p>
          </div>`;
      });
    }

    if (readBox) {
      readBox.innerHTML = "";
      pickFive(readingPool).forEach(item => {
        readBox.innerHTML += `
          <div class="activity-card reading-card">
            <div class="icon">${item.icon}</div>
            <p>${item.text}</p>
          </div>`;
      });
    }
  }

  renderActivities();
});