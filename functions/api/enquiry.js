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

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: env.FROM_EMAIL || "website@customfoodtrailers.co.uk",
        to: (env.BOOKINGS_EMAIL || "andrew@customfoodtrailers.co.uk").split(",").map(function (s) { return s.trim(); }).filter(Boolean),
        reply_to: email,
        subject: `New enquiry — ${name}`,
        html
      })
    });
    if (!res.ok) return json({ ok: false, error: "Email send failed" }, 502, cors);
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
