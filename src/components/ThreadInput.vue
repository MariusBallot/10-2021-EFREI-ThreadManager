<template>
    <div class="thread-input">
        <div class="thread-input_list">
            <h2>Add a custom thread</h2>
            <table>
                <tr>
                    <td>Cost</td>
                    <td><input ref="cost" type="text" /></td>
                </tr>
                <tr>
                    <td>Deadline</td>
                    <td><input ref="deadline" type="text" /></td>
                </tr>
                <tr>
                    <td>Period</td>
                    <td><input ref="period" type="text" /></td>
                </tr>
            </table>
            <button v-on:click="addThread">Add Thread</button>
        </div>
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
                period: null,
            },
        };
    },
    methods: {
        addThread() {
            const data = {
                cost: parseInt(this.$refs.cost.value),
                deadline: parseInt(this.$refs.deadline.value),
                period: parseInt(this.$refs.period.value),
            };
            this.$emit("threadAdded", data);
        },
    },
};
</script>

<style lang="stylus" scoped>
.thread-input {
    margin-right: 50px;

    &_list {
        display: flex;
        flex-direction: column;
        align-items: center;

        td {
            padding: 10px;
            border: solid black 2px;
        }
    }
}
</style>