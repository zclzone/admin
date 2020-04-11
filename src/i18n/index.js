import Vue from 'vue'
import VueI18n from 'vue-i18n'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
import enLocale from 'element-ui/lib/locale/lang/en'
import { getLang } from '@/utils/cookie-util'

Vue.use(VueI18n)

function loadLocaleMessages () {
  const locales = require.context('./locales', true, /[A-Za-z0-9-_,\s]+\.json$/i)
  let messages = {}
  locales.keys().forEach(key => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i)
    if (matched && matched.length > 1) {
      const locale = matched[1]
      messages[locale] = locales(key)
    }
  })
  // 加上elementui国际化
  messages = {
    CN: {
      ...messages.CN,
      ...zhLocale
    },
    EN: {
      ...messages.EN,
      ...enLocale
    }
  }
  return messages
}

export default new VueI18n({
  // locale: process.env.VUE_APP_I18N_LOCALE || 'en',
  // fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'en',
  locale: getLang() || 'CN',
  fallbackLocale: 'EN',
  messages: loadLocaleMessages(),
  silentFallbackWarn: true,   //取消回退到根语言环境生成的警告，用于组件内配置语言环境信息
  preserveDirectiveContent: true  //防止<transition>过渡动画时翻译闪烁问题
})
