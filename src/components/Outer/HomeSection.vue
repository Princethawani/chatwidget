<template>
  <transition name="fade">
    <div class="home-section-wrapper" v-if="visible">
      <div class="home-section">
        <div class="home-info">
          <img :src="logo" alt="RyuAI" class="logo" />
          <h2>Welcome to RyuAI Chatbot</h2>
          <p>How can I help you today?</p>
        </div>

        <div class="home-options">
          <button @click="$emit('selectOption', 'pricing')">💰 Pricing</button>
          <button @click="$emit('selectOption', 'support')">🛠️ Support</button>
          <button @click="$emit('selectOption', 'demo')">🎬 Request a Demo</button>
          <button @click="$emit('selectOption', 'chat')">💬 Chat</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import logo from '@/assets/icons/logo.png'

export default {
  name: 'HomeSection',
  emits: ['selectOption'],
  props: {
    visible: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      logo
    }
  }
}
</script>

<style scoped>
/* fade transition */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

/* Floating wrapper */
.home-section-wrapper {
  position: fixed;
  bottom: 80px;
  right: 20px;
  display: flex;
  justify-content: flex-end;
  z-index: 9999;
}

/* Chat-style card */
.home-section {
  width: 100%;
  max-width: 400px;
  min-height: 600px;
  text-align: center;
  background: #ffffff;
  border: 1px solid #eee;
  border-radius: 1rem;
  padding: 2rem 1.5rem; /* taller feel */
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

/* Logo */
.logo {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-bottom: 0.5rem;
}

/* Headings & text */
.home-info h2 {
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
}
.home-info p {
  color: #777;
  margin-bottom: 1.5rem;
}

/* Buttons layout */
.home-options {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: auto; /* push buttons to bottom */
}

/* Buttons style */
.home-options button {
  background-color: #1a1a3d;
  color: #fff;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 1.25rem;
  cursor: pointer;
  transition: background 0.2s;
}
.home-options button:hover {
  background-color: #343477;
}

/* Responsive on small screens */
@media (max-width: 480px) {
  .home-section-wrapper {
    right: 10px;
    bottom: 70px;
  }
  .home-section {
    max-width: 90%;
    min-height: 400px;
    padding: 1.5rem 1rem;
  }
  .home-options button {
    flex: 1 1 45%;
  }
}
</style>
