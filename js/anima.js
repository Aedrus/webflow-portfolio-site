// ==================================
// Element Observer (Section Fade in)
// ==================================

// Init hidden elements variable
let hiddenElements;

// Get width of window and listen for any changes.
let width = document.body.clientWidth;
window.addEventListener('resize', () => {
  return width = window.innerWidth;
})

// Add event listener that listens for page load and finds hidden elements.
window.addEventListener("load", (event) => {
  hiddenElements = document.querySelectorAll('.hidden');
  createObserver();
});

function createObserver() {
  let options = {
    root: null,
    rootMargin: "0px",
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && width >= 991) {
        entry.target.classList.add('show');
        entry.target.classList.remove('hidden');
      }
      // else if (!entry.isIntersecting && width >= 991) {
      //   entry.target.classList.remove('show');
      //   entry.target.classList.add('hidden');
      // }
    })
  }, options);
  
  hiddenElements.forEach((e) => observer.observe(e));
};

// ==================================
// Testimonials Carousel
// ==================================
let AVATARS = {
  femaleLight: {src: "/images/avatar-female-light.png", alt: "avatar graphic female light"},
  maleDark: {src: "/images/avatar-male-dark.png", alt: "avatar graphic male dark"}
}

document.addEventListener("DOMContentLoaded", function() {
  // Store testimonial data
  const testimonials = [
    {
        avatar: AVATARS.femaleLight,
        name: "Stephanie Mason-Teague", 
        company: {name: "Ormond Memorial Art Museum & Gardens", 
        href: "https://www.ormondartmuseum.org/"}, 
        text: "Mario did a wonderful job, on time, and exceeded our expectations. He was very professional to work with and delivered an exceptional product."
    },
    {
        avatar: AVATARS.maleDark, 
        name: "Nino Blac", 
        company: {name: "Life180 Coaching", 
            href: null}, 
            text: "Collaborating with Mario was a fantastic experience. He is concise, thorough, and possesses a keen eye for detail. Mario excels at following instructions, consistently meeting deadlines. I highly recommend him to anyone in search of web design services. I look forward to the possibility of working with him again in the future."
    }
  ];

  // Locate parent container
  let testimonials_container = document.querySelector("#testimonials-container");

  // Create cards function with template
  let createTestimonialCard = (testimonial) => {
    let CARDTEMPLATE = `
    <div class="testimonials-avatar">
      <img src="${testimonial.avatar.src}" alt="${testimonial.avatar.alt}">
    </div>
    <h3>${testimonial.name}</h3>
    <div class="text-link">
      <a href="${testimonial.company.href}" target="_blank" style="color: #fd5618; text-decoration: none;"><h4>${testimonial.company.name}</h4></a>
    </div>
    <div class="testimonials-rating">
      <img src="/images/star-fill.svg" alt="star rating graphic">
      <img src="/images/star-fill.svg" alt="star rating graphic">
      <img src="/images/star-fill.svg" alt="star rating graphic">
      <img src="/images/star-fill.svg" alt="star rating graphic">
      <img src="/images/star-fill.svg" alt="star rating graphic">
    </div>
    <p>${testimonial.text}</p>
    `
    const card = document.createElement("div");
    card.classList.add("testimonials-card-container");
    card.innerHTML = CARDTEMPLATE;
    return card;
  }

  // Start carousel function
  let createTestimonialCarousel = () => {
    testimonials.forEach((testimonial, index) => {
      const card = createTestimonialCard(testimonial);
      
      if (index === 0) {
        card.classList.add("active--testimonial");

      }

      testimonials_container.appendChild(card);
    })
  }
  
  createTestimonialCarousel();

  // Button changes for cards.
  const total_cards = Array.from(testimonials_container.children)
  const tabs = document.querySelectorAll(".dot-tabs");
  const prev_arrow = document.querySelector(".prev-arrow");
  const next_arrow = document.querySelector(".next-arrow");
  let POS = 0;

  tabs[0].classList.add("active--tab");
  prev_arrow.classList.add("deactivated--arrow");

  // Switch tabs functionality
  tabs.forEach( (button, index) => {
    button.addEventListener("click", () => {
      // Reset active status for all tabs and set new active tab.
      tabs.forEach(btn => {
        if (btn.classList.contains("active--tab")) {
          btn.classList.remove("active--tab");
        }
      });
      button.classList.add("active--tab");

      // Align state of arrows with tabs.
      if (index != 0) {
        prev_arrow.classList.remove("deactivated--arrow");
      }
      else {
        prev_arrow.classList.add("deactivated--arrow");
      }
      if (index == tabs.length - 1) {
        next_arrow.classList.add("deactivated--arrow");
      }
      else {
        next_arrow.classList.remove("deactivated--arrow");
      }

      // Reset active cards and set new active card.
      total_cards.forEach( card => {
        if (card.classList.contains("active--testimonial")) {
          card.classList.remove("active--testimonial")
        }
      });
      total_cards[index].classList.add("active--testimonial");

      POS = index;
    })
  })

  // Switch arrows functionality
  prev_arrow.addEventListener("click", () => {
    // Reset active cards and set new active card.
    if (POS == 0) {
      return;
    }
    else {
      total_cards.forEach(card => {
        if (card.classList.contains("active--testimonial")) {
          card.classList.remove("active--testimonial")
        }
      });
      total_cards[POS - 1].classList.add("active--testimonial");
      POS = POS - 1;
      if (POS == 0) {
        prev_arrow.classList.add("deactivated--arrow");
        next_arrow.classList.remove("deactivated--arrow");
      }
      
      // Align state of tabs with arrows.
      tabs.forEach(btn => {
        if (btn.classList.contains("active--tab")) {
          btn.classList.remove("active--tab");
        }
        tabs[POS].classList.add("active--tab")
      });
    }
  })

  next_arrow.addEventListener("click", () => {
    // Reset active cards and set new active card.
    if (POS == total_cards.length - 1) {
      return;
    }
    else {
      total_cards.forEach(card => {
        if (card.classList.contains("active--testimonial")) {
          card.classList.remove("active--testimonial")
        }
      });
      total_cards[POS + 1].classList.add("active--testimonial");
      POS = POS + 1;
      if (POS == total_cards.length - 1) {
        next_arrow.classList.add("deactivated--arrow");
        prev_arrow.classList.remove("deactivated--arrow");
      }

      // Align state of tabs with arrows.
      tabs.forEach(btn => {
        if (btn.classList.contains("active--tab")) {
          btn.classList.remove("active--tab");
        }
        tabs[POS].classList.add("active--tab")
      });
    }
  })
  // ==================================
  // Mobile Menu
  // ==================================
  const mobile_menu = document.querySelector(".mobile-menu");
  const mobile_menu_blanket = document.querySelector(".mobile-menu-blanket")
  const mobile_menu_open = document.querySelector("#mobile-menu-open");
  const mobile_menu_close = document.querySelector("#mobile-menu-close");
  const mobile_menu_links = Array.from(document.querySelectorAll(".mobile-nav-link"));

  // Reusable Functions
  let openMobileMenu = () => {
      mobile_menu.classList.remove("deactivated--mobile-menu");
      mobile_menu_blanket.classList.add("active--mobile-blanket")
      mobile_menu.classList.add("active--mobile-menu");
  }
  let closeMobileMenu = () => {
      mobile_menu.classList.remove("active--mobile-menu");
      mobile_menu_blanket.classList.remove("active--mobile-blanket")
      mobile_menu.classList.add("deactivated--mobile-menu");
  }

  // Open Mobile Menu
  mobile_menu_open.addEventListener("click", () => {
      openMobileMenu();
  });

  // Close Mobile Menu
  mobile_menu_close.addEventListener("click", () => {
      closeMobileMenu();
  })

  // Blanket Close Menu
  mobile_menu_blanket.addEventListener("click", () => {
      closeMobileMenu();
  })

  // Close Menu When Link is Clicked
  mobile_menu_links.forEach( link => {
    link.addEventListener("click", () => {
        closeMobileMenu();
    })
  })
});
// ==================================
// About "Read More" Dropdown
// ==================================
const about_btn = document.querySelector("#about-dropdown");
const about_more_container = document.querySelector(".div-block-15");

about_btn.addEventListener("click", () => {
  if (about_more_container.classList.contains("active--about-more")) {
    about_more_container.classList.remove("active--about-more");
  }
  else {
    about_more_container.classList.add("active--about-more");
  }
});

// ==================================
// Navbar Shine Animation
// ==================================
let sInterval;

let runShine = () => {
  if (!sInterval) {
    sInterval = setInterval(shineEffect, 4000)
  }
}

let shineEffect = () => {
  const navbar_shine = document.querySelector(".navbar-wrapper-shine");
  if (!navbar_shine.classList.contains("active--navbar-shine")) {
    navbar_shine.style.opacity = "1";
    navbar_shine.classList.add("active--navbar-shine");
  }
  else {
    navbar_shine.style.opacity = "0";
    navbar_shine.classList.remove("active--navbar-shine");
  }
};

runShine();