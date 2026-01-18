// Parallax scrolling - home
const background = document.querySelector(".home__background");
const gradient = document.querySelector(".home__background--gradient");
const header = document.querySelector(".home__background--header");
const moreBtn = document.querySelector(".home__background--more");

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;

  // Parallax effect: image moves slower
  background.style.backgroundPosition = `center ${scrollY * 0.5}px`;

  // Fade gradient
  if (gradient) {
    gradient.style.opacity = Math.max(1 - scrollY / 300, 0);
  }

  // Fade header and "more" button
  const fadeValue = Math.max(1 - scrollY / 200, 0);
  if (header) header.style.opacity = fadeValue;
  if (moreBtn) moreBtn.style.opacity = fadeValue;

  // Slight upward slide
  if (header) header.style.transform = `translateY(-${scrollY * 0.5}px)`;
  if (moreBtn) moreBtn.style.transform = `translateY(-${scrollY * 0.2}px)`;
});

// Parallax scrolling - About
const aboutBg = document.querySelector(".about__background");
const aboutImg = document.querySelector(".about__background--img");

window.addEventListener("scroll", () => {
  const rect = aboutBg.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  if (rect.bottom > 0 && rect.top < windowHeight) {
    const progress = (windowHeight - rect.top) / (windowHeight + rect.height);
    const translateY = Math.max(Math.min(progress * 40, 40), 0);

    aboutImg.style.transform = `translateY(-${translateY}%)`;
  }
});

// Transition for Services
document.addEventListener("DOMContentLoaded", () => {
  const rows = document.querySelectorAll(".service__box--row");

  // Use IntersectionObserver to trigger when section is visible
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          rows.forEach((row, index) => {
            setTimeout(() => {
              row.classList.add("visible");
            }, index * 200); // stagger by 200ms
          });
          observer.disconnect(); // run only once
        }
      });
    },
    { threshold: 0.2 }
  );

  observer.observe(document.querySelector("#service"));
});

// Gallery slider
const galleryLeftArrow = document.querySelector(".gallery__box--arr--left");
const galleryRightArrow = document.querySelector(".gallery__box--arr--right");
const galleryTrack = document.querySelector(".gallery__box--fig--track");

const totalGalleryImgs = galleryTrack.children.length;
let currentGalleryIndex = 3;

function moveGallerySlides() {
  const imgWidth = 504;
  const offset = currentGalleryIndex * imgWidth * -1;
  galleryTrack.style.transform = `translateX(${offset}px)`;
}

function displayArrows() {
  galleryLeftArrow.style.display = "block";
  galleryRightArrow.style.display = "block";
}

galleryLeftArrow.addEventListener("click", (e) => {
  e.preventDefault();
  displayArrows();
  if (currentGalleryIndex > 0) {
    currentGalleryIndex--;
    moveGallerySlides();

    if (currentGalleryIndex === 0) {
      galleryLeftArrow.style.display = "none";
    }
  }
});

galleryRightArrow.addEventListener("click", (e) => {
  e.preventDefault();
  displayArrows();
  if (currentGalleryIndex < totalGalleryImgs - 2) {
    // show 2 at a time
    currentGalleryIndex++;
    moveGallerySlides();

    if (currentGalleryIndex === totalGalleryImgs - 2) {
      galleryRightArrow.style.display = "none";
    }
  }
});

// Accordion
const faqNos = document.querySelectorAll(".faqs__accordion--no");
const faqRows = document.querySelectorAll(".faqs__accordion--no--row");

const addFaqBtn = document.querySelectorAll(
  ".faqs__accordion--no--btn--icon--add"
);
const removeFaqBtn = document.querySelectorAll(
  ".faqs__accordion--no--btn--icon--remove"
);

addFaqBtn.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const addIcon = e.currentTarget;

    const removeIcon = addIcon
      .closest(".faqs__accordion--no--btn")
      .querySelector(".faqs__accordion--no--btn--icon--remove");

    const line = addIcon.closest(".faqs__accordion--no");
    const row = line.querySelector(".faqs__accordion--no--ans");

    console.log(row, line);

    addIcon.classList.add("faqs__accordion--no--btn--icon--hide");
    removeIcon.classList.remove("faqs__accordion--no--btn--icon--hide");
    row.classList.remove("faqs__accordion--no--ans--hide");
    line.classList.remove("faqs__accordion--no--hide");
  });
});

removeFaqBtn.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const removeIcon = e.currentTarget;

    const addIcon = removeIcon
      .closest(".faqs__accordion--no--btn")
      .querySelector(".faqs__accordion--no--btn--icon--add");

    const line = removeIcon.closest(".faqs__accordion--no");
    const row = line.querySelector(".faqs__accordion--no--ans");

    removeIcon.classList.add("faqs__accordion--no--btn--icon--hide");
    addIcon.classList.remove("faqs__accordion--no--btn--icon--hide");
    row.classList.add("faqs__accordion--no--ans--hide");
    line.classList.add("faqs__accordion--no--hide");
  });
});

// Revealing sections
// Revealing sections
const revealSections = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  entry.target.classList.remove("section-hide");
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSections, {
  root: null,
  threshold: 0.15,
});

const allSections = document.querySelectorAll(".container");

// Just observe — don't add the hidden class here
allSections.forEach(function (section) {
  sectionObserver.observe(section);
});

// Toggle Navigation Menu
const navMenu = document.querySelector(".home__nav--menu");
const listMenu = document.querySelector(".home__nav--list");

navMenu.addEventListener("click", () => {
  if (listMenu.style.display === "flex") {
    listMenu.style.display = "none";
  } else {
    listMenu.style.display = "flex";
    listMenu.style.flexDirection = "column";
  }
});

// Login Form
const sectionMain = document.getElementById("main");
const sectionLogin = document.getElementById("login");
const loginForm = document.querySelector(".login__form");

const loginBtnSend = document.querySelector(".login__form--cmd--btn--send");
const loginBtnClear = document.querySelector(".login__form--cmd--btn--clear");
const loginInputId = document.getElementById("user-id");
const loginInputPw = document.getElementById("user-pw");

const userId = "KSGEC";
const userPw = "211";

const successfulLogin = function () {
  if (
    (loginInputId.value === userId && loginInputPw.value === userPw) ||
    str(loginInputPw.value) === userPw
  ) {
    sectionLogin.style.display = "none";
    sectionMain.style.display = "block";
  } else {
    alert("Incorrect Id / Password");
  }
};

loginForm.addEventListener("submit", (e) => {
  e.preventDefault(); // stop page reload
  successfulLogin();
});

loginBtnSend.addEventListener("submit", (e) => {
  e.preventDefault();
  successfulLogin();
});

loginBtnClear.addEventListener("click", (e) => {
  e.preventDefault();
  loginInputId.value = "";
  loginInputPw.value = "";
});
