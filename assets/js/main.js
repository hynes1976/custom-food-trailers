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
          "<p>Bespoke, professional grade food trailers and mobile kitchens, hand built in Cumbria to UK and EU standards. Built to serve your business.</p>" +
          '<div class="social-row">' +
            '<a href="' + IG + '" aria-label="Instagram" rel="noopener" target="_blank"><svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg></a>' +
            '<a href="' + FB + '" aria-label="Facebook" rel="noopener" target="_blank"><svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z"/></svg></a>' +
            '<a href="' + LI + '" aria-label="LinkedIn" rel="noopener" target="_blank"><svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/></svg></a>' +
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
  var ERR_MSG = "Sorry, something went wrong. Please call 07826 551 503 or email andrew@customfoodtrailers.co.uk.";

  function setStatus(f, msg, ok) {
    var s = f.querySelector(".form-status");
    if (s) { s.textContent = msg; s.className = "form-status " + (ok ? "ok" : "err"); }
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
        .then(function () { setStatus(f, OK_MSG, true); f.reset(); })
        .catch(function () { setStatus(f, ERR_MSG, false); })
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
