import { reactive } from 'vue'
import axios from 'axios'

const selectedEmails = reactive(new Set())

const forSelected = fn => {
  selectedEmails.forEach(email => {
    fn(email)
    axios.put(`http://localhost:3001/emails/${email.id}`, email)
  })
}

const markRead = () => forSelected(email => (email.read = true))

const markUnread = () => forSelected(email => (email.read = false))

const useEmailSelection = () => {
  const addMultiple = newSelectedEmails =>
    newSelectedEmails.forEach(email => selectedEmails.add(email))

  const archive = () => {
    forSelected(email => (email.archived = true))
    clear()
  }

  const clear = () => selectedEmails.clear()

  const hasUnreadEmails = () => [...selectedEmails].some(email => !email.read)

  const toggle = email => {
    selectedEmails.has(email)
      ? selectedEmails.delete(email)
      : selectedEmails.add(email)
  }

  const toggleRead = () => {
    hasUnreadEmails() ? markRead() : markUnread()
  }

  return {
    addMultiple,
    archive,
    clear,
    hasUnreadEmails,
    selectedEmails,
    toggle,
    toggleRead,
  }
}

export default useEmailSelection
