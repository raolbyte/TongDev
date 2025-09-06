const groups = [
  {
    title: "Official Group 🌟",
    header: "Join Our Official Community",
    description:
      "Join the official group where all developers unite. Stay connected and be part of something amazing!",
    image: "https://files.catbox.moe/wwfco3.png   ",
    url: "https://chat.whatsapp.com/JpRMIJQzvl0CSHsbLxWTnJ?mode=ac_t",
    icon: "fa-users",
    color: "bg-purple-500",
    buttonText: "Join Community",
    buttonIcon: "fa-user-friends"
  },
  {
    title: "Official Channel 📢",
    header: "Coming Soon",
    description:
      "Our official channel is coming soon! Stay tuned for updates and announcements.",
    image: "https://files.catbox.moe/u4d541.jpg   ",
    url: "#",
    icon: "fa-bullhorn",
    color: "bg-gray-500",
    buttonText: "Coming Soon",
    buttonIcon: "fa-clock"
  }
];

let activeIndex = null;

/**
 * Inisialisasi daftar grup di halaman
 */
function initGroups() {
  const groupsContainer = document.getElementById("groups");
  groupsContainer.innerHTML = "";

  groups.forEach((group, index) => {
    const card = document.createElement("div");
    card.className = `
      group-card 
      bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl cursor-pointer border border-gray-100 dark:border-gray-700
      ${activeIndex === index ? "ring-2 ring-blue-500" : ""}
    `;
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";
    card.style.animation = `fadeInUp 0.5s ease-out ${index * 0.1}s forwards`;

    card.innerHTML = `
      <div class="spacing-responsive-md touch-target" onclick="toggleGroupDetail(${index}, event)" ontouchstart="toggleGroupDetail(${index}, event)">
        <div class="flex items-center gap-3 sm:gap-4">
          <div class="relative">
            <img src="${group.image}" alt="${group.title}" class="w-12 h-12 sm:w-14 sm:h-14 rounded-xl object-cover border-2 border-white dark:border-gray-700 shadow-sm high-dpi-optimized">
            <span class="absolute -bottom-1 -right-1 ${group.color} w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-white text-responsive-xs">
              <i class="fas ${group.icon}"></i>
            </span>
          </div>
          <div class="flex-1 min-w-0">
            <h3 class="font-bold text-gray-800 dark:text-white text-responsive-sm">${group.title}</h3>
            <p class="text-responsive-xs text-gray-500 dark:text-gray-400 mt-1 truncate">${group.header}</p>
          </div>
          <i class="fas fa-chevron-down text-gray-400 dark:text-gray-500 transition-transform duration-300 ${
            activeIndex === index ? "transform rotate-180" : ""
          }"></i>
        </div>
      </div>
      <div id="detail-${index}" class="transition-all duration-300 overflow-hidden max-h-0">
        <div class="spacing-responsive-md pt-0 border-t border-gray-100 dark:border-gray-700">
          <p class="text-gray-600 dark:text-gray-300 text-responsive-sm mb-4 leading-relaxed">${group.description}</p>
          <a href="${group.url}" target="_blank" 
             class="inline-flex items-center justify-center w-full ${group.color} hover:${group.color.replace("500", "600")} text-white spacing-responsive-sm rounded-lg font-medium transition-all duration-300 hover:shadow-lg transform hover:scale-105 active:scale-95 touch-target">
            <i class="fas ${group.buttonIcon} mr-2"></i>
            ${group.buttonText}
          </a>
        </div>
      </div>
    `;

    groupsContainer.appendChild(card);

    setTimeout(() => {
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
    }, index * 100);
  });
}

/**
 * Toggle detail grup saat diklik
 */
function toggleGroupDetail(index, event) {
  if (
    event.target.tagName === "A" ||
    event.target.parentElement.tagName === "A"
  )
    return;

  const detail = document.getElementById(`detail-${index}`);
  const allCards = document.querySelectorAll(".group-card");
  const allArrows = document.querySelectorAll(".fa-chevron-down");

  document.querySelectorAll('[id^="detail-"]').forEach((el, i) => {
    if (i !== index && el.classList.contains("max-h-[300px]")) {
      el.classList.remove("max-h-[300px]");
      el.classList.add("max-h-0");
      allCards[i].classList.remove("ring-2", "ring-blue-500");
      allArrows[i].classList.remove("rotate-180");
    }
  });

  if (detail.classList.contains("max-h-[300px]")) {
    detail.classList.remove("max-h-[300px]");
    detail.classList.add("max-h-0");
    allCards[index].classList.remove("ring-2", "ring-blue-500");
    allArrows[index].classList.remove("rotate-180");
    allCards[index].setAttribute("aria-expanded", "false");
    activeIndex = null;
  } else {
    detail.classList.remove("max-h-0");
    detail.classList.add("max-h-[300px]");
    allCards[index].classList.add("ring-2", "ring-blue-500");
    allArrows[index].classList.add("rotate-180");
    allCards[index].setAttribute("aria-expanded", "true");
    activeIndex = index;

    setTimeout(() => {
      detail.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }, 100);
  }
}

