<template lang="pug">
#app
  VueBotUI(
    ref="botUI"
    :options="botOptions",
    :messages="messageData",
    :bot-typing="botTyping",
    :input-disable="inputDisable",
    :is-open="false",
    @init="botStart",
    @msg-send="msgSend",
  )
    // 👇 Inject custom header slot (for back button + title)
    template(v-slot:header)
      .qkb-board-header-slot
        button.qkb-board-header__back(@click="handleBack")
          BackIcon.qkb-board-header__back-icon
        span.qkb-board-header__title GraceAI Chatbot
</template>

<script>
import BotIcon from './assets/icons/bot.png'
import { VueBotUI } from './vue-bot-ui'
import { messageService } from './helpers/message'
import ButtonIcon from '@/assets/icons/back.svg'
import BackIcon from '@/assets/icons/backIcon.vue'

export default {
  components: {
    BotIcon,
    VueBotUI,
    BackIcon,
    ButtonIcon
  },

  data () {
    return {
      messageData: [],
      botTyping: false,
      inputDisable: false,
      botOptions: {
        botAvatarImg: BotIcon,
        boardContentBg: '#f4f4f4',
        msgBubbleBgBot: '#fff',
        inputPlaceholder: 'Enter your message...',
        inputDisableBg: '#fff',
        inputDisablePlaceholder: 'Hit the buttons above to respond'
      }
    }
  },

  methods: {
    botStart () {
      console.log('Bot started')
    },

    msgSend (value) {
      this.messageData.push({
        agent: 'user',
        type: 'text',
        text: value.text
      })
      this.getResponse()
    },

    getResponse () {
      this.botTyping = true
      const lastMessage = this.messageData[this.messageData.length - 1]

      messageService.createMessage(lastMessage.text)
        .then((response) => {
          const replyMessage = {
            agent: 'bot',
            ...response
          }
          this.inputDisable = response.disableInput
          this.messageData.push(replyMessage)
          this.botTyping = false
        })
    },

    handleBack () {
      this.$refs.botUI.goHome()
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'BaiJamjuree', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}

/* 👇 Add back icon and header layout styling */
.qkb-board-header-slot {
  display: flex;
  align-items: center;
  gap: 8px;
}

.qkb-board-header__back {
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
}

.qkb-board-header__back-icon {
  width: 20px;
  height: 20px;
  color: #d4ae69;
}

.qkb-board-header__title {
  font-weight: 600;
  font-size: 16px;
  color: #d4ae69;
}
</style>
