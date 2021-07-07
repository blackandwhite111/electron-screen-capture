<template>
    <div class="home-capture-wrapper">
      <el-row>
        <el-button round plain @click="toCapture()">截屏</el-button>
        <el-button round plain @click="clear()">清空</el-button>
      </el-row>
      <div>
        <el-row :gutter="20">
          <el-col :span="10"><div class="">
            <div class="grid-content-title">当前截图图片</div>
          </div></el-col>
          <el-col :span="14"><div class="">
            <div class="grid-content-title">当前截图识别文字</div>
          </div></el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="10"><div class="grid-content bg-purple">
            <el-image :src="src"></el-image>
          </div></el-col>
          <el-col :span="14"><div class="captureToWord-parent grid-content bg-purple">
            <div v-loading="loading" class="captureToWord">
              <textarea v-html="text" style="width: 100%; height: 100%; font-size: 14px;"></textarea>
            </div>
          </div></el-col>
        </el-row>
      </div>
    </div>
</template>

<script>
  import {ipcRenderer} from "electron";

  export default {
    name: "home_capture",
    data() {
      return {
        loading: false,
        src: "",
        text: ""
      }
    },
    mounted() {
      ipcRenderer.on('captureResult', (event, imgBase64) => {
        this.src = imgBase64;
        this.handleImage()
      })
    },
    methods: {
      getBaiduToken: function () {
        // let url = "https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=OqIp4UKeXhGxGj8Lzky7qjCb&client_secret=bcBhEY0UOSyAbraU5RmUOBQG1yj0PIoN"
        let url = "/api/accessToken?grant_type=client_credentials&client_id=OqIp4UKeXhGxGj8Lzky7qjCb&client_secret=bcBhEY0UOSyAbraU5RmUOBQG1yj0PIoN"
        return this.$http({
          url: url,
          method: 'post',
          data: {},
          // headers: {
          //   "Content-Type": 'application/x-www-form-urlencoded'
          // }
        })
      },
      toBaiduOrc: function (token) {
        let url = "/api/orc";
        url += `?access_token=${token}`;
        let form = new FormData();
        form.append('image', this.src)
        form.append('language_type', "auto_detect")
        return this.$http({
          url: url,
          method: 'post',
          data: form,
          headers: {
            "Content-Type": 'application/x-www-form-urlencoded'
          }
        })
      },
      handleImage: async function () {
        try {
          this.loading = true;
          let token = await this.getBaiduToken();
          let orcResult = await this.toBaiduOrc(token.data.access_token)
          this.setWords(orcResult.data.words_result)
          this.loading = false;
        }catch (e) {
          this.loading = false;
          this.$message.error('调用接口失败，'+ e);
        }

      },
      setWords: function (arr) {
        let str = "";
        for (let i=0;i<arr.length; i++) {
          str = str + arr[i].words + '\n' + '\n'
        }
        this.text = str;
      },
      toCapture: function() {
        ipcRenderer.send('capture')
      },
      clear: function () {
        this.src = "";
        this.text = "";
      }
    }
  }
</script>

<style scoped>
.home-capture-wrapper {
  padding: 20px;
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  padding: 8px;
  border-radius: 4px;
  min-height: 90vh;
}
.grid-content-title {
  background: #fff;
  border: 10px;
  text-align: center;
  font-size: 12px;
  margin-bottom: 10px;
}
.captureToWord-parent {
  position: relative;
}
.captureToWord {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: 8px;
  padding: 5px;
  font-size: 14px;
  background: #ffffff;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>