/**
 * Loader untuk animasi loading halaman
 */
const pageLoader = document.getElementById("page-loader");

function showLoader() {
  document.documentElement.style.scrollBehavior = "auto";
  const scrollPosition = window.scrollY;
  document.body.style.top = `-${scrollPosition}px`;
  document.body.classList.add("fixed", "w-full");

  if (pageLoader) {
    pageLoader.style.display = "flex";
    setTimeout(() => {
      pageLoader.style.opacity = "1";
    }, 10);
  }
}

function hideLoader() {
  if (pageLoader) {
    pageLoader.style.opacity = "0";
    setTimeout(() => {
      pageLoader.style.display = "none";
      document.body.classList.remove("fixed", "w-full");
      const scrollPosition = parseInt(document.body.style.top || "0") * -1;
      document.body.style.top = "";
      document.documentElement.style.scrollBehavior = "smooth";
      window.scrollTo({ top: scrollPosition, behavior: "auto" });

      // Tampilkan konten utama setelah loading selesai
      const mainContent = document.getElementById("main-content");
      if (mainContent) {
      mainContent.style.visibility = "visible";
      mainContent.style.opacity = "1";
      }

      initGroups(); // jika kamu punya fungsi inisialisasi
    }, 500);
  }
}


document.addEventListener("DOMContentLoaded", () => {
  const style = document.createElement("style");
  style.textContent = `
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    @media (prefers-reduced-motion: reduce) {
      @keyframes fadeInUp {
        from { opacity: 0; }
        to { opacity: 1; }
      }
    }
  `;
  document.head.appendChild(style);
  
  // Performance optimizations
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
      showLoader();
      setTimeout(hideLoader, 1500);
    });
  } else {
    setTimeout(() => {
      showLoader();
      setTimeout(hideLoader, 1500);
    }, 0);
  }
  
  // Add touch event optimizations
  addTouchOptimizations();
  
  // Add intersection observer for performance
  addIntersectionObserver();
  
  // Add keyboard navigation
  addKeyboardNavigation();
});

window.toggleGroupDetail = toggleGroupDetail;

/**
 * Music Player Logic
 */
const audio = new Audio("https://files.catbox.moe/sk0hku.mp3"); // Ganti dengan URL musikmu
const playBtn = document.getElementById("play-pause-btn");
const playIcon = document.getElementById("play-icon");
const pauseIcon = document.getElementById("pause-icon");
const title = document.getElementById("song-title");
const artist = document.getElementById("artist-name");
const cover = document.getElementById("album-cover");
const progressBar = document.getElementById("progress-bar");
const progressPointer = document.getElementById("progress-pointer");
const progressContainer = document.getElementById("progress-container");
const currentTimeEl = document.getElementById("current-time");
const totalDurationEl = document.getElementById("total-duration");

let isPlaying = false;
let isDragging = false;

/**
 * Format durasi ke MM:SS
 */
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

audio.addEventListener("loadedmetadata", () => {
  totalDurationEl.textContent = formatTime(audio.duration);
});

/**
 * Update progress bar & pointer
 */
function updateProgress() {
  if (!isNaN(audio.duration)) {
    const progressPercent = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = `${progressPercent}%`;
    progressPointer.style.left = `${progressPercent}%`;
    currentTimeEl.textContent = formatTime(audio.currentTime);
  }
}

/**
 * Toggle play/pause
 */
playBtn.addEventListener("click", () => {
  if (!isPlaying) {
    audio.play();
    playIcon.classList.add("hidden");
    pauseIcon.classList.remove("hidden");
    isPlaying = true;
    playBtn.setAttribute("aria-label", "Pause music");
  } else {
    audio.pause();
    pauseIcon.classList.add("hidden");
    playIcon.classList.remove("hidden");
    isPlaying = false;
    playBtn.setAttribute("aria-label", "Play music");
  }
});

setInterval(updateProgress, 1000);

/**
 * Drag pointer untuk seek
 */
progressPointer.addEventListener("mousedown", (e) => {
  e.preventDefault(); // Hindari drag seleksi
  isDragging = true;
});

document.addEventListener("mousemove", (e) => {
  if (isDragging) seek(e);
});

document.addEventListener("mouseup", () => {
  if (isDragging) {
    isDragging = false;
    seek({
      clientX: progressPointer.getBoundingClientRect().left + 5
    }); // Update posisi akhir
  }
});

