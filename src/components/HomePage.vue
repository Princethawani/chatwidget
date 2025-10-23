<template lang="pug">
.home-page
  .header
    FutureLogo(style="width: 50px; height: 50px; margin-bottom: 1rem;")
    h2 Hi there! 👋
    p How can we help you?
  .content-container
    .options-container
      .option(v-for="(item, index) in options" :key="index" @click="handleOption(item)")
        span.option-text {{ item.text }}
        AngleRight.option-icon
  .chat-section(@click="$emit('goToChat')")
    .chat-info
      strong Chat with GraceAI
      p Have questions? GraceAI is here to assist you
    SendIcon.chat-icon
  .footer-nav
    .nav-item(:class="{ active: activeTab === 'home' }", @click="setTab('home')")
      HomeIcon
      span Home
    .nav-item(:class="{ active: activeTab === 'chat' }", @click="$emit('goToChat')")
      ChatIcon
      span Chat
  .powered
    span Powered by
    strong &nbsp; GraceAI
</template>

<script>
import AngleRight from '../assets/icons/angleRight.vue'
import SendIcon from '../assets/icons/send.svg'
import ChatIcon from '../assets/icons/chatIcon.vue'
import HomeIcon from '../assets/icons/homeIcon.vue'
import FutureLogo from '../assets/icons/bot.png'

export default {
  name: 'HomePage',
  components: {
    AngleRight,
    SendIcon,
    ChatIcon,
    HomeIcon,
    FutureLogo
  },
  data () {
    return {
      activeTab: 'home',
      options: [
        { text: 'What is GraceAI?' },
        { text: 'Discover GraceAI Premium' },
        { text: 'How to use GraceAI features?' }
      ]
    }
  },
  methods: {
    handleOption (item) {
      console.log('Option clicked:', item.text)
      this.$emit('goToChat', item.text)
    },
    setTab (tab) {
      this.activeTab = tab
    }
  }
}
</script>

<style scoped lang="scss">
.home-page {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #fff;
  overflow: hidden;
  justify-content: baseline;

  .header {
    background: #d4ae69;
    color: #fff;
    text-align: bottom-left;
    height: 50%;
    padding: 1.5rem;
    display: flex;
    justify-content: flex-end;
    align-items: flex-start;
    flex-direction: column;

    h2 {
      margin: 0;
      font-size: 1.4rem;
      font-weight: 600;
    }
    p {
      margin: 0.4rem 0 0;
      font-size: 0.95rem;
      opacity: 0.9;
      margin-bottom: 2rem;
    }
  }

  .content-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    margin-left: 1rem;
    margin-right: 1rem;
    border: 1px solid #e7e4e4;
    border-radius: 8px;
    margin-top: -2rem;
    background: #fff;

    .options-container {
      flex: 1;
      overflow-y: auto;

      .option {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-top: 1px solid #e7e4e4;
        border-bottom: 1px solid #e7e4e4;
        padding: 0.9rem 1rem;
        margin-bottom: 0.6rem;
        cursor: pointer;
        transition: background 0.2s ease;

        &:hover { background: #f1f1f1; }

        .option-text { font-weight: 500; color: #333; }
        .option-icon { width: 20px; height: 20px; color: #999; }
      }
    }
  }

  .chat-section {
    display: flex;
    border: 1px solid #e7e4e4;
    justify-content: space-between;
    align-items: center;
    margin: 1rem;
    padding: 0.9rem 1rem;
    border-radius: 8px;
    cursor: pointer;
    transition: background 0.2s ease;

    &:hover {
      background: #dce8ff;
    }

    .chat-info {
      strong {
        display: block;
        font-size: 1rem;
        color: #d4ae69;
      }
      p {
        margin: 0.2rem 0 0;
        font-size: 0.85rem;
        color: #555;
      }
    }

    .chat-icon {
      color: #007bff;
      font-size: 1.2rem;
      height: 1.2rem;
      width: auto;
    }
  }

  .footer-nav {
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-top: 1px solid #eee;
    padding: 0.6rem 0;
    background: #fff;

    .nav-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      color: #888;
      font-size: 0.9rem;
      cursor: pointer;
      transition: color 0.2s ease;

      &.active, &:hover {
        color: #d4ae69;
      }

      i {
        display: block;
        font-size: 1.2rem;
        margin-bottom: 0.1rem;
      }
    }
  }

  .powered {
    text-align: center;
    font-size: 0.8rem;
    color: #aaa;
    margin-bottom: 0.6rem;

    strong {
      color: #d4ae69;
      font-weight: 600;
    }
  }
}
</style>
