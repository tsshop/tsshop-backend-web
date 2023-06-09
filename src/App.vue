<template>
  <div id="app">
    <router-view />
    <theme-picker />
  </div>
</template>

<script>
import ThemePicker from "@/components/ThemePicker";
import { mapState } from 'vuex'
export default {
  name: "App",
  components: { ThemePicker },
  mounted() {
    let settingName = this.$store.state.user.systemInfo1?.appName
    console.log('settingName', settingName);
  },
  metaInfo() {
      return {
          title: this.$store.state.settings.dynamicTitle && this.$store.state.settings.title,
          titleTemplate: title => {
              return title ? `${title} - ${process.env.VUE_APP_TITLE}` : process.env.VUE_APP_TITLE
          }
      }
  },
  created() {
    this.$store.dispatch('SystemNameOrLogo')
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {
    user: {
      deep:true,
      handler(newV) {
        document.title = newV.systemInfo1?.appName || process.env.VUE_APP_TITLE
        if (null != newV.systemInfo1?.appIcon) {
          var link = document.querySelector("link[rel*='icon']") || document.createElement('link');
          link.type = 'image/x-icon';
          link.rel = 'shortcut icon';
          link.href = newV.systemInfo1?.appIcon;
          document.getElementsByTagName('head')[0].appendChild(link);
        }
      }
    }
  }
};
</script>
<style scoped>
#app .theme-picker {
  display: none;
}
</style>