progressContainer.addEventListener("touchstart", (e) => {
  isDragging = true;
  seek(e.touches[0]);
});

progressContainer.addEventListener("touchmove", (e) => {
  if (isDragging) seek(e.touches[0]);
});

progressContainer.addEventListener("touchend", () => {
  if (isDragging) {
    isDragging = false;
    seek({
      clientX: progressPointer.getBoundingClientRect().left + 5
    });
  }
});

/**
 * Fungsi utama untuk mencari posisi lagu
 */
function seek(event) {
  const rect = progressContainer.getBoundingClientRect();
  let offsetX = event.clientX - rect.left;

  if (offsetX < 0) offsetX = 0;
  if (offsetX > rect.width) offsetX = rect.width;

  const percent = offsetX / rect.width;
  const newTime = percent * audio.duration;

  if (isDragging) {
    progressBar.style.width = `${percent * 100}%`;
    progressPointer.style.left = `${percent * 100}%`;
    currentTimeEl.textContent = formatTime(newTime);
  } else {
    audio.currentTime = newTime;
    updateProgress();
  }
}

progressContainer.addEventListener("click", (e) => {
  if (!isDragging) seek(e);
});

window.addEventListener("beforeunload", () => {
  audio.pause();
});

/**
 * Inisialisasi dark mode
 */
const toggleBtn = document.getElementById("darkModeToggle");

if (toggleBtn) {
  const body = document.body;
  const toggleSpan = toggleBtn.querySelector("span");

  if (toggleSpan) {
    toggleSpan.classList.add("transition-all");

    const isDarkMode = localStorage.getItem("darkMode") === "true";

    if (isDarkMode) {
      body.classList.add("dark-mode");
      toggleSpan.style.transform = "translateX(24px)";
      const toggleIcon = toggleBtn.querySelector("i");
      if (toggleIcon) {
        toggleIcon.className = "fas fa-sun text-xs text-yellow-500";
      }
      toggleBtn.setAttribute("aria-checked", "true");
      toggleBtn.setAttribute("aria-label", "Switch to light mode");
    }

    toggleBtn.addEventListener("click", () => {
      body.classList.toggle("dark-mode");
      const isActive = body.classList.contains("dark-mode");

      const sunIcon = "fas fa-sun text-xs text-yellow-500";
      const moonIcon = "fas fa-moon text-xs text-gray-700";
      const toggleIcon = toggleBtn.querySelector("i");

      if (toggleIcon) {
        toggleIcon.className = isActive ? sunIcon : moonIcon;
      }

      toggleSpan.style.transform = isActive
        ? "translateX(24px)"
        : "translateX(2px)";

      // Update accessibility attributes
      toggleBtn.setAttribute("aria-checked", isActive);
      toggleBtn.setAttribute("aria-label", isActive ? "Switch to light mode" : "Switch to dark mode");

      localStorage.setItem("darkMode", isActive);
      updateDarkTextElements(isActive);
    });
  }
}

/**
 * Update warna teks sesuai mode gelap/terang
 */
function updateDarkTextElements(isDark) {
  document.querySelectorAll("[data-dark-text]").forEach((el) => {
    const defaultClasses = Array.from(el.classList)
      .filter((c) => !c.startsWith("text-"))
      .join(" ");
    const darkClass = el.getAttribute("data-dark-text");
    el.className = isDark
      ? `${defaultClasses} ${darkClass}`
      : defaultClasses;
  });
}

document.addEventListener("DOMContentLoaded", () => {
  updateDarkTextElements(localStorage.getItem("darkMode") === "true");
  setTimeout(() => {
    initGroups();
  }, 100);
});

/**
 * Inisialisasi plan selector
 */
function initPlans() {
  document.querySelectorAll(".select-plan").forEach((button) => {
    button.addEventListener("click", (event) => {
      const card = event.target.closest(".card-hover");
      const planName = card.querySelector("h3:nth-of-type(1)").innerText.trim();
      const priceDurationElement = card.querySelector("h3:nth-of-type(2)");
      const priceText = priceDurationElement
        .querySelector("span")
        .previousSibling.textContent.trim();
      const duration =
        priceDurationElement
          .querySelector("span")
          .innerText.trim()
          .replace(/\D+/g, "") + " days";
      let price = parseInt(priceText.replace("K", "000"));
      const priceFormatted = price.toLocaleString("id-ID");

      let message = `*Hi Admin! I'd like to place an order 🍀*
      
*📑 Plan:* ${planName}  
*💰 Price:* Rp${priceFormatted}  
*📆 Duration:* ${duration}  

*📃 Payment method:* Please choose one — Dana, Shopeepay, or QRIS`;

      if (planName === "Inviting bots to groups") {
        message += `\n*Link Group:* isi url group, pastikan tidak diprivat`;
      }

      const whatsappUrl = `https://wa.me/628979440862?text= ${encodeURIComponent(
        message
      )}`;
      window.open(whatsappUrl, "_blank");
    });
  });

  const cards = document.querySelectorAll(".card-hover");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle("active", entry.isIntersecting);
    });
  }, { threshold: 0.5 });

  cards.forEach((card) => observer.observe(card));
}

