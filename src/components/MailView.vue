<template>
  <div class="email-display">
    <h2>
      <strong>{{ email.subject }}</strong>
    </h2>
    <div>
      <em
        >From {{ email.from }} on
        {{ format(new Date(email.sentAt), "MMM do yyyy") }}</em
      >
    </div>
    <div class="email-body" v-html="marked(email.body)" />
  </div>
</template>

<script>
import { format } from "date-fns";
import marked from "marked";

export default {
  props: {
    email: {
      type: Object,
      required: true,
    },
  },
  setup() {
    return {
      format,
      marked,
    };
  },
};
</script>

<style scoped>
.email-display {
  text-align: left;
}

.email-body >>> p {
  margin: 0.5rem 0;
}
</style>