<template lang="pug">
.qkb-board-action(
  :class="actionClass"
)
  .qkb-board-action__wrapper
    slot(name="actions")
      button.qkb-action-item.qkb-action-item--emoji(@click="toggleEmojiPicker")
        img(:src="require('../../assets/icons/emoji.png')").qkb-action-icon
      emoji-picker.emoji-picker(
        v-if="showEmojiPicker"
        @emoji-click="onEmojiSelect"
      )
    .qkb-board-action__msg-box
      input.qkb-board-action__input(
        type="text",
        v-model="messageText",
        ref="qkbMessageInput",
        :disabled="inputDisable",
        :placeholder="inputPlaceholder",
        @keydown.enter="sendMessage",
      )
      .qkb-board-action__disable-text(
        v-if="inputDisablePlaceholder && inputDisable"
      )
        span {{ inputDisablePlaceholder }}
    .qkb-board-action__extra
      button.qkb-action-item.qkb-action-item--send(@click="sendMessage")
        slot(name="sendButton")
          IconSend.qkb-action-icon.qkb-action-icon--send
</template>
<script>
import IconSend from '../../assets/icons/send.svg'

export default {
  components: { IconSend },

  props: {
    inputPlaceholder: String,
    inputDisablePlaceholder: String,
    inputDisable: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      messageText: null,
      showEmojiPicker: false
    }
  },

  computed: {
    actionClass () {
      const actionClasses = []

      if (this.inputDisable) actionClasses.push('qkb-board-action--disabled')
      if (this.messageText) actionClasses.push('qkb-board-aciton--typing')

      return actionClasses
    }
  },

  async mounted () {
    if (!customElements.get('emoji-picker')) {
      await import('emoji-picker-element')
    }

    this.$refs.qkbMessageInput.focus()
  },

  methods: {
    sendMessage () {
      if (this.messageText) {
        this.$emit('msg-send', { text: this.messageText })
        this.messageText = null
      }
    },

    toggleEmojiPicker () {
      this.showEmojiPicker = !this.showEmojiPicker
    },

    onEmojiSelect (event) {
      const emoji = event.detail.unicode
      this.messageText = this.messageText ? this.messageText + emoji : emoji
    }
  }
}
</script>

<style lang="scss">
.qkb-action-item--emoji {
  padding: 8px;
  background: none;
  border: none;
  cursor: pointer;
  color: #d4ae69;
  margin-right: 1rem;

  &:hover {
    opacity: 0.8;
  }
}

.emoji-picker {
  position: absolute;
  bottom:100%;
  left: 0;
  z-index: 1000;
  border-radius: 8px;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.1);
  --border-radius: 16px;
}
</style>
