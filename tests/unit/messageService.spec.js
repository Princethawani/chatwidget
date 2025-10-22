// tests/unit/messageService.spec.js

import axios from 'axios'
import { messageService } from '@/helpers/message'

jest.mock('axios')

describe('messageService', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should return a bot message with text from backend', async () => {
    axios.post.mockResolvedValue({
      data: {
        ok: true,
        answer: {
          choices: [
            {
              message: { content: 'Hello from backend' }
            }
          ]
        }
      }
    })

    const result = await messageService.createMessage('Hi')

    expect(result).toEqual({
      type: 'text',
      text: 'Hello from backend',
      disableInput: false
    })
  })

  it('should return default friendly message if no response content', async () => {
    axios.post.mockResolvedValue({ data: {} })

    const result = await messageService.createMessage('Hi')

    expect(result.text).toBe(
      'Hmm... I didn’t quite get that. Could you try again?'
    )
  })

  it('should return friendly error message if backend fails', async () => {
    axios.post.mockRejectedValue(new Error('Network error'))

    const result = await messageService.createMessage('Hi')

    expect(result.text).toBe(
      'I’m having trouble reaching the server right now. Please try again in a moment.'
    )
  })
})