document.addEventListener("DOMContentLoaded", function () {
  initPlans();
});

/**
 * Touch optimizations for better mobile experience
 */
function addTouchOptimizations() {
  // Prevent zoom on double tap
  let lastTouchEnd = 0;
  document.addEventListener('touchend', function (event) {
    const now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
      event.preventDefault();
    }
    lastTouchEnd = now;
  }, false);

  // Add passive event listeners for better performance
  const passiveEvents = ['touchstart', 'touchmove', 'touchend', 'touchcancel'];
  passiveEvents.forEach(eventType => {
    document.addEventListener(eventType, function() {}, { passive: true });
  });

  // Improve touch feedback
  document.querySelectorAll('.touch-target').forEach(element => {
    element.addEventListener('touchstart', function() {
      this.style.transform = 'scale(0.98)';
    }, { passive: true });
    
    element.addEventListener('touchend', function() {
      this.style.transform = '';
    }, { passive: true });
  });
}

/**
 * Intersection Observer for performance optimization
 */
function addIntersectionObserver() {
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fadeIn');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '50px'
    });

    // Observe all cards and images
    document.querySelectorAll('.card-hover, img').forEach(el => {
      observer.observe(el);
    });
  }
}

/**
 * Keyboard navigation support
 */
function addKeyboardNavigation() {
  // Add keyboard support for group cards
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      const focusedElement = document.activeElement;
      if (focusedElement && focusedElement.classList.contains('group-card')) {
        e.preventDefault();
        const index = Array.from(document.querySelectorAll('.group-card')).indexOf(focusedElement);
        if (index !== -1) {
          toggleGroupDetail(index, { target: focusedElement });
        }
      }
    }
  });

  // Add focus management - this will be called after groups are initialized
  setTimeout(() => {
    document.querySelectorAll('.group-card').forEach((card, index) => {
      card.setAttribute('tabindex', '0');
      card.setAttribute('role', 'button');
      card.setAttribute('aria-expanded', 'false');
      card.setAttribute('aria-label', `Toggle details for group ${index + 1}`);
    });
  }, 100);
}

/**
 * Enhanced responsive utilities
 */
function addResponsiveUtilities() {
  // Add resize observer for dynamic adjustments
  if ('ResizeObserver' in window) {
    const resizeObserver = new ResizeObserver(entries => {
      entries.forEach(entry => {
        const { width } = entry.contentRect;
        
        // Adjust grid columns based on container width
        const groupsContainer = document.getElementById('groups');
        if (groupsContainer) {
          if (width < 480) {
            groupsContainer.style.gridTemplateColumns = '1fr';
          } else if (width < 768) {
            groupsContainer.style.gridTemplateColumns = 'repeat(2, 1fr)';
          } else {
            groupsContainer.style.gridTemplateColumns = 'repeat(3, 1fr)';
          }
        }
      });
    });

    const mainContent = document.querySelector('main');
    if (mainContent) {
      resizeObserver.observe(mainContent);
    }
  }
}

/**
 * Add service worker for offline support
 */
function addServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then(registration => {
          console.log('SW registered: ', registration);
        })
        .catch(registrationError => {
          console.log('SW registration failed: ', registrationError);
        });
    });
  }
}

/**
 * Add PWA manifest
 */
function addPWAManifest() {
  const manifest = {
    name: 'Tongkrongan Developer Community',
    short_name: 'TongDev',
    description: 'Community Hub for Developers',
    start_url: '/',
    display: 'standalone',
    background_color: '#f5f7fa',
    theme_color: '#4361ee',
    icons: [
      {
        src: 'icon.png',
        sizes: '192x192',
        type: 'image/png'
      }
    ]
  };

  const manifestBlob = new Blob([JSON.stringify(manifest)], { type: 'application/json' });
  const manifestURL = URL.createObjectURL(manifestBlob);
  
  const link = document.createElement('link');
  link.rel = 'manifest';
  link.href = manifestURL;
  document.head.appendChild(link);
}

// Initialize all enhancements
document.addEventListener("DOMContentLoaded", () => {
  addResponsiveUtilities();
  addServiceWorker();
  addPWAManifest();
});
