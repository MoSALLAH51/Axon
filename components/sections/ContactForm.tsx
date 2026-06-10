"use client";

import { useState } from "react";
import { useLocaleContext } from "@/components/providers/LocaleProvider";
import { cn } from "@/lib/utils";

const T = {
  en: {
    name:        "Your Name",
    email:       "Email Address",
    phone:       "Phone Number",
    message:     "Your Message",
    send:        "Send Message →",
    sending:     "Sending...",
    success:     "✓ Message sent successfully!",
    error:       "Something went wrong. Please try again.",
  },
  ar: {
    name:        "الاسم الكامل",
    email:       "البريد الإلكتروني",
    phone:       "رقم الهاتف",
    message:     "رسالتك",
    send:        "→ إرسال الرسالة",
    sending:     "جارٍ الإرسال...",
    success:     "✓ تم إرسال رسالتك بنجاح!",
    error:       "حدث خطأ ما. يرجى المحاولة مرة أخرى.",
  },
};

export function ContactForm() {
  const { locale } = useLocaleContext();
  const isRTL = locale === "ar";
  const t = T[locale];

  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) return;
    setStatus("loading");
    try {
      const { apiPost } = await import("@/lib/api");
      await apiPost("/contact", form);
      setStatus("success");
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  const inputClass = cn(
    "w-full px-4 py-3 rounded-lg border border-sand-200 bg-white text-sm text-charcoal-900 placeholder:text-charcoal-400 focus:outline-none focus:border-forest-500 transition",
    isRTL && "text-right"
  );

  return (
    <div className={cn("flex flex-col gap-3", isRTL && "text-right")} dir={isRTL ? "rtl" : "ltr"}>

      <div className="grid grid-cols-2 gap-3">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder={t.name}
          className={inputClass}
        />
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder={t.email}
          type="email"
          className={inputClass}
          dir="ltr"
        />
      </div>

      <input
        name="phone"
        value={form.phone}
        onChange={handleChange}
        placeholder={t.phone}
        type="tel"
        className={inputClass}
        dir="ltr"
      />

      <textarea
        name="message"
        value={form.message}
        onChange={handleChange}
        placeholder={t.message}
        rows={5}
        className={cn(inputClass, "resize-none")}
      />

      {status === "success" && (
        <p className="text-sm text-forest-700 font-medium">{t.success}</p>
      )}
      {status === "error" && (
        <p className="text-sm text-red-500 font-medium">{t.error}</p>
      )}

      <button
        onClick={handleSubmit}
        disabled={status === "loading"}
        className={cn(
          "inline-flex items-center gap-2 px-6 py-3 bg-forest-700 hover:bg-forest-800 text-white text-sm font-semibold rounded-lg transition-all disabled:opacity-60",
          isRTL ? "self-end" : "self-start"
        )}
      >
        {status === "loading" ? t.sending : t.send}
      </button>

    </div>
  );
}