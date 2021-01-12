<template>
  <h1>VMail Inbox</h1>
  <Suspense>
    <template #default>
      <MailTable />
    </template>
    <template #fallback> Loading... </template>
  </Suspense>
</template>

<script>
import MailTable from "./components/MailTable.vue";

export default {
  name: "App",
  components: {
    MailTable,
  },
};
</script>

<style>
#app {
  font-family: Montserrat, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
