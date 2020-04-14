<template>
  <h2>This is Detail Page</h2>
</template>

<script>
export default {
  beforeRouteEnter (to, from, next) {
    switch (to.params.id) {
      case 'add':
        document.title = `${to.meta.title}-创建`
        break
      case 'edit':
        document.title = `${to.meta.title}-编辑`
        break
      default:
        document.title = `${to.meta.title}-查看`
    }
    next()
  }
}
</script>