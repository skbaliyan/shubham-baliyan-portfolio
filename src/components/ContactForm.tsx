import { useRef, useState } from 'react'
import { AlertCircle, Check, Loader2 } from 'lucide-react'
import { site } from '@/data/site'
import { Reveal } from '@/components/primitives'

/* ============================================================
   CONTACT FORM

   Static site, so there is no server of our own. The form posts
   url-encoded to "/" with a `form-name` field, which is what
   Netlify Forms reads. A matching static form lives in
   index.html so Netlify's build-time crawler can detect it —
   without that, a React-rendered form is invisible to it.

   If the POST fails — running locally, or deployed somewhere
   without form handling — it does not pretend to have sent
   anything. It says so and hands over a mailto with the message
   already composed, so the visitor never loses what they typed.
   ============================================================ */

const FORM_NAME = 'contact'

type Status = 'idle' | 'sending' | 'sent' | 'fallback' | 'error'

interface Fields {
  name: string
  email: string
  message: string
}

const EMPTY: Fields = { name: '', email: '', message: '' }

const validate = (f: Fields) => {
  const errors: Partial<Record<keyof Fields, string>> = {}
  if (!f.name.trim()) errors.name = 'Please enter your name.'
  if (!f.email.trim()) errors.email = 'Please enter an email address.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim()))
    errors.email = 'That does not look like an email address.'
  if (!f.message.trim()) errors.message = 'Please write a message.'
  else if (f.message.trim().length < 10)
    errors.message = 'A little more detail would help.'
  return errors
}

const mailtoFor = (f: Fields) =>
  `mailto:${site.email}?subject=${encodeURIComponent(
    `Portfolio enquiry — ${f.name || 'no name given'}`,
  )}&body=${encodeURIComponent(`${f.message}\n\n— ${f.name}\n${f.email}`)}`

const fieldClasses = (invalid: boolean) =>
  [
    'w-full border bg-transparent px-4 py-3.5',
    'font-ui text-[0.9375rem] text-paper placeholder:text-paper/50',
    'transition-colors duration-500 ease-editorial',
    'focus:border-acid focus:outline-none',
    invalid ? 'border-acid' : 'border-paper/20 hover:border-paper/40',
  ].join(' ')

export const ContactForm = () => {
  const [fields, setFields] = useState<Fields>(EMPTY)
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({})
  const [status, setStatus] = useState<Status>('idle')
  const formRef = useRef<HTMLFormElement>(null)

  const set = (key: keyof Fields) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFields((f) => ({ ...f, [key]: e.target.value }))
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }))
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const found = validate(fields)
    setErrors(found)
    if (Object.keys(found).length) {
      // Move focus to the first thing that needs fixing.
      const first = (['name', 'email', 'message'] as const).find((k) => found[k])
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus()
      return
    }

    // A dev server answers POST / with 200 and the HTML shell, so trusting
    // the status code here would show "message sent" when nothing was sent.
    // Never claim delivery we cannot stand behind: locally, go straight to
    // the honest fallback.
    if (import.meta.env.DEV) {
      setStatus('fallback')
      return
    }

    setStatus('sending')
    const body = new URLSearchParams({ 'form-name': FORM_NAME, ...fields })

    try {
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      })
      if (!res.ok) throw new Error(String(res.status))
      setStatus('sent')
      setFields(EMPTY)
    } catch {
      setStatus('fallback')
    }
  }

  const invalid = (k: keyof Fields) => Boolean(errors[k])
  const describedBy = (k: keyof Fields) => (errors[k] ? `${k}-error` : undefined)

  return (
    <Reveal variant="fade">
      <form
        ref={formRef}
        name={FORM_NAME}
        method="POST"
        data-netlify="true"
        netlify-honeypot="company"
        onSubmit={onSubmit}
        noValidate
        className="max-w-2xl"
      >
        <input type="hidden" name="form-name" value={FORM_NAME} />

        {/* Honeypot — hidden from people, tempting to bots. */}
        <p className="hidden" aria-hidden="true">
          <label>
            Do not fill this in
            <input name="company" tabIndex={-1} autoComplete="off" />
          </label>
        </p>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className="meta block text-paper/55">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              value={fields.name}
              onChange={set('name')}
              aria-invalid={invalid('name')}
              aria-describedby={describedBy('name')}
              className={`mt-3 ${fieldClasses(invalid('name'))}`}
              placeholder="Your name"
            />
            {errors.name ? (
              <p id="name-error" className="mt-2 meta text-acid">
                {errors.name}
              </p>
            ) : null}
          </div>

          <div>
            <label htmlFor="email" className="meta block text-paper/55">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={fields.email}
              onChange={set('email')}
              aria-invalid={invalid('email')}
              aria-describedby={describedBy('email')}
              className={`mt-3 ${fieldClasses(invalid('email'))}`}
              placeholder="you@company.com"
            />
            {errors.email ? (
              <p id="email-error" className="mt-2 meta text-acid">
                {errors.email}
              </p>
            ) : null}
          </div>
        </div>

        <div className="mt-6">
          <label htmlFor="message" className="meta block text-paper/55">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            value={fields.message}
            onChange={set('message')}
            aria-invalid={invalid('message')}
            aria-describedby={describedBy('message')}
            className={`mt-3 resize-y ${fieldClasses(invalid('message'))}`}
            placeholder="What are you building, or what are you hiring for?"
          />
          {errors.message ? (
            <p id="message-error" className="mt-2 meta text-acid">
              {errors.message}
            </p>
          ) : null}
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-6">
          <button
            type="submit"
            disabled={status === 'sending'}
            className="group relative inline-flex items-center justify-center gap-3 bg-acid px-8 py-3.5 font-ui text-meta-lg font-bold uppercase tracking-meta text-void transition-colors duration-500 ease-editorial hover:bg-paper focus-visible:bg-paper disabled:opacity-60"
          >
            {status === 'sending' ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
            ) : null}
            {status === 'sending' ? 'Sending' : 'Send Message'}
          </button>

          <a
            href={`mailto:${site.email}`}
            className="link-rule meta text-paper/55 transition-colors duration-500 ease-editorial hover:text-acid focus-visible:text-acid"
          >
            Or just email directly
          </a>
        </div>

        {/* Status. aria-live so it is announced, not just shown. */}
        <div aria-live="polite" className="mt-6">
          {status === 'sent' ? (
            <p className="flex items-start gap-3 border border-acid/50 bg-acid/[0.04] p-5 font-ui text-[0.875rem] leading-relaxed text-paper/80">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-acid" aria-hidden="true" />
              Message sent. You&rsquo;ll get a reply at the address you gave.
            </p>
          ) : null}

          {status === 'fallback' ? (
            <div className="border border-acid/50 bg-acid/[0.04] p-5">
              <p className="flex items-start gap-3 font-ui text-[0.875rem] leading-relaxed text-paper/80">
                <AlertCircle
                  className="mt-0.5 h-4 w-4 shrink-0 text-acid"
                  aria-hidden="true"
                />
                Nothing was sent — no form handler is answering here. Your message
                is safe below; open it in your mail client and it goes through
                unchanged.
              </p>
              <a
                href={mailtoFor(fields)}
                className="link-rule mt-4 inline-block meta text-acid"
              >
                Send it by email instead
              </a>
            </div>
          ) : null}
        </div>
      </form>
    </Reveal>
  )
}
