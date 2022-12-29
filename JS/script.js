// DYNAMIC NAVIGATION BAR MENU

const nav = document.querySelector(".main-nav");

const navlist = ["Home", "About", "Blog", "Sign"];
const ulEl = document.createElement("ul");
ulEl.classList.add("main-nav-list");

for (let i = 0; i <= navlist.length - 1; i++) {
  const listEl = navlist[i].toLowerCase();
  const liEl = document.createElement("li");
  if (listEl === "home") {
    liEl.classList.add(listEl + "s", "active");
  }
  liEl.classList.add(listEl + "s");

  const aEl = document.createElement("a");
  aEl.classList.add("main-nav-link");
  aEl.setAttribute("href", "#" + listEl + "s");
  const textList = document.createTextNode(listEl);
  aEl.appendChild(textList);
  liEl.appendChild(aEl);
  ulEl.appendChild(liEl);
}
nav.appendChild(ulEl);

/* NAVIGATION MOBILE */
const btnNavEl = document.querySelector(".btn-mobile-nav");
const headerEl = document.querySelector(".header");
btnNavEl.addEventListener("click", () => {
  headerEl.classList.toggle("nav-open");
});

/* SMOOTH SCROLLING */

const allLinks = document.querySelectorAll("a:link");
allLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const href = link.getAttribute("href");
    //Scrooll back to top
    if (href === "#")
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    // Scrooll to other link
    if (href !== "#" && href.startsWith("#")) {
      const sectionEl = document.querySelector(href);
      sectionEl.scrollIntoView({
        behavior: "smooth",
      });
    }
    // Close mobile navigation
    if (link.classList.contains("main-nav-link")) {
      headerEl.classList.toggle("nav-open");
    }
  });
});

// FIXED NAVIGATION SCRIPT

const sectionHomeEl = document.querySelector(".section-home");
const observ = new IntersectionObserver(
  (entries) => {
    const int = entries[0];
    console.log(int);

    if (!int.isIntersecting) {
      document.body.classList.add("fixed");
    } else {
      document.body.classList.remove("fixed");
    }
  },
  {
    root: null,
    threshold: 0,
    rootMargin: "-80px",
  }
);
observ.observe(sectionHomeEl);

// ADDING ANIMATION ONTHE NAVBAR ELEMNET WHILE ACTIVE

const sectionEl = document.querySelectorAll("section");

const navListEl = document.querySelectorAll(".header ul li");

window.addEventListener("scroll", () => {
  let position = "";

  sectionEl.forEach((section) => {
    const topS = section.offsetTop;
    const heightS = section.clientHeight;
    if (scrollY >= topS - heightS / 3) {
      position = section.getAttribute("id");
    }
  });

  navListEl.forEach((li) => {
    li.classList.remove("active");
    if (li.classList.contains(position)) {
      li.classList.add("active");
    }
  });
});

// LISTEN FOR A SCROLL EVENT AND HIDE OR SHOW THE NAVBAR

window.addEventListener(
  "scroll",
  (event) => {
    let isScrolling;
    // Clear our timeout throughout the scroll
    window.clearTimeout(isScrolling);

    // Set a timeout to run after scrolling ends
    isScrolling = setTimeout(() => {
      // Run the callback
      document.body.classList.add("fixed");
    }, 300);
    document.body.classList.remove("fixed");
  },
  false
);

//  ADD A SCROLL BUTTON TO THE TOP OF THE PAGE

const footerEl = document.querySelector("footer");

const btnEl = document.querySelector(".btn-scroll");
const rootEl = document.documentElement;

// Helper function to watch the intersection of the footer to show the button

function intersect(entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      btnEl.classList.add("showBtn");
    } else {
      btnEl.classList.remove("showBtn");
    }
  });
}

// Helper function to call with a smooth behavior

function toTop() {
  rootEl.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}
btnEl.addEventListener("click", toTop);

// Calling the helper function
let observer = new IntersectionObserver(intersect);

observer.observe(footerEl);
