const toggle = document.querySelector(".toggle");
const menu = document.querySelector(".menu");
const items = document.querySelectorAll(".item");
const carouselTrack = document.querySelector(".carousel__track");
const carouselSlides = Array.from(carouselTrack.children);
const moveRightButton = document.querySelector(".carousel__button--right");
const moveLeftButton = document.querySelector(".carousel__button--left");
const carouselDotsNav = document.querySelector(".carousel__nav");
const carouselDots = Array.from(carouselDotsNav.children);
const slideWidth = carouselSlides[0].getBoundingClientRect().width;

/* Toggle mobile menu */
function toggleMenu() {
  if (menu.classList.contains("active")) {
    menu.classList.remove("active");

    // adds the menu (hamburger) icon
    toggle.querySelector("a").innerHTML = "<i class='fas fa-bars'></i>";
  } else {
    menu.classList.add("active");

    // adds the close (x) icon
    toggle.querySelector("a").innerHTML = "<i class='fas fa-times'></i>";
  }
}

/* Event Listener */
toggle.addEventListener("click", toggleMenu, false);

/* Activate Submenu */
function toggleItem() {
  if (this.classList.contains("submenu-active")) {
    this.classList.remove("submenu-active");
  } else if (menu.querySelector(".submenu-active")) {
    menu.querySelector(".submenu-active").classList.remove("submenu-active");
    this.classList.add("submenu-active");
  } else {
    this.classList.add("submenu-active");
  }
}

/* Event Listeners */
for (let item of items) {
  if (item.querySelector(".submenu")) {
    item.addEventListener("click", toggleItem, false);
    item.addEventListener("keypress", toggleItem, false);
  }
}

function closeSubmenu(e) {
  if (menu.querySelector(".submenu-active")) {
    let isClickInside = menu
      .querySelector(".submenu-active")
      .contains(e.target);

    if (!isClickInside && menu.querySelector(".submenu-active")) {
      menu.querySelector(".submenu-active").classList.remove("submenu-active");
    }
  }
}

/* Event listener */
document.addEventListener("click", closeSubmenu, false);

//           //
//  CAROUSEL
//           //

// Arrange sldies next to each other

const setSlidePosition = (slide, index) => {
  slide.style.left = slideWidth * index + "px";
};

carouselSlides.forEach(setSlidePosition);

const moveToSlide = (carouselTrack, currentSlide, targetSlide) => {
  carouselTrack.style.transform = "translateX(-" + targetSlide.style.left + ")";
  currentSlide.classList.remove("current-slide");
  targetSlide.classList.add("current-slide");
};

const updateDots = (currentDot, targetDot) => {
  currentDot.classList.remove("current-slide");
  targetDot.classList.add("current-slide");
};

const hideShowCarouselArrows = (
  carouselSlides,
  moveLeftButton,
  moveRightButton,
  targetIndex
) => {
  if (targetIndex === 0) {
    moveLeftButton.classList.add("is-hidden");
    moveRightButton.classList.remove("is-hidden");
  } else if (targetIndex === carouselSlides.length - 1) {
    moveLeftButton.classList.remove("is-hidden");
    moveRightButton.classList.add("is-hidden");
  } else {
    moveLeftButton.classList.remove("is-hidden");
    moveRightButton.classList.remove("is-hidden");
  }
};

// When I click left, move slides to the left.
moveLeftButton.addEventListener("click", (e) => {
  const currentSlide = carouselTrack.querySelector(".current-slide");
  const previousSlide = currentSlide.previousElementSibling;
  const currentDot = carouselDotsNav.querySelector(".current-slide");
  const previousDot = currentDot.previousElementSibling;
  const previousIndex = carouselSlides.findIndex(
    (slide) => slide === previousSlide
  );

  moveToSlide(carouselTrack, currentSlide, previousSlide);
  updateDots(currentDot, previousDot);
  hideShowCarouselArrows(
    carouselSlides,
    moveLeftButton,
    moveRightButton,
    previousIndex
  );
});

// When I click right, move slides to the right.

moveRightButton.addEventListener("click", (e) => {
  const currentSlide = carouselTrack.querySelector(".current-slide");
  const nextSlide = currentSlide.nextElementSibling;
  const currentDot = carouselDotsNav.querySelector(".current-slide");
  const nextDot = currentDot.nextElementSibling;
  const nextIndex = carouselSlides.findIndex((slide) => slide === nextSlide);

  moveToSlide(carouselTrack, currentSlide, nextSlide);
  updateDots(currentDot, nextDot);
  hideShowCarouselArrows(
    carouselSlides,
    moveLeftButton,
    moveRightButton,
    nextIndex
  );
});

// When I click the nav indicators, move to that slide.

carouselDotsNav.addEventListener("click", (e) => {
  // What indicator was clicked on
  const targetDot = e.target.closest("button");

  if (!targetDot) return;

  const currentSlide = carouselTrack.querySelector(".current-slide");
  const currentDot = carouselDotsNav.querySelector(".current-slide");
  const targetIndex = carouselDots.findIndex((dot) => dot === targetDot);
  const targetSlide = carouselSlides[targetIndex];

  moveToSlide(carouselTrack, currentSlide, targetSlide);
  updateDots(currentDot, targetDot);
  hideShowCarouselArrows(
    carouselSlides,
    moveLeftButton,
    moveRightButton,
    targetIndex
  );
});
