<template>
  <h2>This is Detail Page</h2>
</template>

<script>
export default {
  beforeRouteEnter (to, from, next) {
    console.log(to)
    switch (to.query.action) {
      case 'add':
        to.meta.title = `${to.meta.title}-创建`
        document.title = to.meta.title
        break
      case 'edit':
        to.meta.title = `${to.meta.title}-编辑`
        document.title = to.meta.title
        break
      default:
        to.meta.title = `${to.meta.title}-查看`
        document.title = to.meta.title
    }
    next()
  },
  mounted () {
  },
}
</script>