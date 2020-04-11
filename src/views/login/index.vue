<template>
  <div id="login">
    <section class="form">
      <h1>Login</h1>
      <div class="item">
        <input type="text"
               tabindex="1"
               ref="username"
               v-model="loginForm.username"
               placeholder="username">
      </div>
      <div class="item">
        <input type="password"
               tabindex="2"
               ref="password"
               v-model="loginForm.password"
               placeholder="password">
      </div>
      <div class="item">
        <el-radio v-model="loginForm.lang"
                  label="CN">CN</el-radio>
        <el-radio v-model="loginForm.lang"
                  label="EN">EN</el-radio>
      </div>
      <button class="login"
              @click.prevent="handleLogin">Login</button>
    </section>
  </div>
</template>

<script>
import { getLang } from '@/utils/cookie-util'
export default {
  name: 'Login',
  data () {
    return {
      loginForm: {
        username: 'admin',
        password: '111111',
        lang: getLang() || 'CN'
      },
      passwordType: 'password',
      redirect: undefined,
      otherQuery: {}
    }
  },
  mounted () {
    if (this.loginForm.username === '') {
      this.$refs.username.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    }
  },
  watch: {
    $route: {
      handler: function (route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  methods: {
    handleLogin () {
      this.$store.dispatch('user/login', this.loginForm)
        .then(() => {
          this.$i18n.locale = this.loginForm.lang || 'CN'
          this.$router.push({ path: this.redirect || '/home', query: this.otherQuery })
        })
        .catch((err) => {
          alert(err)
        })
    },
    getOtherQuery (query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    }
  }
}
</script>

<style lang="scss">
#login {
  width: 100%;
  height: 100%;
  position: relative;
  background: url("~@/assets/imgs/bg.jpg") repeat-x;
  background-size: cover;
  .form {
    width: 20%;
    height: 20%;
    min-width: 300px;
    min-height: 300px;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    text-align: center;
    background: rgba(#162948, 0.2);
    border-radius: 10px;
    padding: 15px;
    h1 {
      margin-bottom: 10px;
      font-size: 26px;
      color: #fff;
    }
    .item {
      line-height: 55px;
      input {
        height: 35px;
        background: rgba(#11131a, 0.4);
        border: 1px solid rgba(#e6edef, 0.3);
        border-radius: 5px;
        color: #fff;
        outline: none;
        text-indent: 10px;
      }
      .el-radio {
        color: #fff;
        .el-radio__inner:hover {
          border-color: #38393e;
        }
        &.is-checked {
          .el-radio__inner {
            border-color: #fff;
            background: rgba(#e6edef, 0.5);
          }
          .el-radio__label {
            font-weight: 600;
            color: #38393e;
          }
        }
      }
    }
    button.login {
      font-size: 18px;
      height: 40px;
      width: 100px;
      color: #f1f7fd;
      border-radius: 10px;
      background: linear-gradient(45deg, #040308, #f1f7fd);
      border: none;
      outline: none;
      transition: all 1s;
      &:hover {
        background: linear-gradient(45deg, #f1f7fd, #040308);
        color: #040308;
      }
      &:active {
        color: #f1f7fd;
      }
    }
  }
}
</style>