<template>
  <div class="app-container">
    <!-- <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="存储位置" prop="storageLocation">
        <el-input
          v-model="queryParams.storageLocation"
          placeholder="请输入存储位置"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="配置信息" prop="config">
        <el-input
          v-model="queryParams.config"
          placeholder="请输入配置信息"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form> -->

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['system:storage:add']"
        >新增</el-button>
      </el-col>
      <!-- <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['system:storage:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['system:storage:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['system:storage:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar> -->
    </el-row>

    <el-table v-loading="loading" :data="storageList" >
      <!-- <el-table-column type="selection" width="55" align="center" /> -->
      <!-- <el-table-column label="id" align="center" prop="id" /> -->
      
      <el-table-column label="存储方式" align="center" prop="storageType" />
      <el-table-column label="存储位置" align="center" prop="storageLocation" />
      <el-table-column label="开启状态" align="center" prop="openStatus" >
        <template slot-scope="{row}">
          <el-tag :type="['success', 'danger'][Number(!row.openStatus)]">{{
            ["开启", "关闭"][Number(!row.openStatus)]
          }}</el-tag>
        </template>
      </el-table-column>
      <!-- <el-table-column label="配置信息" align="center" prop="config" /> -->
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['system:storage:edit']"
          >设置</el-button>
          <!-- <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:storage:remove']"
          >删除</el-button> -->
        </template>
      </el-table-column>
    </el-table>
    
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />
   
    <!-- 添加或修改【请填写功能名称】对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="600px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="140px">
        <el-form-item label="储存方式" prop="storageType">
          <el-radio-group v-model="form.storageType">
              <el-radio v-for="(item,index) in saveType" :key="index" :label="item.code">{{ item.msg }}</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="状态" prop="openStatus">
          <el-radio-group v-model="form.openStatus">
              <el-radio :label="true">开启</el-radio>
              <el-radio :label="false">关闭</el-radio>
              <!-- <el-radio :label="2">微信钱包</el-radio> -->
            </el-radio-group>
        </el-form-item>
        <div v-if="form.storageType=== 'ALI_OSS'">
          <el-form-item label="endpoint" prop="endpoint">
            <el-input v-model="form.endpoint" placeholder="请输入endpoint" />
          </el-form-item>
          <el-form-item label="endpointECS" prop="endpointECS">
            <el-input v-model="form.endpointECS" placeholder="请输入endpointECS" />
          </el-form-item>
          <el-form-item label="accessKeyId" prop="accessKeyId">
            <el-input v-model="form.accessKeyId" placeholder="请输入accessKeyId" />
          </el-form-item>
          <el-form-item label="accessKeySecret" prop="accessKeySecret">
            <el-input v-model="form.accessKeySecret" placeholder="请输入accessKeySecret" />
          </el-form-item>
          <el-form-item label="bucketName" prop="bucketName">
            <el-input v-model="form.bucketName" placeholder="请输入bucketName" />
          </el-form-item>
          <el-form-item label="filedir" prop="filedir">
            <el-input v-model="form.filedir" placeholder="请输入filedir" />
          </el-form-item>
          <el-form-item label="domain" prop="domain">
            <el-input v-model="form.domain" placeholder="请输入bucketName" />
          </el-form-item>
          <el-form-item label="host" prop="host">
            <el-input v-model="form.host" placeholder="请输入host" />
          </el-form-item>
          <el-form-item label="expireTime" prop="expireTime">
            <el-input v-model="form.expireTime" placeholder="请输入expireTime" />
          </el-form-item>
          <el-form-item label="maxFileSize" prop="maxFileSize">
            <el-input v-model="form.maxFileSize" placeholder="请输入maxFileSize" />
          </el-form-item>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listStorage, getStorage, delStorage, addStorage, updateStorage, getTypeApi } from "@/api/system/storage";

export default {
  name: "Storage",
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 【请填写功能名称】表格数据
      storageList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        openStatus: null,
        storageType: null,
        storageLocation: null,
        config: null,
      },
      form:{},
      // 表单参数
      // 表单校验
      rules: {
        storageType: [{ required: true, message: "请选择储存方式", trigger: "change" }],
        openStatus: [{ required: true, message: "请选择状态", trigger: "change" }],
        endpoint: [{ required: true, message: "请输入endpoint", trigger: "blur" }],
        endpointECS: [{ required: true, message: "请输入endpointECS", trigger: "blur" }],
        accessKeyId: [{ required: true, message: "请输入accessKeyId", trigger: "blur" }],
        accessKeySecret: [{ required: true, message: "请输入accessKeySecret", trigger: "blur" }],
        bucketName: [{ required: true, message: "请输入bucketName", trigger: "blur" }],
        filedir: [{ required: true, message: "请输入filedir", trigger: "blur" }],
        domain: [{ required: true, message: "请输入domain", trigger: "blur" }],
        host: [{ required: true, message: "请输入host", trigger: "blur" }],
        expireTime: [{ required: true, message: "请输入expireTime", trigger: "blur" }],
        maxFileSize: [{ required: true, message: "请输入maxFileSize", trigger: "blur" }],
      },
      saveType:[]
    };
  },
  created() {
    this.getType()
    this.getList();
  },
  methods: {
    getType() {
      getTypeApi().then(res => {
        if(res.code !== 200) return
        this.saveType = res.data
      })
    },
    /** 查询【请填写功能名称】列表 */
    getList() {
      this.loading = true;
      listStorage(this.queryParams).then(response => {
        this.storageList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        storageType: null,
        openStatus: true,
        endpoint: null,
        endpointECS: null,
        accessKeyId: null,
        accessKeySecret: null,
        bucketName: null,
        filedir: null,
        domain: null,
        host: null,
        expireTime: null,
        maxFileSize: null,
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加储存设置";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getStorage(id).then(response => {
        if (response.code !== 200) return this.$modal.msgError(response.msg)
        this.form = {
          ...response.data,
          ...JSON.parse(response.data?.config)
        }
        this.open = true;
        this.title = "修改储存设置";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.getConfigValue()
          let form = this.form
          if(form.storageType !== 'ALI_OSS') {
            form = {
              openStatus:this.form.openStatus,
              storageType:this.form.storageType,
              storageLocation:this.form.storageLocation
            }
          }
          if (this.form.id != null) {
            form.id = this.form.id
            updateStorage(form).then(res => {
              if (res.code !== 200) return this.$modal.msgError(res.msg)
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addStorage(form).then(res => {
              if (res.code !== 200) return this.$modal.msgError(res.msg)
              this.$modal.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    getConfigValue() {
      let form = {}
      for(let k in this.form) {
        if(!['storageType','openStatus'].includes(k)) {
          form[k] = this.form[k]
        }
      }
      this.form.storageLocation = this.saveType.find(item => item.code === this.form.storageType).location
      this.form.config = JSON.stringify(form)
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$modal.confirm('是否确认删除【请填写功能名称】编号为"' + ids + '"的数据项？').then(function() {
        return delStorage(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('system/storage/export', {
        ...this.queryParams
      }, `storage_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
