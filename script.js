// ================= SCROLL REVEAL =================
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  },
  { threshold: 0.18 }
);

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

// ================== 3D TILT ==================
document.querySelectorAll(".tilt-3d").forEach(card => {
  card.addEventListener("mousemove", e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = ((y / rect.height) - 0.5) * 10;
    const rotateY = ((x / rect.width) - 0.5) * -10;

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "rotateX(0deg) rotateY(0deg)";
  });
});

// ================= PRICING FLIP =================
function flipCard(card) {
  const inner = card.querySelector(".flip-inner");
  inner.classList.toggle("flipped");
}
window.flipCard = flipCard; // make available to inline onclick

// ================= FOOTER YEAR =================
const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// ================= CONTACT FORM (EmailJS + WhatsApp) =================

// Initialize EmailJS (REQUIRED)
(function () {
  emailjs.init("oVtWwBC7fHgP0nCP6");
})();

const contactForm = document.getElementById("contactForm");
const whatsappBtn = document.getElementById("whatsappBtn");

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // ✅ REAL EmailJS IDs 
    const serviceId = "service_qej52mu";
    const templateId = "template_m2m4xcr";

    emailjs
      .sendForm(serviceId, templateId, contactForm)
      .then(function () {
        alert("Message sent successfully! I’ll contact you shortly.");
        contactForm.reset();
      })
      .catch(function (error) {
        console.error("EmailJS error:", error);

        // ✅ Fallback so you NEVER lose a lead
        window.location.href =
          "https://wa.me/917667261838?text=Hi%20REDWORK%2C%20I%20tried%20sending%20a%20message%20from%20your%20website%20but%20the%20email%20didn’t%20go%20through.";
      });
  });
}

// WhatsApp button
if (whatsappBtn) {
  whatsappBtn.addEventListener("click", function () {
    window.open(
      "https://wa.me/917667261838?text=Hi%20REDWORK%2C%20I%20want%20to%20discuss%20a%20project.",
      "_blank"
    );
  });
}


// WhatsApp button behavior
if (whatsappBtn && contactForm) {
  whatsappBtn.addEventListener("click", () => {
    const name = contactForm.elements["name"]?.value || "";
    const message = contactForm.elements["message"]?.value || "";

    const encoded = encodeURIComponent(
      `Hi REDWORK,\n\nMy name is ${name || "(your name)"}.\n\nProject details:\n${message || "(write your project details here)"}`)
      ;

    const url = `https://wa.me/917667261838?text=${encoded}`;
    window.open(url, "_blank");
  });
}
// reveal on scroll
const reveals = document.querySelectorAll('.reveal');
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('active');
  });
});
reveals.forEach(r => obs.observe(r));