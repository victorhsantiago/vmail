<template>
  <table class="mail-table">
    <tbody>
      <tr
        v-for="email in unarchivedEmails"
        :key="email.id"
        :class="[
          'mail-table-row',
          'clickable',
          email.read ? 'mail-table-row--read' : '',
        ]"
        @click="openEmail(email)"
      >
        <td><input type="checkbox" name="" id="" /></td>
        <td
          :class="['mail-table-from', email.read ? '' : 'mail-table--unread']"
        >
          {{ email.from }}
        </td>
        <td>
          <p>
            <span :class="[email.read ? '' : 'mail-table--unread']">{{
              email.subject
            }}</span>
            - {{ email.body }}
          </p>
        </td>
        <td class="date">
          {{ format(new Date(email.sentAt), 'MMM do yyyy') }}
        </td>
        <td><button @click="archiveEmail(email)">Archive</button></td>
      </tr>
    </tbody>
  </table>
  <ModalView v-if="openedEmail" @closeModal="closeModal">
    <MailView :email="openedEmail" @changeEmail="changeEmail" />
  </ModalView>
</template>

<script>
import axios from 'axios'
import { format } from 'date-fns'
import { ref } from 'vue'
import MailView from '@/components/MailView.vue'
import ModalView from '@/components/ModalView.vue'

export default {
  name: 'MailTable',
  components: { MailView, ModalView },
  async setup() {
    const { data: emails } = await axios.get('http://localhost:3001/emails')

    return {
      format,
      emails: ref(emails),
      openedEmail: ref(null),
    }
  },
  computed: {
    sortedEmails() {
      return this.emails.sort((email1, email2) =>
        email1.sentAt < email2.sentAt ? 1 : -1
      )
    },
    unarchivedEmails() {
      return this.emails.filter((email) => !email.archived)
    },
  },
  methods: {
    openEmail(email) {
      this.openedEmail = email
      if (email) {
        email.read = true
        this.updateEmail(email)
      }
    },
    archiveEmail(email) {
      email.archived = true
      this.updateEmail(email)
    },
    updateEmail(email) {
      axios.put(`http://localhost:3001/emails/${email.id}`, email)
    },
    closeModal() {
      this.openedEmail = null
    },
    changeEmail({ toggleArchive, toggleRead, save, closeModal, changeIndex }) {
      const email = this.openedEmail

      if (toggleRead) email.read = !email.read
      if (toggleArchive) email.archived = !email.archived
      if (save) this.updateEmail(email)
      if (closeModal) this.closeModal()
      if (changeIndex) {
        const emails = this.unarchivedEmails
        const currentIndex = emails.indexOf(email)
        const newEmail = emails[currentIndex + changeIndex]
        this.openEmail(newEmail)
      }
    },
  },
}
</script>

<style scoped>
.mail-table {
  max-width: 1000px;
  margin: auto;
  border-collapse: collapse;
}

.mail-table-row {
  height: 40px;
}

.mail-table-row--read {
  background-color: #eee;
}

.mail-table-from {
  max-width: 180px;
  overflow: hidden;
  padding-right: 16px;
}

.mail-table--unread {
  font-weight: 600;
}

.mail-table td {
  border-bottom: 1px solid black;
  text-align: left;
}

.mail-table tr:first-of-type td {
  border-top: 1px solid black;
}

.mail-table td p {
  max-height: 1.2em;
  overflow-y: hidden;
  margin: 0;
}

.mail-table td.date {
  width: 120px;
}
</style>
