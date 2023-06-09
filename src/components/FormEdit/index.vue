<template>
  <div>
    <el-table :data="list" size="mini" border>
      <el-table-column label="key">
        <!-- key -->
        <template slot-scope="scope">
          <el-input v-model="scope.row.name" type="text" />
        </template>
        <!-- key -->
      </el-table-column>
      <el-table-column label="描述">
        <!-- 描述 -->
        <template slot-scope="scope">
          <el-input v-model="scope.row.desc" type="text" />
        </template>
        <!-- 描述 -->
      </el-table-column>
      <el-table-column label="校验">
        <!-- 校验 -->
        <template slot-scope="scope">
          <el-select v-model="scope.row.verify">
            <el-option
              v-for="(item, index) in verifyArr"
              :key="index"
              :value="item.value"
              :label="item.label"
            ></el-option>
          </el-select>
        </template>
        <!-- 校验 -->
      </el-table-column>

      <el-table-column label="类型">
        <!-- 类型 -->
        <template slot-scope="scope">
          <el-select
            @change="typeChange($event, scope.$index)"
            v-model="scope.row.type"
          >
            <el-option
              v-for="(item, index) in typeArr"
              :key="index"
              :value="item.value"
              :label="item.label"
            ></el-option>
          </el-select>
        </template>
        <!-- 类型 -->
      </el-table-column>

      <el-table-column label="数据/文件过滤" width="240">
        <!-- 类型 -->

        <template slot-scope="scope">
          <el-input
            v-if="scope.row.type == 'file'"
            placeholder="所有文件"
            v-model="scope.row.accept"
            type="text"
          />

          <div v-if="scope.row.type == 'radio'">
            <div>
              <div
                class="flex flex-y-center"
                v-for="(item2, index2) in scope.row.values"
                :key="index2"
              >
                <el-input
                  v-model="scope.row.values[index2]"
                  style="width: 80px"
                  placeholder="值"
                />
                -
                <el-input
                  v-model="scope.row.titles[index2]"
                  style="width: 80px"
                  placeholder="描述"
                />

                <i
                  @click="delR(scope.$index, index2)"
                  class="el-icon-remove color shou"
                  style="font-size: 20px; margin-left: 6px"
                ></i>
                <i
                  class="el-icon-circle-plus shou"
                  style="font-size: 20px; margin-left: 6px"
                  @click="addR(scope.$index, index2)"
                ></i>
              </div>
            </div>
          </div>
        </template>

        <!-- 类型 -->
      </el-table-column>
      <el-table-column label="操作" width="80">
        <!-- 类型 -->

        <template slot-scope="scope">
          <el-button
            @click="delOne(scope.$index)"
            plain
            type="danger"
            size="mini"
            >删除</el-button
          >
        </template>

        <!-- 类型 -->
      </el-table-column>
    </el-table>
    <div class="flex flex-x-end mt-10">
      <el-button size="mini" @click="add" type="primary" plain>添加</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "form-edit",
  props: {
    value: {
      type: [String, Number],
      default: "",
    },
  },

  data() {
    return {
      list: [],
      typeArr: [
        {
          value: "text",
          label: "文本",
        },
        {
          value: "textarea",
          label: "多行文本",
        },
        {
          value: "radio",
          label: "单选",
        },
        {
          value: "file",
          label: "文件",
        },
      ],
      verifyArr: [
        {
          value: "",
          label: "无",
        },
        {
          value: "required",
          label: "必填",
        },
      ],
    };
  },
  created() {
    this.list = [];
    if (this.value) {
      try {
        this.list = JSON.parse(this.value);
      } catch (err) {
        this.init();
      }
    } else {
      this.init();
    }
  },
  methods: {
    init() {
      this.$emit("input", JSON.stringify({}));
    },
    typeChange(e, index) {
      // console.log(e, index);
      this.list[index].accept = "";
      this.list[index].values = [];
      this.list[index].titles = [];
      if (e == "radio") {
        this.list[index].values = [""];
        this.list[index].titles = [""];
      }
      this.list = JSON.parse(JSON.stringify(this.list));
    },
    add() {
      this.list.push({
        name: "",
        type: "text",
        verify: "required",
        desc: "",
      });
    },
    delOne(index) {
      this.list.splice(index, 1);
    },
    addR(index1, index2) {
      this.list[index1].values.push("");
      this.list[index1].titles.push("");
    },
    delR(index1, index2) {
      this.list[index1].values.splice(index2, 1);
      this.list[index1].titles.splice(index2, 1);
    },
  },
};
</script>

<style>
</style>