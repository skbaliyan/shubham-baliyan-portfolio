import React, { useEffect, useRef, useState } from 'react'
import {
  AlertCircle,
  Check,
  Copy,
  MessageSquare,
  RotateCcw,
  Send,
  Sparkles,
  Square,
  X,
} from 'lucide-react'

/* ============================================================
   CHAT WIDGET
   Floating streaming AI chat interface powered by Netlify AI Gateway.
   Scoped to Shubham Baliyan's portfolio and recruiting systems.
   Brutalist Editorial aesthetic: Void, Paper, Acid, Hairlines.
   ============================================================ */

interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
}

const INITIAL_WELCOME: ChatMessage = {
  id: 'welcome',
  role: 'assistant',
  content: `Welcome to Shubham Baliyan's portfolio. I am his AI assistant powered by Netlify AI Gateway.

Ask me about:
• HireOS and the Gate to Fit to Submit screening engine
• 5+ years of full-cycle US IT technical recruiting track record
• AI workflows, sourcing automation (Apify, Clay, GPT-4o, Smartlead)
• Technical capabilities, ATS/VMS compliance, or direct contact details.`,
}

const STARTER_PROMPTS = [
  'Tell me about HireOS and Gate to Fit',
  "What is Shubham's recruiting track record?",
  'What AI & automation tools did he build?',
  'How can I get in touch with Shubham?',
]

