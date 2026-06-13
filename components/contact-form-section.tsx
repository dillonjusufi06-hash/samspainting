import { ContactForm } from "@/components/contact-form";

export function ContactFormBlock() {
  return (
    <div className="max-w-lg mx-auto space-y-8">
      <div className="text-center space-y-3">
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900">
          Contact Sam
        </h2>
        <p className="text-sm text-neutral-600 leading-relaxed">
          Send a message for a free estimate. We&apos;ll get back to you as soon as possible.
        </p>
      </div>
      <ContactForm />
    </div>
  );
}

export function ContactFormSection() {
  return (
    <section className="pb-16 sm:pb-24 bg-neutral-50 border-t border-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <ContactFormBlock />
      </div>
    </section>
  );
}
