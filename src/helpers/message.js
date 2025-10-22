import axios from 'axios'

export const messageService = {
  async createMessage (text) {
    try {
      // Developer info: show in console only
      console.info('[GraceFlow] Sending message to server:', text)

      const res = await axios.post(process.env.VUE_APP_GRACEFLOW_API_URL, {
        question: text
      })

      // Developer log of full response
      console.debug('[GraceFlow] Server response:', res.data)

      // Extract and format server reply
      const reply =
        res.data?.answer?.choices?.[0]?.message?.content?.trim() ||
        'Hmm... I didn’t quite get that. Could you try again?'

      // User-facing message
      return {
        type: 'text',
        text: reply,
        disableInput: false
      }
    } catch (error) {
      // Developer-only error details
      console.error('[GraceFlow] Connection error:', error.message)
      if (error.response) {
        console.error('[GraceFlow] Server response:', error.response.data)
      }

      // Friendly message for the user
      return {
        type: 'text',
        text: 'I’m having trouble reaching the server right now. Please try again in a moment.',
        disableInput: false
      }
    }
  }
}
