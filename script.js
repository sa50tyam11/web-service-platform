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
const contactForm = document.getElementById("contactForm");
const whatsappBtn = document.getElementById("whatsappBtn");

// Email submit using EmailJS (replace service_id and template_id with your real ones)
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // TODO: set your own EmailJS service and template IDs
    const serviceId = "your_service_id";
    const templateId = "your_template_id";

    if (!serviceId || !templateId || serviceId === "your_service_id") {
      alert("Email sending is not configured yet. Please update EmailJS service/template IDs in script.js.");
      return;
    }

    emailjs
      .sendForm(serviceId, templateId, "#contactForm")
      .then(() => {
        alert("Message sent successfully. We'll get back to you soon.");
        contactForm.reset();
      })
      .catch(() => {
        alert("Something went wrong. Please try WhatsApp or Call.");
      });
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
