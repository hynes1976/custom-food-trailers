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
            '<a href="' + IG + '" aria-label="Instagram" rel="noopener" target="_blank">IG</a>' +
            '<a href="' + FB + '" aria-label="Facebook" rel="noopener" target="_blank">f</a>' +
            '<a href="' + LI + '" aria-label="LinkedIn" rel="noopener" target="_blank">in</a>' +
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
