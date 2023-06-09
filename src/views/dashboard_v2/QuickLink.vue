<template>
  <el-row
    :gutter="18"
    class="panel-group"
    style="margin-top: 18px"
    v-if="linkList.length"
  >
    <el-col
      v-for="(item, index) in linkList"
      :key="index"
      :xs="12"
      :sm="12"
      :lg="4"
      style="height: 100px; margin-bottom: 18px"
    >
      <div @click="to_link(item)" class="quick-link-item">
        <svg-icon :icon-class="item.icon" class-name="card-panel-icon" />
        <div>{{ item.name }}</div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "quick-link",
  props: {
    linkList: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    to_link(item) {
      if (item.path) {
        this.$router.push(item.path);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.quick-link-item {
  width: 100%;
  height: 100%;
  background-color: #ffffff;

  cursor: pointer;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  div {
    font-size: 16px;
    line-height: 40px;
    color: #666666;
  }
  .card-panel-icon {
    font-size: 30px;
    color: #666666;
  }
}
</style>
