<template>
  <div class="chronograph">
    <canvas id="canvas" ref="canvas"></canvas>
  </div>
</template>

<script>
import MainThreadManager from "../classes/MainThreadManager";

export default {
  name: "Chronograph",
  props: {
    threads: null
  },
  mounted() {
    MainThreadManager.init(this.threads, this.$refs.canvas);
  },
  data() {},
  methods: {}
};
</script>

<style lang="stylus">
.chronograph {
  canvas {
    width: 100vw;
    height: 300px;
  }
}
</style>
