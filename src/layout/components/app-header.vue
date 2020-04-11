<template>
  <div class="header-container">
    <div class="logo">
      <h2 v-t="{path:'message.projectName'}"></h2>
    </div>
    <div class="info">
      <el-dropdown @command="handleCommand"
                   trigger="click">
        <img :src="avatar"
             class="avatar">
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

      <span class="name">{{name}}</span>
      <lang-dropdown :langs="langs"
                     :title="$t('message.selectLang')" />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

import LangDropdown from '@/components/lang-dropdown'

export default {
  data () {
    return {
      langs: [
        { title: '中文简体', lang: 'CN' },
        { title: 'English', lang: 'EN' }
      ]
    }
  },
  methods: {
    handleCommand (command) {
      switch (command) {
        case 'logout':
          this.$store.dispatch('user/logout').then(res => {
            if (res.code === 20000) {
              this.$router.push('/login')
            } else {
              console.error(res.data);
            }
          })
      }
    }
  },
  components: {
    LangDropdown,
  },
  computed: {
    ...mapState({
      name: state => state.user.name,
      avatar: state => state.user.avatar,
      routes: state => state.permission.routes
    })
  }
}
</script>

<style lang="scss" scoped>
.header-container {
  width: 100%;
  height: 40px;
  line-height: 40px;
  display: flex;
  justify-content: space-between;
  .logo {
    h2 {
      margin: 0;
      padding: 0;
      color: #fff;
    }
  }
  .info {
    height: 100%;
    .avatar {
      height: 30px;
      width: 30px;
      vertical-align: middle;
      margin-right: 20px;
      border-radius: 5px;
      cursor: pointer;
    }
    .name {
      color: #000;
      margin-right: 20px;
      &:hover {
        color: #fff;
      }
    }
  }
}
</style>