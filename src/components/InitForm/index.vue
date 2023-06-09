<template>
  <div class="initForm">
    <el-form
      :rules="rules"
      ref="form"
      :model="form"
      label-width="200px"
      style="padding-bottom: 20px"
    >
      <!-- 渲染表单 -->

      <el-form-item
        v-for="(item, index) in formList"
        :key="index"
        :prop="item.name"
        :label="item.desc"
        style="margin-top: 20px"
      >
        <template v-if="item.type == 'text'">
          <el-input
            :disabled="disabled"
            v-model="form[item.name]"
            :placeholder="`请输入${item.desc}`"
          />
        </template>
        <template v-if="item.type == 'textarea'">
          <el-input
            :disabled="disabled"
            type="textarea"
            rows="3"
            :placeholder="`请输入${item.desc}`"
            v-model="form[item.name]"
          />
        </template>
        <template v-if="item.type == 'radio'">
          <el-radio-group
            :disabled="disabled"
            @change="radioChange"
            v-model="form[item.name]"
          >
            <el-radio
              v-for="(ritem, rindex) in getRadioArr(item)"
              :key="rindex"
              :label="ritem.label"
            >
              {{ ritem.name }}
            </el-radio>
          </el-radio-group>
        </template>
        <template v-if="item.type == 'file'">
          <input-file
            :disabled="disabled"
            :accept="item.accept"
            @fileChange="fileChange($event, item.name)"
            :url="form[item.name]"
          />
        </template>
      </el-form-item>
      <!-- 渲染表单 -->
    </el-form>
  </div>
</template>

<script>
import InputFile from "./InputFile.vue";
export default {
  name: "init-form",
  components: {
    InputFile,
  },
  props: {
    parseStr: {
      type: String,
      default: "",
    },
    oldForm: {
      type: Object,
      default: () => ({}),
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      form: {},
      formList: [
        // {
        //   name: "value1",
        //   type: "text",
        //   desc: "微信版本号",
        //   verify: "required",
        // },
        // {
        //   name: "value2",
        //   type: "textarea",
        //   desc: "微信版本号",
        //   verify: "required",
        // },
        // {
        //   name: "value3",
        //   type: "radio",
        //   desc: "微信版本号",
        //   verify: "required",
        //   values: ["v1", "v2"],
        //   titles: ["版本一", "版本二"],
        // },
        // {
        //   name: "value4",
        //   type: "file",
        //   desc: "微信版本号",
        //   verify: "required",
        // },
      ],
      rules: {},
    };
  },
  watch: {
    parseStr() {
      this.initForm();
    },
  },
  created() {
    this.initForm();
  },
  methods: {
    initForm() {
      try {
        if (this.parseStr) {
          let formList = JSON.parse(this.parseStr);
          let form = {};
          let rules = {};
          this.formList = formList;
          formList.forEach((val) => {
            if (val.verify == "required") {
              rules[val.name] = [
                {
                  required: true,
                  message: `${val.desc}不能为空`,
                  trigger: "blur",
                },
              ];
            }

            form[val.name] = this.oldForm[val.name] || "";
          });
          this.rules = rules;
          this.form = JSON.parse(JSON.stringify(form));
          // console.log("this.form", form);
        } else {
          this.form = {};
          this.formList = [];
          this.rules = {};
        }
      } catch (err) {
        this.formList = [];
        this.form = {};
        this.rules = {};
        console.error("格式化表单错误,请检测表单参数");
      }
    },
    fileChange(url, name) {
      this.form[name] = url;
      this.form = JSON.parse(JSON.stringify(this.form));
    },
    getRadioArr(item) {
      if (!item.values) {
        return [];
      }

      return item.values.map((val, index) => {
        return {
          label: val,
          name: item.titles[index] || "",
        };
      });
    },
    radioChange(e) {
      this.form = JSON.parse(JSON.stringify(this.form));
    },
  },
};
</script>

<style>
.initForm .el-form-item__label {
  /* text-align: left !important; */
}
</style>