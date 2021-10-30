<template>
    <div>
        <h1>Thread Manager</h1>
        <ThreadTable v-on:startChronograph="startChronograph" />
        <Chronograph v-if="threads" :threads="threads" />
    </div>
</template>

<script>
import ThreadTable from "./components/ThreadTable.vue";
import Chronograph from "./components/Chronograph.vue";

export default {
    name: "App",
    components: {
        ThreadTable,
        Chronograph,
    },
    data() {
        return {
            threads: null,
        };
    },
    methods: {
        startChronograph: function (data) {
            this.threads = data;
        },
    },
};
</script>

<style lang="stylus">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
}

h1 {
    text-align: center;
    padding: 30px 0;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

ul {
    li {
        list-style-type: none;
    }
}
</style>
