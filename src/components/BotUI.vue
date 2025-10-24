<template lang="pug">
.qkb-bot-ui(
  :class="uiClasses"
)
  transition(name="qkb-fadeUp")
    .qkb-board(v-if="botActive")
      HomePage(v-if="showHome" @goToChat="startChat")
      template(v-else)
        BoardHeader(
          :bot-title="optionsMain.botTitle",
          @close-bot="botToggle"
        )
          template(v-slot:header)
            slot(name="header")
        BoardContent(
          :bot-typing="botTyping",
          :main-data="messages"
        )
          template(v-slot:botTyping)
            slot(name="botTyping")
        BoardAction(
          :input-disable="inputDisable",
          :input-placeholder="optionsMain.inputPlaceholder",
          :input-disable-placeholder="optionsMain.inputDisablePlaceholder",
          @msg-send="sendMessage"
        )
          template(v-slot:actions)
            slot(name="actions")
          template(v-slot:sendButton)
            slot(name="sendButton")
  .qkb-bot-bubble
    button.qkb-bubble-btn(
      @click="botToggle"
    )
      slot(name="bubbleButton")
        transition(name="qkb-scaleUp")
          BubbleIcon.qkb-bubble-btn-icon(
            v-if="!botActive",
            key="1"
          )
          CloseIcon.qkb-bubble-btn-icon.qkb-bubble-btn-icon--close(
            v-else,
            key="2"
          )
  AppStyle(:options="optionsMain")
  .qkb-preload-image
    .qkb-msg-avatar__img(v-if="optionsMain.botAvatarImg")
</template>
<script>
import EventBus from '../helpers/event-bus'
import Config from '../config'
import BoardHeader from './Board/Header'
import BoardContent from './Board/Content'
import BoardAction from './Board/Action'
import AppStyle from './AppStyle'
import BubbleIcon from '../assets/icons/bubble.svg'
import CloseIcon from '../assets/icons/close.svg'
import HomePage from './HomePage.vue'

export default {
  name: 'GraceAI UI',

  components: {
    BoardHeader,
    BoardContent,
    BoardAction,
    BubbleIcon,
    CloseIcon,
    AppStyle,
    HomePage
  },

  props: {
    options: {
      type: Object,
      default: () => { return {} }
    },

    messages: {
      type: Array
    },

    botTyping: {
      type: Boolean,
      default: false
    },

    inputDisable: {
      type: Boolean,
      default: false
    },

    isOpen: {
      type: Boolean,
      default: false
    },

    openDelay: {
      type: Number
    }
  },

  data () {
    return {
      botActive: false,
      showHome: true,
      defaultOptions: {
        botTitle: 'GraceAI Chatbot',
        colorScheme: '#1a1b37',
        textColor: '#d4ae69',
        bubbleBtnSize: 56,
        animation: true,
        boardContentBg: '#fff',
        botAvatarSize: 32,
        botAvatarImg: 'http://placehold.it/200x200',
        msgBubbleBgBot: '#f0f0f0',
        msgBubbleColorBot: '#000',
        msgBubbleBgUser: ' #d4ae69',
        msgBubbleColorUser: '#fff',
        inputPlaceholder: 'Message',
        inputDisableBg: '#fff',
        inputDisablePlaceholder: null
      }
    }
  },

  computed: {
    optionsMain () {
      return { ...this.defaultOptions, ...this.options }
    },

    // Add class to bot ui wrapper
    uiClasses () {
      let classes = []

      if (this.optionsMain.animation) {
        classes.push('qkb-bot-ui--animate')
      }

      return classes
    }
  },

  created () {
    if (this.isOpen) {
      if (this.openDelay) {
        setTimeout(this.botOpen, this.openDelay)
      } else {
        this.botToggle()
      }
    }
  },

  mounted () {
    document.addEventListener(Config.EVENT_OPEN, function () {
      this.botOpen()
    })
    document.addEventListener(Config.EVENT_CLOSE, function () {
      this.botClose()
    })
    document.addEventListener(Config.EVENT_TOGGLE, function () {
      this.botToggle()
    })
  },

  beforeDestroy () {
    EventBus.$off('select-button-option')
  },

  methods: {
    startChat (initialMessage) {
      this.showHome = false
      this.$emit('init')
      if (initialMessage) {
        this.$nextTick(() => {
          setTimeout(() => {
            this.sendMessage({
              text: initialMessage,
              type: 'text'
            })
          }, 200)
        })
      }
    },
    goHome () {
      this.showHome = true
    },
    botOpen () {
      if (!this.botActive) {
        this.botToggle()
      }
    },

    botClose () {
      if (this.botActive) {
        this.botToggle()
      }
    },

    botToggle () {
      this.botActive = !this.botActive

      if (this.botActive) {
        EventBus.$on('select-button-option', this.selectOption)
        this.$emit('init')
      } else {
        EventBus.$off('select-button-option')
        this.$emit('destroy')
        this.showHome = true
      }
    },

    sendMessage (value) {
      this.$emit('msg-send', value)
    },

    selectOption (value) {
      this.$emit('msg-send', value)
    }
  }
}
</script>

<style src="../assets/scss/_app.scss" lang="scss"></style>
