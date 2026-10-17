document.addEventListener("DOMContentLoaded", () => {
  // 1. Footer Year Auto-Update
  document.getElementById("year").textContent = new Date().getFullYear();

  // 2. Mobile Navigation Toggle
  const mobileMenu = document.getElementById("mobile-menu");
  const navLinks = document.getElementById("nav-links");

  if (mobileMenu) {
    mobileMenu.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
  }

  // Close mobile menu when clicking a link
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
    });
  });

  // 3. Interactive Web Project Cost Estimator
  const siteTypeSelect = document.getElementById("site-type");
  const pageCountInput = document.getElementById("page-count");
  const pageValSpan = document.getElementById("page-val");
  const featureSeo = document.getElementById("feature-seo");
  const featureForm = document.getElementById("feature-form");
  const featureCms = document.getElementById("feature-cms");
  const featureHost = document.getElementById("feature-host");

  const totalPriceEl = document.getElementById("total-price");
  const totalTimeEl = document.getElementById("total-time");

  function calculateQuote() {
    let basePrice = parseInt(siteTypeSelect.value, 10);
    let pages = parseInt(pageCountInput.value, 10);
    
    // Page Value UI Display
    pageValSpan.textContent = pages;

    // Additional page cost (KES 2,000 per extra page beyond 1)
    let extraPageCost = (pages - 1) * 2000;

    // Feature add-ons
    let featureCost = 0;
    if (featureSeo.checked) featureCost += parseInt(featureSeo.value, 10);
    if (featureForm.checked) featureCost += parseInt(featureForm.value, 10);
    if (featureCms.checked) featureCost += parseInt(featureCms.value, 10);
    if (featureHost.checked) featureCost += parseInt(featureHost.value, 10);

    // Total Calculation
    let grandTotal = basePrice + extraPageCost + featureCost;

    // Format output currency
    totalPriceEl.textContent = `KES ${grandTotal.toLocaleString()}`;

    // Delivery time calculation based on scale
    if (pages <= 3 && !featureCms.checked) {
      totalTimeEl.textContent = "3 - 5 Business Days";
    } else if (pages <= 7) {
      totalTimeEl.textContent = "7 - 10 Business Days";
    } else {
      totalTimeEl.textContent = "12 - 18 Business Days";
    }
  }

  // Attach event listeners to all calculator inputs
  if (siteTypeSelect) {
    siteTypeSelect.addEventListener("change", calculateQuote);
    pageCountInput.addEventListener("input", calculateQuote);
    featureSeo.addEventListener("change", calculateQuote);
    featureForm.addEventListener("change", calculateQuote);
    featureCms.addEventListener("change", calculateQuote);
    featureHost.addEventListener("change", calculateQuote);

    // Initial calculation run
    calculateQuote();
  }

  // 4. Contact Form Handler (Simulated Submit)
  const contactForm = document.getElementById("contact-form");
  const formStatus = document.getElementById("form-status");

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      
      const name = document.getElementById("name").value;
      
      formStatus.style.color = "#06b6d4";
      formStatus.textContent = "Sending your message...";

      setTimeout(() => {
        formStatus.style.color = "#10b981";
        formStatus.textContent = `Thank you, ${name}! Your inquiry has been sent to Tatua Solutions. We will respond shortly.`;
        contactForm.reset();
        calculateQuote();
      }, 1200);
    });
  }

  emailjs.init("w_xev6KUhEvWUy21a");

document.getElementById("contact-form").addEventListener("submit", function(e) {
  e.preventDefault();

  const params = {
    from_name: document.getElementById("name").value,
    from_email: document.getElementById("email").value,
    service: document.getElementById("service-type").value,
    message: document.getElementById("message").value,
    estimated_quote: document.getElementById("total-price").textContent
  };

  emailjs.send("service_btgxfbs", "template_c9l104h", params)
    .then(() => {
      alert("Thank you! Your quote request has been sent to Tatua Solutions.");
    });
});
});