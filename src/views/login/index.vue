<template>
  <div id="login">
    <section class="form">
      <h1>Login</h1>
      <div class="item">
        <i></i>
        <input type="text"
               tabindex="1"
               ref="username"
               v-model="loginForm.username"
               placeholder="username">
      </div>
      <div class="item">
        <i></i>
        <input type="password"
               tabindex="2"
               ref="password"
               v-model="loginForm.password"
               placeholder="password">
      </div>
      <button class="login"
              @click.prevent="handleLogin">Login</button>
    </section>
  </div>
</template>

<script>

export default {
  name: 'Login',
  data () {
    // 
    return {
      loginForm: {
        username: 'admin',
        password: '111111'
      },
      passwordType: 'password',
      redirect: undefined,
      otherQuery: {}
    }
  },
  created () {
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
          this.$router.push({ path: this.redirect || '/index', query: this.otherQuery })
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

<style lang="scss" scoped>
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
    padding: 30px;
    h1 {
      margin-bottom: 30px;
      font-size: 26px;
      color: #e6edef;
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
    }
    button.login {
      margin-top: 20px;
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