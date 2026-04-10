document.addEventListener("DOMContentLoaded", function () {
  setupNavbar();
  showOnScroll();
  setupForum();
  setupContactForm();
});

function setupNavbar() {
  const menuBtn = document.querySelector(".menu-btn");
  const navMenu = document.querySelector(".nav-items");

  if (!menuBtn || !navMenu) return;

  menuBtn.addEventListener("click", function () {
    navMenu.classList.toggle("active");
  });

  navMenu.addEventListener("click", function (e) {
    if (e.target.tagName === "A") {
      navMenu.classList.remove("active");
    }
  });
}

function showOnScroll() {
  const items = document.querySelectorAll(
    ".fade-up, .product-card, .forum-card, .store-card, .hero-img"
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((box) => {
        if (box.isIntersecting) {
          box.target.classList.add("show");
          observer.unobserve(box.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  items.forEach((el) => observer.observe(el));
}

function setupForum() {
  const forumBox = document.getElementById("forum-posts");
  const filterButtons = document.querySelectorAll(".category-tag");

  if (!forumBox) return;

  // daftar post
  const posts = [
    {
      username: "indra_fly",
      title: "Neo 2 is shaking a bit when hovering, is this normal?",
      description:
        "Bought Neo 2 last week, drifting a bit indoors. Anyone else experiencing this?",
      views: 1280,
      likes: 210,
      shares: 31,
      category: "tips",
    },
    {
      username: "lenscraft",
      title: "Camera settings for Maxic 4 Pro outdoor photos",
      description: "ISO & shutter suggestions for outdoor sunlight?",
      views: 830,
      likes: 122,
      shares: 18,
      category: "photography",
    },
    {
      username: "fixit_center",
      title: "Mini AIR suddenly disconnected at 30 meters",
      description: "Lost signal briefly. Happened to anyone?",
      views: 642,
      likes: 53,
      shares: 6,
      category: "support",
    },
    {
      username: "jci_team",
      title: "New Update: Avatar 2 gets a lite stabilizer mode",
      description: "Low-speed smoother stabilizer update for Avatar 2.",
      views: 1980,
      likes: 410,
      shares: 115,
      category: "news",
    },
    {
      username: "naya_room",
      title: "FLIPS is great for indoor practice!",
      description: "Just tried FLIPS, any simple trick recommendations?",
      views: 512,
      likes: 70,
      shares: 12,
      category: "tips",
    },
    {
      username: "mapping_id",
      title: "Is Vertex V2 suitable for farm mapping?",
      description: "Looking for experience using V2 for wide farm mapping.",
      views: 740,
      likes: 82,
      shares: 16,
      category: "support",
    },
  ];

  function renderPosts(category) {
    forumBox.innerHTML = "";

    let selected =
      category === "all" ? posts : posts.filter((p) => p.category === category);

    if (selected.length === 0) {
      forumBox.innerHTML = "<p>No posts yet in this category.</p>";
      return;
    }

    selected.forEach((post) => {
      const card = document.createElement("article");
      card.className = "forum-card";

      const firstLetter = post.username[0].toUpperCase();

      card.innerHTML = `
        <div class="forum-header">
          <div class="forum-avatar">${firstLetter}</div>
          <div class="forum-userinfo">
            <span class="forum-username">${post.username}</span>
            <span class="forum-category">${post.category.toUpperCase()}</span>
          </div>
        </div>

        <h3 class="forum-title">${post.title}</h3>
        <p class="forum-desc">${post.description}</p>
        <hr class="forum-divider">

        <div class="forum-stats">
          <span>👁️ ${post.views}</span>
          <span>❤️ ${post.likes}</span>
          <span>🔁 ${post.shares}</span>
          <span>💬 ${Math.floor(post.likes / 2)} replies</span>
        </div>
      `;

      forumBox.appendChild(card);
    });

    showOnScroll();
  }

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      filterButtons.forEach((b) => b.classList.remove("active"));
      this.classList.add("active");

      const category = this.getAttribute("data-category");
      renderPosts(category);
    });
  });

  renderPosts("all");
}

function setupContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const phoneInput = document.getElementById("phone");
  const messageInput = document.getElementById("message");
  const termsInput = document.getElementById("terms");

  const errName = document.getElementById("nameError");
  const errEmail = document.getElementById("emailError");
  const errPhone = document.getElementById("phoneError");
  const errMsg = document.getElementById("messageError");
  const errTerms = document.getElementById("termsError");

  function isNumber(text) {
    if (text === "") return false;
    for (let i = 0; i < text.length; i++) {
      if (text[i] < "0" || text[i] > "9") return false;
    }
    return true;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    errName.textContent = "";
    errEmail.textContent = "";
    errPhone.textContent = "";
    errMsg.textContent = "";
    errTerms.textContent = "";

    nameInput.classList.remove("input-error");
    emailInput.classList.remove("input-error");
    phoneInput.classList.remove("input-error");
    messageInput.classList.remove("input-error");

    let success = true;

    // Name
    if (nameInput.value.trim() === "") {
      errName.textContent = "Name cannot be empty.";
      nameInput.classList.add("input-error");
      success = false;
    }

    // Email
    const emailVal = emailInput.value.trim();
    if (emailVal === "") {
      errEmail.textContent = "Email cannot be empty.";
      emailInput.classList.add("input-error");
      success = false;
    } else if (!emailVal.includes("@") || !emailVal.includes(".")) {
      errEmail.textContent = "Email must contain '@' and '.'.";
      emailInput.classList.add("input-error");
      success = false;
    }

    const phoneVal = phoneInput.value.trim();
    if (phoneVal === "") {
      errPhone.textContent = "Phone cannot be empty.";
      phoneInput.classList.add("input-error");
      success = false;
    } else if (!isNumber(phoneVal)) {
      errPhone.textContent = "Phone must be numbers only.";
      phoneInput.classList.add("input-error");
      success = false;
    } else if (phoneVal.length < 10) {
      errPhone.textContent = "Phone must be at least 10 digits.";
      phoneInput.classList.add("input-error");
      success = false;
    }

    if (messageInput.value.trim() === "") {
      errMsg.textContent = "Message cannot be empty.";
      messageInput.classList.add("input-error");
      success = false;
    }

    // Terms
    if (!termsInput.checked) {
      errTerms.textContent = "You must agree before sending.";
      success = false;
    }

    if (success) {
      alert("Your message has been sent!");
      form.reset();
    }
  });
}
