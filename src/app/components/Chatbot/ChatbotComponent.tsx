'use client'

import { useEffect } from 'react'

declare global {
  interface Window {
    botpressWebChat?: {
      sendEvent: (event: { type: string }) => void
    }
  }
}

export default function BotpressChat() {
  useEffect(() => {
    // Inject Botpress scripts only once
    const injectScript = (src: string) => {
      const script = document.createElement('script')
      script.src = src
      script.defer = true
      document.body.appendChild(script)
    }

    injectScript('https://cdn.botpress.cloud/webchat/v3.1/inject.js')
    injectScript('https://files.bpcontent.cloud/2025/07/09/05/20250709054740-P9TM8RGU.js')
  }, [])

  // Button style
  const toggleChat = () => {
    if (window.botpressWebChat) {
      window.botpressWebChat.sendEvent({ type: 'toggle' })
    }
  }

  return (
    <button
      onClick={toggleChat}
      className="fixed bottom-6 right-6 z-50 bg-blue-600 text-white px-4 py-3 rounded-full shadow-lg hover:bg-blue-700 transition-all"
    >
      Chat with Us
    </button>
  )
}
