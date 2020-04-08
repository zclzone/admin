import defaultSettings from '@/defaultSettings'

const title = defaultSettings.title || 'My-Admin'

export default function getPageTitle (pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  } else {
    return title
  }
}