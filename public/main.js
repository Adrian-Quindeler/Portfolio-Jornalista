document.addEventListener('DOMContentLoaded', function() {
  const themeToggle = document.querySelector(".theme-toggle");
  const htmlElement = document.documentElement;

  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

  function setTheme(theme) {
    const isDark = theme === "dark";
    htmlElement.classList.toggle("dark", isDark);
    localStorage.setItem("theme", theme);
    

    const metaThemeColor = document.getElementById('theme-color-meta');
    if (metaThemeColor) {
      metaThemeColor.content = isDark ? '#121212' : '#faf7f2';
    }
    

    document.body.classList.add('theme-transition');
    

    setTimeout(() => {
      document.body.classList.remove('theme-transition');
    }, 300);
    

    updateThemeToggleIcon(theme);
  }

  function updateThemeToggleIcon(theme) {
    const sunIcon = document.querySelector(".theme-toggle .fa-sun");
    const moonIcon = document.querySelector(".theme-toggle .fa-moon");
    
    if (sunIcon && moonIcon) {
      if (theme === "dark") {
        sunIcon.style.display = "block";
        moonIcon.style.display = "none";
      } else {
        sunIcon.style.display = "none";
        moonIcon.style.display = "block";
      }
    }
  }

  function initTheme() {
    const savedTheme = localStorage.getItem("theme");
    
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
  
      setTheme(prefersDarkScheme.matches ? "dark" : "light");
    }
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const currentTheme = htmlElement.classList.contains("dark") ? "dark" : "light";
      const newTheme = currentTheme === "light" ? "dark" : "light";
      setTheme(newTheme);
      
  
      themeToggle.classList.add('theme-toggle-active');
      setTimeout(() => {
        themeToggle.classList.remove('theme-toggle-active');
      }, 500);
    });
  }

  prefersDarkScheme.addEventListener('change', (e) => {
    if (!localStorage.getItem("theme")) {
      setTheme(e.matches ? "dark" : "light");
    }
  });

  initTheme();

  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, observerOptions);
  
  document.querySelectorAll(".fade-in, .slide-in-left, .slide-in-right, .slide-in-up").forEach((element) => {
    observer.observe(element);
  });
  
  const mobileMenu = document.getElementById("mobile-menu");
  const navMenu = document.querySelector(".nav-menu");
  const body = document.body;

  if (mobileMenu) {
    mobileMenu.addEventListener("click", () => {
      mobileMenu.classList.toggle("active");
      navMenu.classList.toggle("active");
      
  
      if (navMenu.classList.contains("active")) {
        body.style.overflow = "hidden";
      } else {
        body.style.overflow = "";
      }
    });
  }

  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("active");
      navMenu.classList.remove("active");
      body.style.overflow = "";
    });
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 768 && navMenu.classList.contains("active")) {
      mobileMenu.classList.remove("active");
      navMenu.classList.remove("active");
      body.style.overflow = "";
    }
  });
  
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-link");
  
  window.addEventListener("scroll", () => {
    let current = "";
  
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
  
      if (pageYOffset >= sectionTop - sectionHeight / 3) {
        current = section.getAttribute("id");
      }
    });
  
    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href").substring(1) === current) {
        link.classList.add("active");
      }
    });
  });
  
  const backToTopButton = document.querySelector(".back-to-top");
  
  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      backToTopButton.classList.add("active");
    } else {
      backToTopButton.classList.remove("active");
    }
  });
  
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    if (!img.hasAttribute('loading')) {
      img.setAttribute('loading', 'lazy');
    }
  });
  
  function adjustHeroHeight() {
    const hero = document.querySelector('.hero');
    if (hero && window.innerWidth <= 768) {
      const viewportHeight = window.innerHeight;
      hero.style.minHeight = `${viewportHeight}px`;
    } else if (hero) {
      hero.style.minHeight = '100vh';
    }
  }
  
  adjustHeroHeight();
  window.addEventListener('resize', adjustHeroHeight);
});