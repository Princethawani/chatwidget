<template lang="pug">
.home-page
  .header
    img.future-logo(:src="require('../assets/icons/bot.png')")
    h2 Welcome to the Future!
    p Please enter your details to start the chat:

  .content-container
    form.user-form(@submit.prevent="handleSubmit")
      .form-group
        label(for="name") Full Name *
        input#name(type="text" v-model="form.name" required placeholder="Enter your full name")

      .form-group
        label(for="email") Email Address *
        input#email(type="email" v-model="form.email" required placeholder="Enter your email")

      .form-group
        label(for="company") Company Name (Optional)
        input#company(type="text" v-model="form.company" placeholder="Enter your company name")

      button.submit-btn(type="submit" :disabled="loading")
        span(v-if="loading") Registering...
        span(v-else) Start Chat

  .powered
    span Powered by
    strong &nbsp; GraceAI
</template>

<script>
import axios from 'axios'

export default {
  name: 'RegistrationForm',

  data () {
    return {
      form: {
        name: '',
        email: '',
        company: ''
      },
      loading: false
    }
  },

  mounted () {
    const savedUser = localStorage.getItem('userInfo')
    if (savedUser) {
      const parsed = JSON.parse(savedUser)
      this.form = parsed
      this.$emit('registrationComplete', {
        ...parsed,
        initialMessage: `Hi, I'm ${parsed.name}!`
      })
    }
  },

  methods: {
    async handleSubmit () {
      if (!this.form.name || !this.form.email) {
        alert('Please enter your name and email to continue.')
        return
      }

      this.loading = true

      try {
        // Construct the payload exactly as required
        const payload = {
          name: this.form.name,
          email: this.form.email,
          'company name': this.form.company
        }

        // Send registration request to backend
        const response = await axios.post('http://localhost:9000/api/register', payload)

        if (response.data.success && response.data.user) {
          const userData = {
            ...response.data.user,
            initialMessage: `Hi, I'm ${response.data.user.name}!`
          }

          localStorage.setItem('userInfo', JSON.stringify(userData))

          this.$emit('registrationComplete', userData)
        } else {
          alert(response.data.message || 'Registration failed. Please try again.')
        }
      } catch (error) {
        console.error('Registration error:', error)
        alert('Something went wrong while connecting to the server.')
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped lang="scss">
.home-page {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #f5f5f5;
  font-family: 'Helvetica Neue', Arial, sans-serif;

  .header {
    // TODO: Use a background image for the header
    background: #d4ae69;
    // background: url('../assets/img/header-bg.jpeg') center center/cover no-repeat;
    position: obsolute;
    color: #fff;
    padding: 2rem 1.5rem;
    display: grid;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);

  .future-logo {
    width: 50px;
    height: 50px;
    margin-bottom: .5rem;
  }

  h2 {
    margin: 0;
    font-size: 1.6rem;
    font-weight: 700;
  }

  p {
    margin: 0.5rem 0 0;
    font-size: 1rem;
    opacity: 0.9;
  }
}

  .content-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: -3rem 1rem 2rem;
    background: #fff;
    border-radius: 15px;
    box-shadow: 0 6px 15px rgba(0,0,0,0.08);
    padding: 2rem;

    .user-form {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;

      .form-group {
        display: flex;
        flex-direction: column;

        label {
          font-size: 1rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: #333;
        }

        input {
          padding: 0.8rem 1rem;
          border: 1px solid #ccc;
          border-radius: 8px;
          font-size: 1rem;
          outline: none;
          transition: all 0.3s ease;

          &:focus {
            border-color: #d4ae69;
            box-shadow: 0 0 5px rgba(212,174,105,0.5);
          }

          &::placeholder {
            color: #aaa;
          }
        }
      }

      .submit-btn {
        margin-top: 1rem;
        background: #d4ae69;
        color: #fff;
        border: none;
        border-radius: 10px;
        padding: 1rem;
        font-size: 1.1rem;
        font-weight: 600;
        cursor: pointer;
        text-align: center;
        transition: all 0.3s ease;
        box-shadow: 0 4px 8px rgba(212,174,105,0.3);

        &:hover {
          background: #b89350;
          transform: translateY(-2px);
          box-shadow: 0 6px 12px rgba(212,174,105,0.4);
        }

        &:active {
          transform: translateY(0);
          box-shadow: 0 4px 8px rgba(212,174,105,0.3);
        }
      }
    }
  }

  .powered {
    text-align: center;
    font-size: 0.85rem;
    color: #888;
    margin-bottom: 1rem;

    strong {
      color: #d4ae69;
      font-weight: 700;
    }
  }
}
</style>
