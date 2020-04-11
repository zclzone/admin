<template>
  <div class="view">
    <h1>i18n多语言国际化</h1>
    <p>{{ $t('message.hello{name}', { name: 'Ronnie' }) }}</p>
    <p v-t="{path:'message.hello{name}',args: { name: 'Ronnie' }}"></p>
  </div>

</template>

<script>
export default {
  data () {
    return {
    }
  }
}
</script>

