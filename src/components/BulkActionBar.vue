<template>
  <div class="bulk-action-bar">
    <input
      type="checkbox"
      :checked="allEmailsSelected"
      :class="[someEmailSelected ? 'partial-check' : '']"
      @click="bulkSelect"
    />
    <span class="buttons">
      <button @click="emailSelection.toggleRead()" :disabled="numberSelected === 0">{{
        emailSelection.hasUnreadEmails()
        ? 'Mark Unread'
        : 'Mark Read'
      }}</button>
      <button @click="emailSelection.archive()" :disabled="numberSelected === 0">
        Archive
      </button>
    </span>
  </div>
</template>

<script>
import useEmailSelection from '../composables/useEmailSelection'
import { computed } from 'vue'

export default {
  props: {
    emails: {
      type: Array,
      required: true,
    },
  },
  setup({ emails }) {
    const emailSelection = useEmailSelection()
    const numberSelected = computed(() => emailSelection.selectedEmails.size)
    const numberEmails = emails.length
    const allEmailsSelected = computed(
      () => numberSelected.value === numberEmails
    )
    const someEmailSelected = computed(() => {
      return numberSelected.value > 0 && numberSelected.value < numberEmails
    })

    const bulkSelect = () => {
      allEmailsSelected.value
        ? emailSelection.clear()
        : emailSelection.addMultiple(emails)
    }

    return {
      allEmailsSelected,
      someEmailSelected,
      bulkSelect,
      emailSelection,
      numberSelected,
    }
  },
}
</script>

<style scoped>
.bulk-action-bar {
  width: 100%;
  max-width: 1000px;
  margin: auto;
  text-align: left;
  padding-bottom: 8px;
}

.bulk-action-bar input {
  margin: 5px;
}

.bulk-action-bar .checkbox {
  margin-right: 6px;
  margin-left: 3px;
}
</style>