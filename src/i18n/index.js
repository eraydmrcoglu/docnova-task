import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

const resources = {
  tr: {
    translation: {
      login: 'Giriş Yap',
      email: 'E-posta',
      password: 'Şifre',
      logout: 'Çıkış Yap',
      invoiceList: 'Fatura Listesi',
      invoiceDetail: 'Fatura Detayı',
      invoiceNumber: 'Fatura No',
      date: 'Tarih',
      status: 'Durum',
      amount: 'Tutar (EUR)',
      action: 'İşlem',
      detail: 'Detay',
      customer: 'Müşteri',
      supplier: 'Tedarikçi',
      type: 'Tür',
      back: 'Listeye Dön',
    }
  },
  en: {
    translation: {
      login: 'Login',
      email: 'Email',
      password: 'Password',
      logout: 'Logout',
      invoiceList: 'Invoice List',
      invoiceDetail: 'Invoice Detail',
      invoiceNumber: 'Invoice No',
      date: 'Date',
      status: 'Status',
      amount: 'Amount (EUR)',
      action: 'Action',
      detail: 'Detail',
      customer: 'Customer',
      supplier: 'Supplier',
      type: 'Type',
      back: 'Back to List',
    }
  }
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'tr',
    interpolation: {
      escapeValue: false
    }
  })

export default i18n
