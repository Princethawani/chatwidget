<template>
  <div class="bot-ui">
    <!-- Home Section (with fade transition) -->
    <transition name="fade">
      <HomeSection v-if="!chatStarted" @selectOption="handleHomeOption" />
    </transition>

    <!-- Chat Section (with slide-up transition) -->
    <transition name="slide-up">
      <div v-if="chatStarted" class="chat-container">
        <Board.Header />
        <Board.Content />
        <Board.Action />
      </div>
    </transition>
  </div>
</template>

<script>
import HomeSection from './HomeSection.vue'
import * as Board from '../Board'

export default {
  name: 'BotUi',
  components: { HomeSection, Board },
  data () {
    return {
      chatStarted: false
    }
  },
  methods: {
    handleHomeOption (option) {
      this.chatStarted = true
      this.$emit('startTopic', option)
    }
  }
}
</script>

<style scoped>
.bot-ui {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #f7f7f7;
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.slide-up-enter-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}
.slide-up-enter {
  transform: translateY(20px);
  opacity: 0;
}

.chat-container {
  flex: 1;
  display: flex;
  flex-direction: column;
}
</style>
