import React, { useEffect } from 'react'

const Chatbot = () => {
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://cdn.botpress.cloud/webchat/v1/inject.js'
    script.async = true
    document.body.appendChild(script)

    script.onload = () => {
      window.botpressWebChat.init({
        composerPlaceholder: "Scrie-i ceva lui Botty",
        botConversationDescription: "Botty este botul AI care vă stă la dispoziție",
        botId: "75424437-4b00-4535-8cf2-b56dbabe0397",
        hostUrl: "https://cdn.botpress.cloud/webchat/v1",
        messagingUrl: "https://messaging.botpress.cloud",
        clientId: "75424437-4b00-4535-8cf2-b56dbabe0397",
        webhookId: "f1d5dc6e-e28e-4e62-8e00-02d5e3cffc22",
        lazySocket: true,
        themeName: "prism",
        botName: "Botty",
        avatarUrl: "https://cdn3.iconfinder.com/data/icons/chat-bot-emoji-blue-filled-color/300/14134081Untitled-3-4096.png",
        stylesheet: "https://webchat-styler-css.botpress.app/prod/f66bbd04-0073-44e9-8d43-be21a551ac8c/v74897/style.css",
        frontendVersion: "v1",
        useSessionStorage: true,
        showBotInfoPage: true,
        enableConversationDeletion: true,
        theme: "prism",
        themeColor: "#2563eb"
      })
    }
  }, [])

  return <div id="webchat" />
}

export default Chatbot