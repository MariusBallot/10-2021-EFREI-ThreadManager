<template>
  <div>
    <h1>Thread Manager</h1>
    <ThreadTable v-on:startChronograph="startChronograph" />
    <Chronograph v-if="threads" :threads="threads" />
    <div v-else>No threads yet</div>
  </div>
</template>

<script>
import ThreadTable from "./components/ThreadTable.vue";
import Chronograph from "./components/Chronograph.vue";

export default {
  name: "App",
  components: {
    ThreadTable,
    Chronograph
  },
  data() {
    return {
      threads: null
    };
  },
  methods: {
    startChronograph: function(data) {
      this.threads = data;
    }
  }
};
</script>

<style lang="stylus">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
