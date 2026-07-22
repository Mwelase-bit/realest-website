/* API layer for inquiry submission.
   Point VITE_API_URL at a real backend (e.g. POST /api/inquiries) when ready.
   Without one, submissions resolve locally so the UX can be fully exercised. */

export type Inquiry = {
  name: string;
  email: string;
  topic: string;
  message: string;
};

export type InquiryErrors = Partial<Record<keyof Inquiry, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateInquiry(data: Inquiry): InquiryErrors {
  const errors: InquiryErrors = {};
  if (!data.name.trim()) errors.name = "Add your name so we know who's reaching out.";
  if (!data.email.trim()) errors.email = "Add an email so we can reply.";
  else if (!EMAIL_RE.test(data.email)) errors.email = "That email doesn't look right — check the format.";
  if (!data.topic) errors.topic = "Pick what this is about.";
  if (data.message.trim().length < 10)
    errors.message = "Tell us a little more — at least 10 characters.";
  return errors;
}

export async function submitInquiry(data: Inquiry): Promise<{ ok: boolean }> {
  const base = import.meta.env.VITE_API_URL as string | undefined;

  if (base) {
    const res = await fetch(`${base.replace(/\/$/, "")}/inquiries`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error(`Inquiry failed with status ${res.status}`);
    return { ok: true };
  }

  /* Local fallback: simulate network latency so loading states are visible. */
  await new Promise((r) => setTimeout(r, 900));
  console.info("[realest] inquiry captured locally:", data);
  return { ok: true };
}
