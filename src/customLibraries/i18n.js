import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import store from '~/redux/store'
import en from '~/translations/en.js'
import vi from '~/translations/vi.js'

const resources = {
  en: { translation: en },
  vi: { translation: vi }
}

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: store.getState().translations.currentLanguage || 'vi',
    supportedLngs: ['en', 'vi'],
    interpolation: {
      escapeValue: false
    },
    fallbackLng: 'vi'
  })

export default i18n