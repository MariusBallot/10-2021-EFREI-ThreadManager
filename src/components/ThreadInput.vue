<template>
    <div class="thread-input">
        <div class="thread-input_list">
            <h2>Add a custom thread</h2>
            <table>
                <tr>
                    <td>Cost</td>
                    <td>
                        <input v-model="thread.cost" ref="cost" type="number" />
                    </td>
                </tr>
                <tr>
                    <td>Deadline</td>
                    <td>
                        <input
                            v-model="thread.deadline"
                            ref="deadline"
                            type="number"
                        />
                    </td>
                </tr>
                <tr>
                    <td>Period</td>
                    <td>
                        <input
                            v-model="thread.period"
                            ref="period"
                            type="number"
                        />
                    </td>
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
            this.$refs.cost.value = null;
            this.$refs.deadline.value = null;
            this.$refs.period.value = null;
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