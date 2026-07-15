/* ============================================================
   Custom Food Trailers UK: shared header, footer and interactions
   Builds the header/footer on every page so nav stays in sync.
   ============================================================ */
(function () {
  var LOGO = "assets/img/logo-horiz-green.png";
  var FOOTER_LOGO = "assets/img/logo-horiz-beige.png";
  var PHONE = "07826 551 503";
  var PHONE_LINK = "tel:+447826551503";
  var EMAIL = "andrew@customfoodtrailers.co.uk";
  var IG = "https://www.instagram.com/customfoodtrailersuk";
  var FB = "https://www.facebook.com/customfoodtrailersuk";
  var LI = "https://www.linkedin.com/company/custom-food-trailers/";

  var NAV = [
    { href: "our-trailers.html", label: "Our Food Trailers", key: "trailers" },
    { href: "build-your-own.html", label: "Build Your Own Trailer", key: "build" },
    { href: "about.html", label: "About Us", key: "about" },
    { href: "buying-guide.html", label: "Buying Guide", key: "guide" },
    { href: "contact.html", label: "Contact", key: "contact" }
  ];

  var page = document.body.getAttribute("data-page") || "";

  function navLinks() {
    return NAV.map(function (n) {
      var active = n.key === page ? ' class="active"' : "";
      return '<li><a href="' + n.href + '"' + active + '>' + n.label + "</a></li>";
    }).join("");
  }

  // ---------- Header ----------
  var header = document.createElement("header");
  header.className = "site-header";
  header.innerHTML =
    '<div class="container nav">' +
      '<a href="index.html" class="brand" aria-label="Custom Food Trailers home">' +
        '<img src="' + LOGO + '" alt="Custom Food Trailers UK logo" width="200" height="52" />' +
      "</a>" +
      '<nav aria-label="Primary"><ul class="nav-links">' + navLinks() + "</ul></nav>" +
      '<div class="nav-cta">' +
        '<a class="nav-phone" href="' + PHONE_LINK + '">' + PHONE + "</a>" +
        '<a class="btn btn--primary" href="build-your-own.html">Build Yours</a>' +
        '<button class="nav-toggle" aria-label="Menu" aria-expanded="false"><span></span><span></span><span></span></button>' +
      "</div>" +
    "</div>";
  document.body.insertBefore(header, document.body.firstChild);

  var toggle = header.querySelector(".nav-toggle");
  toggle.addEventListener("click", function () {
    var open = header.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });

  // ---------- Footer ----------
  var footer = document.createElement("footer");
  footer.className = "site-footer";
  footer.innerHTML =
    '<div class="container">' +
      '<div class="footer-grid">' +
        '<div class="footer-brand">' +
          '<img src="' + FOOTER_LOGO + '" alt="Custom Food Trailers UK logo" width="220" height="60" />' +
          "<p>Bespoke, professional grade food trailers and mobile kitchens, tailored to your requirements and delivered across the UK to UK and EU standards. Built to serve your business.</p>" +
          '<div class="social-row">' +
            '<a href="' + IG + '" aria-label="Instagram" rel="noopener" target="_blank" style="background:transparent"><svg width="34" height="34" viewBox="0 0 24 24" aria-hidden="true"><defs><linearGradient id="cftIg" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stop-color="#feda75"/><stop offset=".25" stop-color="#fa7e1e"/><stop offset=".5" stop-color="#d62976"/><stop offset=".75" stop-color="#962fbf"/><stop offset="1" stop-color="#4f5bd5"/></linearGradient></defs><rect width="24" height="24" rx="6" fill="url(#cftIg)"/><svg x="5" y="5" width="14" height="14" viewBox="0 0 448 512"><path fill="#fff" d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/></svg></svg></a>' +
            '<a href="' + FB + '" aria-label="Facebook" rel="noopener" target="_blank" style="background:transparent"><svg width="34" height="34" viewBox="0 0 24 24" aria-hidden="true"><rect width="24" height="24" rx="6" fill="#1877F2"/><svg x="5" y="5" width="14" height="14" viewBox="0 0 320 512"><path fill="#fff" d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"/></svg></svg></a>' +
            '<a href="' + LI + '" aria-label="LinkedIn" rel="noopener" target="_blank" style="background:transparent"><svg width="34" height="34" viewBox="0 0 24 24" aria-hidden="true"><rect width="24" height="24" rx="6" fill="#0A66C2"/><svg x="5" y="5" width="14" height="14" viewBox="0 0 448 512"><path fill="#fff" d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"/></svg></svg></a>' +
          "</div>" +
        "</div>" +
        '<div><h4>Explore</h4><ul class="footer-links">' +
          '<li><a href="our-trailers.html">Our Trailers</a></li>' +
          '<li><a href="build-your-own.html">Build Your Own</a></li>' +
          '<li><a href="buying-guide.html">Buying Guide</a></li>' +
          '<li><a href="about.html">About Us</a></li>' +
        "</ul></div>" +
        '<div><h4>Company</h4><ul class="footer-links">' +
          '<li><a href="contact.html">Contact</a></li>' +
          '<li><a href="' + PHONE_LINK + '">' + PHONE + "</a></li>" +
          '<li><a href="mailto:' + EMAIL + '">Email us</a></li>' +
        "</ul></div>" +
        '<div><h4>Visit</h4>' +
          "<p>Custom Food Trailers<br>Unit 12 Lakeland Food Park<br>Kendal, Cumbria LA8 8JQ</p>" +
          '<p style="margin-top:12px"><a class="btn btn--amber" href="contact.html">Get a Quote</a></p>' +
        "</div>" +
      "</div>" +
      '<div class="footer-bottom">' +
        "<span>&copy; " + new Date().getFullYear() + " Custom Food Trailers. All rights reserved.</span>" +
        '<span><a href="privacy.html">Privacy</a> &nbsp;&middot;&nbsp; <a href="terms.html">Terms</a></span>' +
      "</div>" +
    "</div>";
  document.body.appendChild(footer);

  // ---------- Form delivery ----------
  // Two ready paths. Pick one by editing the CONFIG below.
  //  A) FORMSPREE: paste your endpoint (https://formspree.io/f/xxxxxxx) into FORMSPREE_ENDPOINT.
  //  B) CLOUDFLARE FUNCTION + RESEND: set USE_FUNCTION = true (posts to /api/enquiry).
  // If neither is configured, forms still show a thank-you so the page never looks broken.
  var CONFIG = {
    FORMSPREE_ENDPOINT: "https://formspree.io/f/REPLACE_WITH_YOUR_ID",
    USE_FUNCTION: true,
    FUNCTION_URL: "/api/enquiry"
  };
  var OK_MSG = "Thank you, your enquiry has been received. We'll be in touch shortly.";
  var BUILDER_OK = "Thank you, your quote request has been received. We'll be in touch shortly, and a copy of your build has been sent to your email address.";
  var ERR_MSG = "Sorry, something went wrong. Please call 07826 551 503 or email andrew@customfoodtrailers.co.uk.";

  function setStatus(f, msg, ok) {
    var s = f.querySelector(".form-status");
    if (s) { s.textContent = msg; s.className = "form-status " + (ok ? "ok" : "err"); }
  }

  function showModal(ok, msg) {
    var prev = document.querySelector(".cft-modal");
    if (prev) prev.remove();
    var overlay = document.createElement("div");
    overlay.className = "cft-modal";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.style.cssText = "position:fixed;inset:0;background:rgba(16,61,42,.55);display:flex;align-items:center;justify-content:center;z-index:1000;padding:20px;";
    var icon = ok
      ? '<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>'
      : '<span style="color:#fff;font-size:1.6rem;font-weight:700">!</span>';
    var box = document.createElement("div");
    box.style.cssText = "background:#fff;max-width:430px;width:100%;border-radius:16px;padding:32px 28px;text-align:center;box-shadow:0 24px 60px rgba(0,0,0,.3);font-family:inherit";
    box.innerHTML =
      '<div style="width:58px;height:58px;border-radius:50%;background:' + (ok ? "#1c6b43" : "#b3261e") + ';display:grid;place-items:center;margin:0 auto 18px">' + icon + "</div>" +
      '<h3 style="margin:0 0 10px;color:#103d2a;font-size:1.3rem">' + (ok ? "Thank you" : "Something went wrong") + "</h3>" +
      '<p style="margin:0 0 24px;color:#555;font-size:.96rem;line-height:1.55">' + msg + "</p>" +
      '<button type="button" class="cft-modal-close" style="background:#1c6b43;color:#fff;border:0;border-radius:999px;padding:12px 30px;font-weight:600;cursor:pointer;font-size:.95rem">Close</button>';
    overlay.appendChild(box);
    document.body.appendChild(overlay);
    function close() { overlay.remove(); }
    overlay.addEventListener("click", function (e) { if (e.target === overlay) close(); });
    box.querySelector(".cft-modal-close").addEventListener("click", close);
    document.addEventListener("keydown", function esc(ev) { if (ev.key === "Escape") { close(); document.removeEventListener("keydown", esc); } });
  }

  var forms = document.querySelectorAll("form[data-contact]");
  forms.forEach(function (f) {
    f.addEventListener("submit", function (e) {
      e.preventDefault();
      var data = new FormData(f);

      // For the builder, attach the live estimate and chosen specification.
      if (f.id === "builderForm") {
        var totalEl = document.getElementById("total");
        if (totalEl) data.append("Estimated price", totalEl.textContent.trim());
        var spec = [];
        document.querySelectorAll("#breakdown li").forEach(function (li) { spec.push(li.textContent.trim()); });
        if (spec.length) data.append("Specification", spec.join("  |  "));
      }
      data.append("_source", "customfoodtrailers.co.uk (" + (page || "page") + ")");

      var endpoint = CONFIG.USE_FUNCTION ? CONFIG.FUNCTION_URL : CONFIG.FORMSPREE_ENDPOINT;
      var configured = CONFIG.USE_FUNCTION || CONFIG.FORMSPREE_ENDPOINT.indexOf("REPLACE_WITH_YOUR_ID") === -1;

      if (!configured) { setStatus(f, OK_MSG, true); f.reset(); return; }

      var btn = f.querySelector('[type="submit"]');
      if (btn) { btn.disabled = true; btn.dataset.label = btn.textContent; btn.textContent = "Sending…"; }

      fetch(endpoint, { method: "POST", body: data, headers: { Accept: "application/json" } })
        .then(function (r) { if (!r.ok) throw new Error("bad status"); return r; })
        .then(function () { var m = f.id === "builderForm" ? BUILDER_OK : OK_MSG; setStatus(f, m, true); showModal(true, m); f.reset(); })
        .catch(function () { setStatus(f, ERR_MSG, false); showModal(false, ERR_MSG); })
        .finally(function () { if (btn) { btn.disabled = false; btn.textContent = btn.dataset.label || "Send"; } });
    });
  });

  // ---------- Simple lightbox for galleries ----------
  var galleryImgs = document.querySelectorAll("[data-lightbox] img");
  if (galleryImgs.length) {
    var lb = document.createElement("div");
    lb.style.cssText = "position:fixed;inset:0;background:rgba(16,61,42,.9);display:none;align-items:center;justify-content:center;z-index:100;padding:30px;cursor:zoom-out";
    lb.innerHTML = '<img style="max-width:92%;max-height:92%;border-radius:12px;box-shadow:0 20px 60px rgba(0,0,0,.5)" alt="">';
    document.body.appendChild(lb);
    var lbImg = lb.querySelector("img");
    galleryImgs.forEach(function (im) {
      im.style.cursor = "zoom-in";
      im.addEventListener("click", function () { lbImg.src = im.src; lbImg.alt = im.alt; lb.style.display = "flex"; });
    });
    lb.addEventListener("click", function () { lb.style.display = "none"; });
  }
})();
