<template>
  <div class="login-container">
    <el-form
      class="login-form"
      :model="loginForm"
      :rules="loginRules"
      ref="loginFormRef"
    >
      <div class="title-container">
        <h3 class="title">{{ $t('msg.login.title') }}</h3>
        <language-select class="langSelect"></language-select>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <el-icon>
            <svg-icon icon="user" />
          </el-icon>
        </span>
        <el-input
          placeholder="username"
          name="username"
          type="text"
          v-model="loginForm.username"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <el-icon>
            <svg-icon icon="password" />
          </el-icon>
        </span>
        <el-input
          placeholder="password"
          name="password"
          :type="passwordType"
          v-model="loginForm.password"
        />
        <span class="show-pwd">
          <el-icon>
            <svg-icon
              @click="onChangePwdType"
              :icon="passwordType === 'password' ? 'eye' : 'eye-open'"
            />
          </el-icon>
        </span>
      </el-form-item>

      <el-button
        type="primary"
        style="width: 100%; margin-bottom: 30px"
        @click="handleLogin"
        >{{ $t('msg.login.loginBtn') }}</el-button
      >
    </el-form>
  </div>
</template>

<script setup>
import LanguageSelect from '@/components/languageSelect/'
import { ref } from 'vue'
import { validatePassword } from './rules'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const loginForm = ref({
  username: 'admin',
  password: '123456'
})

//表单验证规则
const loginRules = ref({
  username: [
    {
      required: true,
      trigger: 'blur',
      message: t('msg.login.usernameRule')
    }
  ],
  password: [
    {
      required: true,
      trigger: 'blur',
      validator: validatePassword()
    }
  ]
})

const passwordType = ref('password')

// methods

// 处理明文密文切换
const onChangePwdType = () => {
  passwordType.value = passwordType.value === 'password' ? 'text' : 'password'
}
// 登录
const store = useStore()
const loginFormRef = ref(null)
const router = useRouter()
const handleLogin = () => {
  loginFormRef.value.validate(valid => {
    if (!valid) {
      return
    }
    store
      .dispatch('user/login', loginForm.value)
      .then(() => {
        router.push('/')
      })
      .catch(err => {
        console.log(err)
      })
  })
}
</script>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
$cursor: #fff;

.login-container {
  width: 100%;
  min-height: 100%;
  background: $bg;
  overflow: hidden;

  .login-form {
    width: 500px;
    max-width: 100%;
    margin: 0 auto;
    padding: 160px 35px 0;
    overflow: hidden;

    :deep(.el-form-item) {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;

      .el-input {
        display: inline-block;
        height: 47px;
        width: 85%;
        .el-input__wrapper {
          width: 100%;
          background: transparent;
          border: none;
          box-shadow: none;
          input {
            background: transparent;
            border: 0px;
            // -webkit-appearance: none;
            border-radius: 0px;
            padding: 12px 5px 12px 15px;
            color: $light_gray;
            height: 47px;
            // 改变输入框光标颜色，同时又不改变输入框里面的内容的颜色
            caret-color: $cursor;
          }
        }
      }
    }

    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      display: inline-block;
    }

    .title-container {
      position: relative;

      .title {
        font-size: 26px;
        color: $light_gray;
        margin: 0px auto 40px auto;
        text-align: center;
        font-weight: bold;
        height: 40px;
        line-height: 40px;
      }
      :deep(.langSelect) {
        position: absolute;
        top: 0;
        right: 0;
        font-size: 24px;
        color: #fff;
        background: #fff;
      }
    }
  }
}
</style>
