<template>
  <div>
    <div v-if="url">
      <el-tag type="info" @close="handleClose()" closable>{{ url }}</el-tag>
    </div>
    <el-button v-else icon="el-icon-document" @click="open" :loading="loading"
      >上传文件</el-button
    >
  </div>
</template>

<script>
export default {
  name: "input-fail",
  props: {
    url: {
      type: [String, Number],
      default: "",
    },
    desc: {
      type: [String, Number],
      default: "",
    },
    accept: {
      type: [String, Number],
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    open() {
      var inputObj = document.createElement("input");

      inputObj.setAttribute("id", "_ef");

      inputObj.setAttribute("type", "file");

      inputObj.setAttribute("style", "visibility:hidden");
      if (this.accept) {
        inputObj.setAttribute("accept", this.accept);
      }

      inputObj.onchange = (e) => {
        // console.log("选择文件", inputObj.files);
        this.uploadFile(inputObj.files[0]);
      };

      document.body.appendChild(inputObj);

      inputObj.click();
    },
    handleClose() {
      if(this.disabled) return ;
      this.$emit("fileChange", "");
    },
    filterName(name) {
      return String(name).substring(0, String(name).lastIndexOf("?"));
    },
    uploadFile(file) {
      // 使用 FormData

      let fd = new FormData();
      fd.append("file", file);
      fd.append("path", "pay/");
      clearTimeout(this.uploadTimer);
      this.uploadTimer = setTimeout(() => {
        this.loading = false;
      }, 5000);
      ///////
      this.loading = true;
      this.request({
        url: "/api/imgUpload/payFile",
        method: "POST",
        data: fd,
      })
        .then((res) => {
          clearTimeout(this.uploadTimer);
          this.loading = false;
          if (res.code == 200 && res.data) {
            this.$emit("fileChange", res.data.url);
            setTimeout(() => {
              this.$forceUpdate();
            }, 1000);
          }
        })
        .catch((res) => {
          clearTimeout(this.uploadTimer);

          this.loading = false;
        });
    },
  },
};
</script>

<style>
</style>