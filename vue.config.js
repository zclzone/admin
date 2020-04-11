module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/my-admin/' : '/',

  pluginOptions: {
    i18n: {
      locale: 'cn',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: false
    }
  }
}
