// Cloudflare Pages Function — POST /api/enquiry
// Sends form enquiries to your inbox via Resend. Mirrors the Wake District setup.
//
// To switch this on:
//   1. In assets/js/main.js set CONFIG.USE_FUNCTION = true.
//   2. In Cloudflare → Pages → Settings → Variables, add:
//        RESEND_API_KEY   your Resend API key (re_...)
//        FROM_EMAIL       a verified sender, e.g. website@customfoodtrailers.co.uk
//        BOOKINGS_EMAIL   where enquiries land, e.g. andrew@customfoodtrailers.co.uk
//   3. Redeploy (variable changes only take effect on the next build).

export async function onRequestPost({ request, env }) {
  const cors = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
  };
  try {
    const ct = request.headers.get("content-type") || "";
    let fields = {};
    if (ct.includes("application/json")) {
      fields = await request.json();
    } else {
      const form = await request.formData();
      for (const [k, v] of form.entries()) fields[k] = v;
    }

    // Honeypot: bots fill hidden fields.
    if (fields._gotcha) return json({ ok: true }, 200, cors);

    const name = (fields.name || "").toString().slice(0, 200);
    const email = (fields.email || "").toString().slice(0, 200);
    if (!name || !email) return json({ ok: false, error: "Missing name or email" }, 400, cors);

    const rows = Object.entries(fields)
      .filter(([k]) => !k.startsWith("_"))
      .map(([k, v]) => `<tr><td style="padding:6px 12px;font-weight:bold;background:#f4f8f5">${esc(k)}</td><td style="padding:6px 12px">${esc(v)}</td></tr>`)
      .join("");

    const html = `<h2 style="color:#103d2a">New enquiry from customfoodtrailers.co.uk</h2>
      <table style="border-collapse:collapse;font-family:Arial">${rows}</table>`;

    if (!env.RESEND_API_KEY) {
      // Not configured yet — accept gracefully so the form still works.
      return json({ ok: true, note: "Received (Resend not configured yet)" }, 200, cors);
    }

    const FROM = env.FROM_EMAIL || "website@customfoodtrailers.co.uk";
    const recipients = (env.BOOKINGS_EMAIL || "andrew@customfoodtrailers.co.uk")
      .split(",").map(s => s.trim()).filter(Boolean);
    const primary = recipients[0] || "andrew@customfoodtrailers.co.uk";

    const send = (payload) => fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    // 1) Internal notification to the business.
    const res = await send({
      from: FROM,
      to: recipients,
      reply_to: email,
      subject: `New enquiry — ${name}`,
      html
    });
    if (!res.ok) return json({ ok: false, error: "Email send failed" }, 502, cors);

    // 2) Quote (builder) requests: also send the customer a copy of their build.
    const isQuote = /quote/i.test((fields.enquiry_type || "").toString());
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (isQuote && emailValid) {
      const custHtml = `<h2 style="color:#103d2a">Thank you for your quote request</h2>
        <p style="font-family:Arial;color:#333">Hi ${esc(name)}, thanks for designing your trailer with Custom Food Trailers UK. Here is a summary of your build. Our team will be in touch shortly to confirm your formal quote.</p>
        <table style="border-collapse:collapse;font-family:Arial">${rows}</table>
        <p style="font-family:Arial;color:#333">Any questions? Call 07826 551 503 or simply reply to this email.</p>
        <p style="font-family:Arial;color:#888;font-size:12px">Custom Food Trailers UK, Unit 12 Lakeland Food Park, Kendal, Cumbria LA8 8JQ</p>`;
      try {
        await send({
          from: FROM,
          to: [email],
          reply_to: primary,
          subject: "Your Custom Food Trailers quote",
          html: custHtml
        });
      } catch (e) { /* customer copy is best effort; ignore failures */ }
    }

    return json({ ok: true }, 200, cors);
  } catch (e) {
    return json({ ok: false, error: "Server error" }, 500, cors);
  }
}

export function onRequestOptions() {
  return new Response(null, { status: 204, headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
  }});
}

function json(obj, status, cors) {
  return new Response(JSON.stringify(obj), { status, headers: { "Content-Type": "application/json", ...cors } });
}
function esc(s) {
  return String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}