/** Formatter for assistant responses: renders bold text, code blocks, lists, and links. */
const FormattedContent: React.FC<{ content: string; isStreaming?: boolean }> = ({
  content,
  isStreaming,
}) => {
  const [copiedCodeIndex, setCopiedCodeIndex] = useState<number | null>(null)

  const copyToClipboard = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedCodeIndex(index)
      setTimeout(() => setCopiedCodeIndex(null), 2000)
    } catch {
      // Clipboard write failed
    }
  }

  // Split by code blocks first
  const parts = content.split(/(```[\s\S]*?```)/g)

  return (
    <div className="space-y-2.5 font-ui text-[0.875rem] leading-relaxed text-paper/90">
      {parts.map((part, pIdx) => {
        if (part.startsWith('```') && part.endsWith('```')) {
          const lines = part.slice(3, -3).trim().split('\n')
          const firstLine = lines[0]?.trim() || ''
          const hasLang = /^[a-zA-Z0-9_-]+$/.test(firstLine)
          const language = hasLang ? firstLine : 'text'
          const codeBody = hasLang ? lines.slice(1).join('\n') : lines.join('\n')

          return (
            <div
              key={`code-${pIdx}`}
              className="my-3 overflow-hidden border border-paper/15 bg-void text-xs"
            >
              <div className="flex items-center justify-between border-b border-paper/10 bg-paper/[0.04] px-3 py-1.5 font-mono text-[10px] uppercase tracking-meta text-paper/50">
                <span>{language}</span>
                <button
                  type="button"
                  onClick={() => copyToClipboard(codeBody, pIdx)}
                  className="flex items-center gap-1 text-paper/60 hover:text-acid"
                >
                  {copiedCodeIndex === pIdx ? (
                    <>
                      <Check className="h-3 w-3 text-acid" />
                      <span className="text-acid">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="overflow-x-auto p-3 font-mono text-paper/95 leading-normal">
                <code>{codeBody}</code>
              </pre>
            </div>
          )
        }

        // Render normal paragraphs, bullet points, and inline styling
        const paragraphs = part.split('\n\n')

        return (
          <React.Fragment key={`text-${pIdx}`}>
            {paragraphs.map((paragraph, paraIdx) => {
              if (!paragraph.trim()) return null

              const lines = paragraph.split('\n')
              const isBulletList = lines.every((l) => /^[•\-\*]\s+/.test(l.trim()))
              const isNumberedList = lines.every((l) => /^\d+\.\s+/.test(l.trim()))

              if (isBulletList || isNumberedList) {
                return (
                  <ul key={`list-${paraIdx}`} className="my-1.5 space-y-1 pl-4">
                    {lines.map((item, lIdx) => {
                      const cleanItem = item.replace(/^[•\-\*]\s+|^\d+\.\s+/, '')
                      return (
                        <li
                          key={`item-${lIdx}`}
                          className="list-disc text-paper/85 pl-1 leading-relaxed"
                        >
                          {renderInlineFormatted(cleanItem)}
                        </li>
                      )
                    })}
                  </ul>
                )
              }

              return (
                <p key={`p-${paraIdx}`} className="leading-relaxed">
                  {lines.map((line, lIdx) => (
                    <React.Fragment key={`l-${lIdx}`}>
                      {renderInlineFormatted(line)}
                      {lIdx < lines.length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </p>
              )
            })}
          </React.Fragment>
        )
      })}
      {isStreaming && (
        <span
          aria-hidden="true"
          className="ml-1 inline-block h-4 w-1.5 animate-pulse bg-acid align-middle"
        />
      )}
    </div>
  )
}

/** Parses inline bold (**text**), inline code (`code`), and links [text](url). */
function renderInlineFormatted(text: string): React.ReactNode {
  const tokens = text.split(/(\*\*.*?\*\*|`.*?`|\[.*?\]\(.*?\))/g)

  return tokens.map((token, idx) => {
    if (token.startsWith('**') && token.endsWith('**')) {
      return (
        <strong key={idx} className="font-semibold text-paper">
          {token.slice(2, -2)}
        </strong>
      )
    }
    if (token.startsWith('`') && token.endsWith('`')) {
      return (
        <code
          key={idx}
          className="border border-paper/15 bg-paper/[0.07] px-1 py-0.5 font-mono text-[0.8125rem] text-acid"
        >
          {token.slice(1, -1)}
        </code>
      )
    }
    const linkMatch = token.match(/^\[(.*?)\]\((.*?)\)$/)
    if (linkMatch) {
      return (
        <a
          key={idx}
          href={linkMatch[2]}
          target={linkMatch[2].startsWith('http') ? '_blank' : undefined}
          rel={linkMatch[2].startsWith('http') ? 'noopener noreferrer' : undefined}
          className="text-acid underline decoration-acid/50 underline-offset-2 hover:decoration-acid"
        >
          {linkMatch[1]}
        </a>
      )
    }
    return token
  })
}

export const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_WELCOME])
  const [input, setInput] = useState('')
  const [isStreaming, setIsStreaming] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const abortControllerRef = useRef<AbortController | null>(null)
  const messagesEndRef = useRef<HTMLDivElement | null>(null)
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)

  // Scroll to bottom whenever messages change or streaming updates
  const scrollToBottom = (behavior: ScrollBehavior = 'smooth') => {
    messagesEndRef.current?.scrollIntoView({ behavior })
  }

  useEffect(() => {
    if (isOpen) {
      scrollToBottom('auto')
      // Auto-focus input on open
      setTimeout(() => textareaRef.current?.focus(), 150)
    }
  }, [isOpen])

  useEffect(() => {
    scrollToBottom(isStreaming ? 'auto' : 'smooth')
  }, [messages, isStreaming])

  // Cleanup abort controller on unmount
  useEffect(() => {
    return () => {
      abortControllerRef.current?.abort()
    }
  }, [])

  const stopStreaming = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
      abortControllerRef.current = null
    }
    setIsStreaming(false)
  }

  const resetChat = () => {
    stopStreaming()
    setMessages([INITIAL_WELCOME])
    setError(null)
    setInput('')
  }

  const sendMessage = async (promptText?: string) => {
    const textToSend = (promptText ?? input).trim()
    if (!textToSend || isStreaming) return

    setError(null)
    setInput('')

    const userMessage: ChatMessage = {
      id: `u-${Date.now()}`,
      role: 'user',
      content: textToSend,
    }

    const assistantPlaceholderId = `a-${Date.now()}`
    const assistantPlaceholder: ChatMessage = {
      id: assistantPlaceholderId,
      role: 'assistant',
      content: '',
    }

    // Build payload: exclude initial client-side greeting if id is 'welcome'
    const payloadMessages = [
      ...messages
        .filter((m) => m.id !== 'welcome')
        .map((m) => ({ role: m.role, content: m.content })),
      { role: 'user', content: textToSend },
    ]

    setMessages((prev) => [...prev, userMessage, assistantPlaceholder])
    setIsStreaming(true)

    const abortController = new AbortController()
    abortControllerRef.current = abortController

    try {
      // Try /api/chat first, fallback to /.netlify/functions/chat if 404
      let response: Response
      try {
        response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: payloadMessages }),
          signal: abortController.signal,
        })
      } catch (networkErr: any) {
        if (networkErr.name === 'AbortError') {
          return
        }
        // Fallback endpoint attempt
        response = await fetch('/.netlify/functions/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: payloadMessages }),
          signal: abortController.signal,
        })
      }

      if (!response.ok) {
        let errMessage = `Error ${response.status}`
        try {
          const errData = await response.json()
          errMessage = errData.error || errMessage
        } catch {
          const rawText = await response.text()
          if (rawText) errMessage = rawText.slice(0, 150)
        }
        throw new Error(errMessage)
      }

      if (!response.body) {
        throw new Error('Response stream not supported')
      }

      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let accumulated = ''
      let buffer = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split('\n')
        buffer = lines.pop() || ''

        for (const line of lines) {
          const trimmed = line.trim()
          if (!trimmed || trimmed.startsWith(':')) continue

          if (trimmed.startsWith('data: ')) {
            const dataContent = trimmed.slice(6).trim()
            if (dataContent === '[DONE]') {
              break
            }

            try {
              const parsed = JSON.parse(dataContent)
              if (parsed.content) {
                accumulated += parsed.content
              } else if (parsed.text) {
                accumulated += parsed.text
              } else if (parsed.error) {
                throw new Error(parsed.error)
              }
            } catch {
              // Direct string chunk
              accumulated += dataContent
            }
          } else {
            accumulated += trimmed
          }

          // Update assistant message content progressively
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === assistantPlaceholderId
                ? { ...msg, content: accumulated }
                : msg,
            ),
          )
        }
      }

      // Final check for trailing buffer
      if (buffer.trim().startsWith('data: ')) {
        const rest = buffer.trim().slice(6).trim()
        if (rest && rest !== '[DONE]') {
          try {
            const parsed = JSON.parse(rest)
            accumulated += parsed.content || parsed.text || ''
          } catch {
            accumulated += rest
          }
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === assistantPlaceholderId
                ? { ...msg, content: accumulated }
                : msg,
            ),
          )
        }
      }
    } catch (err: any) {
      if (err.name === 'AbortError') {
        // User aborted intentionally
        return
      }
      console.error('Chat stream error:', err)
      const errorMsg = err.message || 'Stream interrupted'
      setError(errorMsg)
      // Provide fallback content if stream failed completely
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === assistantPlaceholderId && !msg.content
            ? {
                ...msg,
                content:
                  'Unable to complete response via Netlify AI Gateway. Please check your connection and try again.',
              }
            : msg,
        ),
      )
    } finally {
      setIsStreaming(false)
      abortControllerRef.current = null
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <>
      {/* ============================================================
          FLOATING TRIGGER BUTTON — Bottom-Right
          ============================================================ */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label={isOpen ? 'Close AI Portfolio Assistant' : 'Open AI Portfolio Assistant'}
          aria-expanded={isOpen}
          className="group relative flex items-center gap-3 border border-paper/20 bg-void/90 px-4 py-3 text-paper shadow-2xl backdrop-blur-md transition-all duration-300 hover:border-acid focus:outline-none"
        >
          {/* Pulsing online status indicator */}
          <span aria-hidden="true" className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-pulse-dot rounded-full bg-acid" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-acid" />
          </span>

          <span className="meta text-[11px] tracking-meta font-medium text-paper group-hover:text-acid transition-colors">
            {isOpen ? 'Close Terminal' : 'AI Assistant'}
          </span>

          <div className="flex items-center justify-center border-l border-paper/15 pl-2.5">
            {isOpen ? (
              <X className="h-4 w-4 text-paper/70 group-hover:text-acid" />
            ) : (
              <MessageSquare className="h-4 w-4 text-paper/70 group-hover:text-acid" />
            )}
          </div>
        </button>
      </div>

      {/* ============================================================
          CHAT WINDOW PANEL — Floating Bottom-Right
          ============================================================ */}
      {isOpen && (
        <section
          role="dialog"
          aria-label="AI Portfolio Assistant Chat"
          className="fixed bottom-20 right-4 sm:right-6 z-50 flex h-[620px] max-h-[82vh] w-[calc(100vw-2rem)] sm:w-[420px] flex-col border border-paper/20 bg-void/95 shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-bottom-4 duration-300"
        >
          {/* Header Bar */}
          <header className="flex h-14 items-center justify-between border-b border-paper/15 px-4 bg-void/90">
            <div className="flex items-center gap-2.5">
              <span aria-hidden="true" className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-pulse-dot rounded-full bg-acid" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-acid" />
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="meta text-[11px] font-medium tracking-meta text-paper">
                    SYS // AI-GATEWAY
                  </h2>
                  <span className="meta text-[9px] text-acid">ONLINE</span>
                </div>
                <p className="font-ui text-[10px] text-paper/50">
                  GPT-5.2 · Low-Latency Stream
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={resetChat}
                title="Reset conversation"
                className="p-1.5 text-paper/60 transition-colors hover:text-acid focus:outline-none"
              >
                <RotateCcw className="h-4 w-4" />
                <span className="sr-only">Reset conversation</span>
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                title="Close chat"
                className="p-1.5 text-paper/60 transition-colors hover:text-paper focus:outline-none"
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Close chat</span>
              </button>
            </div>
          </header>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => {
              const isUser = message.role === 'user'

              return (
                <div
                  key={message.id}
                  className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                >
                  {/* Sender Meta Label */}
                  <span
                    className={`meta mb-1.5 text-[9px] tracking-meta ${
                      isUser ? 'text-paper/45' : 'text-acid flex items-center gap-1.5'
                    }`}
                  >
                    {!isUser && <Sparkles className="h-2.5 w-2.5 text-acid" />}
                    {isUser ? 'YOU' : 'SHUBHAM.AI'}
                  </span>

                  {/* Message Bubble */}
                  <div
                    className={`max-w-[92%] px-4 py-3 text-sm ${
                      isUser
                        ? 'border border-paper/20 bg-paper/[0.08] text-paper leading-relaxed'
                        : 'border border-paper/15 bg-void text-paper/90 leading-relaxed shadow-sm'
                    }`}
                  >
                    {isUser ? (
                      <p className="font-ui text-[0.875rem] whitespace-pre-wrap leading-relaxed">
                        {message.content}
                      </p>
                    ) : (
                      <FormattedContent
                        content={message.content}
                        isStreaming={
                          isStreaming &&
                          message.id === messages[messages.length - 1]?.id
                        }
                      />
                    )}
                  </div>
                </div>
              )
            })}

            {/* Waiting for first stream token */}
            {isStreaming &&
              messages[messages.length - 1]?.role === 'assistant' &&
              !messages[messages.length - 1]?.content && (
                <div className="flex items-center gap-2 border border-paper/10 bg-paper/[0.03] p-3 text-xs text-paper/60">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-pulse-dot rounded-full bg-acid" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-acid" />
                  </span>
                  <span className="meta text-[9px] tracking-meta">
                    CONNECTING TO AI GATEWAY...
                  </span>
                </div>
              )}

            {/* Inline Error Notice */}
            {error && (
              <div className="flex items-center justify-between border border-acid/40 bg-acid/[0.08] p-3 text-xs text-paper">
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-acid shrink-0" />
                  <span className="text-paper/90">{error}</span>
                </div>
                <button
                  type="button"
                  onClick={() => sendMessage()}
                  className="meta text-[10px] text-acid underline hover:text-paper"
                >
                  Retry
                </button>
              </div>
            )}

            {/* Quick Starter Prompts — displayed when only welcome message exists */}
            {messages.length === 1 && (
              <div className="pt-2">
                <p className="meta mb-2.5 text-[9px] text-paper/40">
                  SUGGESTED QUERIES
                </p>
                <div className="flex flex-col gap-1.5">
                  {STARTER_PROMPTS.map((prompt) => (
                    <button
                      key={prompt}
                      type="button"
                      onClick={() => sendMessage(prompt)}
                      className="border border-paper/15 bg-paper/[0.03] px-3 py-2 text-left font-ui text-xs text-paper/80 transition-colors duration-200 hover:border-acid hover:text-acid"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input & Control Footer */}
          <footer className="border-t border-paper/15 bg-void/90 p-3">
            <div className="relative">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                rows={2}
                placeholder="Ask about HireOS, recruiting track record, AI tools..."
                aria-label="Your message"
                className="w-full resize-none border border-paper/20 bg-void/70 p-2.5 font-ui text-sm text-paper placeholder:text-paper/40 transition-colors focus:border-acid focus:outline-none"
              />
            </div>

            <div className="mt-2.5 flex items-center justify-between">
              <span className="meta text-[9px] tracking-meta text-paper/40">
                ENTER TO TRANSMIT · SHIFT+ENTER NEWLINE
              </span>

              <div className="flex items-center gap-2">
                {isStreaming ? (
                  <button
                    type="button"
                    onClick={stopStreaming}
                    className="flex items-center gap-1.5 border border-paper/30 bg-paper/10 px-3 py-1.5 font-ui text-[11px] font-medium uppercase tracking-meta text-paper transition-colors hover:bg-paper/20"
                  >
                    <Square className="h-3 w-3 fill-current" />
                    <span>Stop</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => sendMessage()}
                    disabled={!input.trim()}
                    className="flex items-center gap-1.5 bg-acid px-3.5 py-1.5 font-ui text-[11px] font-semibold uppercase tracking-meta text-void transition-colors hover:bg-paper disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-acid"
                  >
                    <Send className="h-3 w-3" />
                    <span>Transmit</span>
                  </button>
                )}
              </div>
            </div>
          </footer>
        </section>
      )}
    </>
  )
}
