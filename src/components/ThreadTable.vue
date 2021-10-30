<template>
    <div class="thread-table">
        <div class="thread-table_wrapper">
            <thread-input @threadAdded="addThread"></thread-input>
            <div class="thread-table_wrapper_thread-list">
                <h2>Thread Table</h2>
                <table>
                    <tr>
                        <td>Task</td>
                        <td>Cost</td>
                        <td>Deadline</td>
                        <td>Period</td>
                    </tr>
                    <tr v-for="(thread, i) in threads" :key="i">
                        <td>Thread {{ i }}</td>
                        <td>{{ thread.cost }}</td>
                        <td>{{ thread.deadline }}</td>
                        <td>{{ thread.period }}</td>
                    </tr>
                </table>
            </div>
        </div>
        <button v-if="!restartFlag" v-on:click="startChronograph">
            Start Chronograph
        </button>
        <button v-else v-on:click="restart">Restart</button>
    </div>
</template>

<script>
import ThreadInput from "./ThreadInput";
export default {
    name: "ThreadTable",
    components: {
        ThreadInput,
    },
    data() {
        return {
            restartFlag: false,
            threads: [
                {
                    cost: 2,
                    deadline: 7,
                    period: 7,
                },
                {
                    cost: 3,
                    deadline: 11,
                    period: 11,
                },
                {
                    cost: 5,
                    deadline: 13,
                    period: 13,
                },
            ],
        };
    },
    methods: {
        addThread(value) {
            this.threads.push(value);
        },
        startChronograph() {
            this.$emit("startChronograph", this.threads);
            this.restartFlag = true;
        },
        restart() {
            window.location.reload(false);
        },
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
.thread-table {
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;

    &_wrapper {
        display: flex;
        align-items: center;
        border: solid black 2px;
        padding: 20px;

        &_thread-list {
            h2 {
                text-align: center;
            }
        }
    }

    button {
        padding: 20px;
        margin: 20px 0;
    }

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

    table {
        tr {
            td {
                border: solid black 2px;
                padding: 10px;
            }
        }
    }
}
</style>
