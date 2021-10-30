<template>
  <div class="thread-input">
    <ul class="thread-inpu_list">
      <li>
        Cost
        <input ref="cost" type="text" />
      </li>
      <li>
        Deadline
        <input ref="deadline" type="text" />
      </li>
      <li>
        Period
        <input ref="period" type="text" />
      </li>
    </ul>
    <button v-on:click="addThread">Add Thread</button>
  </div>
</template>

<script>
export default {
  name: "ThreadInput",
  data() {
    return {
      thread: {
        cost: null,
        deadline: null,
        period: null
      }
    };
  },
  methods: {
    addThread() {
      const data = {
        cost: parseInt(this.$refs.cost.value),
        deadline: parseInt(this.$refs.deadline.value),
        period: parseInt(this.$refs.period.value)
      };
      this.$emit("threadAdded", data);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>