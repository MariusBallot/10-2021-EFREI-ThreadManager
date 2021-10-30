<template>
  <div class="thread-table">
    <thread-input @threadAdded="addThread"></thread-input>
    <table>
      <tr>
        <td>Task</td>
        <td>Cost</td>
        <td>Deadline</td>
        <td>Period</td>
      </tr>
      <tr v-for="(thread, i) in threads" :key="i">
        <td>Thread {{i}}</td>
        <td>{{thread.cost}}</td>
        <td>{{thread.deadline}}</td>
        <td>{{thread.period}}</td>
      </tr>
    </table>
    <button v-on:click="startChronograph">Start Chronograph</button>
  </div>
</template>

<script>
import ThreadInput from "./ThreadInput";
export default {
  name: "ThreadTable",
  components: {
    ThreadInput
  },
  data() {
    return {
      threads: [
        {
          cost: 2,
          deadline: 7,
          period: 7
        },
        {
          cost: 3,
          deadline: 11,
          period: 11
        },
        {
          cost: 5,
          deadline: 13,
          period: 13
        }
      ]
    };
  },
  methods: {
    addThread(value) {
      this.threads.push(value);
    },
    startChronograph() {
      this.$emit("startChronograph", this.threads);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
