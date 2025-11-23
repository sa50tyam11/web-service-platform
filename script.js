// Apple-style smooth interactions: parallax layers, reveal on scroll, tilt, flips, and contact -> WhatsApp

document.addEventListener('DOMContentLoaded', () => {
  // footer year
  document.getElementById('year').textContent = new Date().getFullYear();

  // Smooth parallax: move background layers based on mouse and scroll
  const hero = document.querySelector('.hero');
  const layers = document.querySelectorAll('.hero .bg-layer');

  if (hero && layers.length) {
    // mouse parallax
    hero.addEventListener('mousemove', (e) => {
      const rect = hero.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      layers.forEach((layer, i) => {
        const depth = (i + 1) * 6; // tweak depth
        layer.style.transform = `translate3d(${x * depth}px, ${y * depth}px, 0) scale(${1 + i*0.01})`;
      });
    });

    hero.addEventListener('mouseleave', () => {
      layers.forEach(layer => layer.style.transform = '');
    });

    // slow scroll parallax
    window.addEventListener('scroll', () => {
      const top = window.scrollY;
      layers.forEach((layer, i) => {
        layer.style.transform = `translateY(${top * (0.02 * (i+1))}px)`;
      });
    }, { passive: true });
  }

  // Reveal on scroll (IntersectionObserver for performance)
  const revealElements = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14 });

  revealElements.forEach(el => io.observe(el));

  // 3D tilt interaction for .tilt-3d elements
  document.querySelectorAll('.tilt-3d').forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) - rect.width / 2;
      const y = (e.clientY - rect.top) - rect.height / 2;
      const rotateX = (y / rect.height) * -8;
      const rotateY = (x / rect.width) * 8;
      el.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(0)`;
    });
    el.addEventListener('mouseleave', () => el.style.transform = '');
  });

  // Flip card function (exposed globally for onclick)
  window.flipCard = function(cardEl) {
    const inner = cardEl.querySelector('.flip-inner');
    if (!inner) return;
    const isOpen = inner.style.transform === 'rotateY(180deg)';
    inner.style.transform = isOpen ? '' : 'rotateY(180deg)';
  };

  // Contact form -> open WhatsApp with prefilled message
  // WHATSAPP BUTTON HANDLER
const whatsappBtn = document.getElementById('whatsappBtn');

if (whatsappBtn) {
  whatsappBtn.addEventListener("click", function () {
    const name = encodeURIComponent(document.querySelector("input[name='name']").value);
    const email = encodeURIComponent(document.querySelector("input[name='email']").value);
    const message = encodeURIComponent(document.querySelector("textarea[name='message']").value);

    const number = '916200964876';
    const text = `New Project Inquiry:%0AName:%20${name}%0AEmail:%20${email}%0A%0A${message}`;

    window.open(`https://wa.me/${number}?text=${text}`, '_blank');
  });
}


  // accessible flip via Enter key when a pricing-card is focused
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && document.activeElement && document.activeElement.classList.contains('flip-card')) {
      window.flipCard(document.activeElement);
    }
  });
});


//  EmailJS initialization 
document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("contactForm");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const userName = form.name.value;
        const userEmail = form.email.value;
        const userMessage = form.message.value;

        // 1️⃣ Send to YOU (Inbox)
        const sendToOwner = emailjs.sendForm(
            "service_qej52mu",         
            "template_3o7ui71", 
            form
        );

        // 2️⃣ Auto-reply to USER
        const sendAutoReply = emailjs.send(
            "service_qej52mu",          
            "template_m2m4xcr",   
            {
                name: userName,
                email: userEmail,
                message: userMessage
            }
        );

        Promise.all([sendToOwner, sendAutoReply])
            .then(() => {
                alert("Message sent successfully!");
                form.reset();
            })
            .catch((error) => {
                console.error("EmailJS Error:", error);
                alert("Sending failed. Try again.");
            });
    });
});
