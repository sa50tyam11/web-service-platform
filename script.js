// ================= SCROLL REVEAL =================
const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  },
  { threshold: 0.18 }
);

document.querySelectorAll(".reveal").forEach(el =>
  revealObserver.observe(el)
);

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
  if (inner) inner.classList.toggle("flipped");
}
window.flipCard = flipCard;

// ================= FOOTER YEAR =================
const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// ================= NAV TOGGLE =================
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.querySelector(".menu-btn");
  const menu = document.querySelector(".menu");

  if (!btn || !menu) return;

  btn.addEventListener("click", () => {
    menu.classList.toggle("open");
  });

  menu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      menu.classList.remove("open");
    });
  });
});





// ================= CONTACT FORM (EmailJS + WhatsApp) =================
if (window.emailjs) {
  emailjs.init("oVtWwBC7fHgP0nCP6");
}

const contactForm = document.getElementById("contactForm");
const whatsappBtn = document.getElementById("whatsappBtn");

if (contactForm) {
  contactForm.addEventListener("submit", e => {
    e.preventDefault();

    const serviceId = "service_qej52mu";
    const templateId = "template_m2m4xcr";

    emailjs
      .sendForm(serviceId, templateId, contactForm)
      .then(() => {
        alert("Message sent successfully!");
        contactForm.reset();
      })
      .catch(() => {
        window.location.href =
          "https://wa.me/917667261838?text=Hi%20REDWORK%2C%20I%20tried%20contacting%20you%20via%20your%20website.";
      });
  });
}

if (whatsappBtn) {
  whatsappBtn.addEventListener("click", () => {
    const name = contactForm?.elements["name"]?.value || "";
    const message = contactForm?.elements["message"]?.value || "";

    const encoded = encodeURIComponent(
      `Hi REDWORK,\n\nMy name is ${name || "(your name)"}.\n\nProject details:\n${message || "(project details)"}`
    );

    window.open(`https://wa.me/917667261838?text=${encoded}`, "_blank");
  });
}

