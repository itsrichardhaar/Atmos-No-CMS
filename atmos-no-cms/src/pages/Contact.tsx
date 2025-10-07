// src/pages/Contact.tsx
import { useState } from "react";
import type { FormEvent } from "react";
import "./Contact.css";

export default function Contact() {
  const [submitting, setSubmitting] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);

    // TODO: wire up to your backend or 3rd-party form service
    // For now we just simulate success:
    setTimeout(() => {
      setSubmitting(false);
      (e.currentTarget as HTMLFormElement).reset();
      alert("Thanks! We received your message.");
    }, 500);
  }

  return (
    <section className="contact">
      <div className="contact__wrap">
        <p className="contact__tagline">Tagline</p>
        <h1 className="contact__title">Contact us</h1>
        <p className="contact__intro">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>

        <form className="contactForm" onSubmit={onSubmit} noValidate>
          {/* Row: First/Last */}
          <div className="contactForm__row contactForm__row--2">
            <div className="field">
              <label htmlFor="first">First name</label>
              <input id="first" name="first" type="text" autoComplete="given-name" />
            </div>
            <div className="field">
              <label htmlFor="last">Last name</label>
              <input id="last" name="last" type="text" autoComplete="family-name" />
            </div>
          </div>

          {/* Row: Email/Phone */}
          <div className="contactForm__row contactForm__row--2">
            <div className="field">
              <label htmlFor="email">Email</label>
              <input id="email" name="email" type="email" autoComplete="email" required />
            </div>
            <div className="field">
              <label htmlFor="phone">Phone number</label>
              <input id="phone" name="phone" type="tel" autoComplete="tel" />
            </div>
          </div>

          {/* Topic select */}
          <div className="contactForm__row">
            <div className="field">
              <label htmlFor="topic">Choose a topic</label>
              <div className="selectWrap">
                <select id="topic" name="topic" defaultValue="">
                  <option value="" disabled>
                    Select one…
                  </option>
                  <option>Sales / New project</option>
                  <option>Service & Support</option>
                  <option>Partnerships</option>
                  <option>Careers</option>
                  <option>Other</option>
                </select>
                <span className="selectCaret" aria-hidden="true">▾</span>
              </div>
            </div>
          </div>

          {/* Radios two-column */}
          <fieldset className="contactForm__row contactForm__radios">
            <legend>Which best describes you?</legend>

            <div className="radioCol">
              <label className="radio">
                <input type="radio" name="persona" value="first" />
                <span>First choice</span>
              </label>
              <label className="radio">
                <input type="radio" name="persona" value="third" />
                <span>Third choice</span>
              </label>
              <label className="radio">
                <input type="radio" name="persona" value="fifth" />
                <span>Fifth choice</span>
              </label>
            </div>

            <div className="radioCol">
              <label className="radio">
                <input type="radio" name="persona" value="second" />
                <span>Second choice</span>
              </label>
              <label className="radio">
                <input type="radio" name="persona" value="fourth" />
                <span>Fourth choice</span>
              </label>
              <label className="radio">
                <input type="radio" name="persona" value="other" />
                <span>Other</span>
              </label>
            </div>
          </fieldset>

          {/* Message */}
          <div className="contactForm__row">
            <div className="field">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" rows={7} placeholder="Type your message..." />
            </div>
          </div>

          {/* Submit */}
          <div className="contactForm__actions">
            <button className="btn btn--primary contactForm__submit" disabled={submitting} type="submit">
              {submitting ? "Submitting…" : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}


