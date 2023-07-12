<script setup>
  import { ref } from 'vue'
  import { ElMessage } from 'element-plus'
  import 'element-plus/theme-chalk/el-message.css'
  import { useRouter } from 'vue-router'
  // import { loginAPI } from '@/apis/user'
  import { useUserStore } from '@/stores/userStore'

  const userInfo = ref({
    account: 'heima282',
    password: 'hm#qd@23!',
    agree: true
  })

  const rules = {
    account: [
      { required: true, message: '用户名不能为空', trigger: 'blur' }
    ],
    password: [
    { required: true, message: '密码不能为空', trigger: 'blur' },
    { min: 6, max: 24, message: '密码长度要求6-14个字符', trigger: 'blur' }
    ],
    agree: [
      {
        validator: (rule, val, callback) => {
          return val ? callback() : callback(new Error('请先同意协议'))
        }
      }
    ]
  }

  const formRef = ref(null)
  const router = useRouter()
  const userStore = useUserStore()
  const doLogin = () => {
    const { account, password } = userInfo.value
    formRef.value.validate( async (valid) => {
      if ( valid ) {
        // await loginAPI({ account, password })
        await userStore.getUserInfo({ account, password })
        // elementPlus
        ElMessage({ type: 'success', message: '登录成功' })
        router.replace({ path: '/' })
      }
    })
  }
</script>

<template>
  <div>
    <header class="login-header">
      <div class="container" m-top-20>
        <h1 class="logo">
          <router-link to="/">小兔鲜</router-link>
        </h1>
        <router-link to="/" class="entry">
          进入网站首页
          <i class="iconfont icon-angle-right"></i>
          <i class="iconfont icon-angle-right"></i>
        </router-link>
      </div>
    </header>

    <section class="login-section">
      <div class="wrapper">
        <nav>
          <a href="javascript:;">账户登录</a>
        </nav>
        <div class="account-box">
          <!-- elementPlus：status-icon 用于显示input框里的校验状态，需要写在 el-form里 -->
          <div class="form">
            <el-form label-position="right" label-width="60px"  ref="formRef" :model="userInfo" :rules="rules" status-icon>
              <el-form-item  label="账户" prop="account">
                <el-input v-model="userInfo.account"/>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input v-model="userInfo.password"/>
              </el-form-item>
              <el-form-item label-width="22px" prop="agree">
                <el-checkbox  size="large" v-model="userInfo.agree">
                  我已同意隐私条款和服务条款
                </el-checkbox>
              </el-form-item>
              <el-button size="large" class="subBtn" @click="doLogin">点击登录</el-button>
            </el-form>
          </div>
        </div>
      </div>
    </section>

    <footer class="login-footer">
      <div class="container">
        <p>
          <a href="javascript:;">关于我们</a>
          <a href="javascript:;">帮助中心</a>
          <a href="javascript:;">售后服务</a>
          <a href="javascript:;">配送与验收</a>
          <a href="javascript:;">商务合作</a>
          <a href="javascript:;">搜索推荐</a>
          <a href="javascript:;">友情链接</a>
        </p>
        <p>CopyRight &copy; 小兔鲜儿</p>
      </div>
    </footer>
  </div>
</template>

<style lang="scss" scoped>
  .login-header {
    background: #fff;
    border-bottom: 1px solid #e4e4e4;
    .container {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      .logo {
        width: 200px;
        a {
          display: block;
          height: 132px;
          width: 100%;
          text-indent: -999px;  // 文字不显示，只显示图片
          // 18px是图片的高低
          background: url("@/assets/images/logo.png") no-repeat center 18px / contain;
        }
      }

      .entry {
        width: 120px;
        margin-bottom: 38px;
        font-size: 16px;
        i {
          font-size: 14px;
          color: $xtxColor;
          letter-spacing: -5px;
        }
      }
    }
  }

  .login-section {
    background: url('@/assets/images/login-bg.png') no-repeat center / cover ;
    height: 488px;
    position: relative;
    .wrapper {
      position: absolute;
      left: 50%;
      top: 54px;
      width: 380px;
      background: #fff;
      // 向右移动了100px
      transform: translate3d(100px, 0, 0);
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
      
      nav {
        margin-bottom: 20px;
        padding: 0 40px;
        height: 55px;
        font-size: 18px;
        border-bottom: 1px solid #f5f5f5;
        text-align: center;
        a {
          display: inline-block;
          line-height: 55px;
        }

      }

      .account-box {
        .form {
          padding: 0 20px 20px 20px;

          .subBtn {
            background: $xtxColor;
            width: 100%;
            color: #fff;
          }
        }
      }
    }
  }

  .login-footer {
    padding: 30px 0 50px;
    background: #fff;
    p {
      padding-top: 20px;
      text-align: center;
      color: #999;
      a {
        padding: 0 10px;
        color: #999;
        // 前面有 <a> 元素的每个 <a> 元素  
        // 除了第一个a，其余a都加左边框
        ~a {
          border-left: 1px solid #ccc;
        }
      }
    }
  }
</style>