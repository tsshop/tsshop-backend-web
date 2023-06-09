<template>
  <section class="app-main">
    <div class="content-box">
      <transition name="fade-transform" mode="out-in">
        <keep-alive :include="cachedViews">
          <router-view v-if="!$route.meta.link" :key="key" />
        </keep-alive>
      </transition>
      <iframe-toggle />
    </div>
  </section>
</template>

<script>
import iframeToggle from "./IframeToggle/index"

export default {
  name: 'AppMain',
  components: { iframeToggle },
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    },
    key() {
      return this.$route.path
    }
  }
}
</script>

<style lang="scss" scoped>
.app-main {
  /* 50= navbar  50  */
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
  background-color: #f3f4f6;
  padding: 20px;
  .content-box {
    background-color: #fff;
    border-radius: 10px;
  }
}

.fixed-header + .app-main {
  padding-top: 50px;
}

.hasTagsView {
  .app-main {
    /* 84 = navbar + tags-view = 50 + 34 */
    min-height: calc(100vh - 84px);
  }

  .fixed-header + .app-main {
    padding-top: 84px;
  }
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 17px;
  }
}
</style>
