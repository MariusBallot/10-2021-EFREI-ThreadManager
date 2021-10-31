<template>
    <div class="chronograph">
        <div class="chronograph_calc">
            <h2>Somme calculations</h2>
            <table>
                <tr>
                    <td>Doability</td>
                    <td v-if="doable" style="background: green">TRUE</td>
                    <td v-else style="background: red">FALSE</td>
                </tr>
                <tr>
                    <td>Processor Charge</td>
                    <td>{{ CPUCharge }}</td>
                </tr>
                <tr>
                    <td>Busy Period</td>
                    <td>{{ busyPeriod }}</td>
                </tr>
            </table>
        </div>
        <canvas id="canvas" ref="canvas"></canvas>
    </div>
</template>

<script>
import MainThreadManager from "../classes/MainThreadManager";

export default {
    name: "Chronograph",

    props: {
        threads: null,
    },
    data() {
        return {
            doable: true,
            busyPeriod: null,
            CPUCharge: null,
        };
    },

    mounted() {
        const MTMdoable = MainThreadManager.CPUCharge(this.threads);
        this.doable = MTMdoable[1];
        this.CPUCharge = MTMdoable[0].toFixed(3);

        if (this.doable) {
            this.busyPeriod = MainThreadManager.computeBusyPeriod(this.threads);
            MainThreadManager.init(this.threads, this.$refs.canvas);
        } else {
            this.busyPeriod = "not computable";
        }
    },
    methods: {},
};
</script>

<style lang="stylus">
.chronograph {
    canvas {
        width: 100vw;
        height: 800px;
    }

    &_calc {
        display: flex;
        flex-direction: column;
        width: 100vw;
        align-items: center;
    }

    table {
        tr {
            td {
                padding: 10px;
                border: solid black 2px;
            }
        }
    }
}
</style>
