<template>
  <div class="influence" @scroll="scrollEvent">
    <h1>粉丝影响力</h1>
    <Nav :path="-1">
      <h1 slot="center">粉丝影响力</h1>
      <span class="right" slot="right"></span>
    </Nav>
    <span class="line"></span>
    <FansInfluence></FansInfluence>
  </div>
</template>

<script>
import FansInfluence from '@/components/FansInfluence';
import Nav from '@/components/Nav';
export default {
  components: {
    Nav,
    FansInfluence
  },
  data() {
    return {
      currentIndex: 1
    };
  },
  mounted() {
    this.$store.dispatch('getFansList', {
      id: this.$route.query.id,
      num: 40,
      currentIndex: this.currentIndex
    });
  },
  methods: {
    scrollEvent(e) {
      console.log(e, 111);
    }
  }
};
</script>

<style lang="less" scoped>
h1 {
  flex: 1;
  color: #fff;
  font-size: 14px;
  text-align: center;
}
.line {
  display: block;
  margin: 36px;
}
span.right {
  float: right;
  width: 60px;
  height: 41px;
}
</style>
