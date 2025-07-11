# 📄 Docnova

Bu proje, Docnova API’si ile entegre çalışan bir fatura listeleme ve detay görüntüleme uygulamasıdır. Giriş yaparak kullanıcıya özel fatura listesini tablo halinde gösteriyorum, kullanıcı isterse detay sayfasında da fatura bilgilerini inceleyebiliyor.

---

## 🚀 Kurulum ve Çalıştırma

### 1. Repo Klonlama

```bash
git clone https://github.com/eraydmrcoglu/docnova-task.git
cd docnova
```

### 2. Gerekli Paketleri Yükleme

```bash
npm install --legacy-peer-deps
# veya
yarn install --legacy-peer-deps
```

### 3. Uygulamayı Başlatma

```bash
npm start
# veya
yarn start
```

Uygulama `http://localhost:3000` adresinde çalışmaya başlar.

---

## 📂 Proje Klasör Yapısı

```
src/
├── api/                     
│   └── axios.js
│
├── store/                     
│   └── store.js
│
├── features/
│   ├── auth/               
│   │   ├── authSlice.js
│   │   └── LoginPage.jsx
│   │
│   └── invoice/             
│       ├── invoiceSlice.js
│       ├── InvoiceListPage.jsx
│       └── InvoiceDetailPage.jsx
│
├── i18n/                    
│   ├── index.js
│
├── App.jsx                  
├── index.jsx                
└── index.css                
```

---

## 🔐 Giriş Bilgisi

Giriş için bu endpoint'e istek gönderiyorum:

```http
POST /auth/login/dev
```

Email: devmelauser@yopmail.com
Password: Work123???

Başarılı giriş sonrası dönen kullanıcı objesini hem `Redux store`'da hem de `localStorage`'da saklıyorum.

---

## 📦 Kullandığım Teknolojiler

- React.js
- Redux Toolkit
- React Router
- Ant Design (UI Kit)
- Axios
- i18next (çoklu dil desteği)

---

## 🧠 Geliştirme Notlarım

- Giriş yaptıktan sonra kullanıcı bilgisini `Redux` ve `localStorage` ile saklıyorum.
- Faturaları ayrı bir slice içinde saklıyorum.
- Sayfa yenilendiğinde hem kullanıcı hem de fatura verileri korunuyor.
- Hatalı API isteklerinde kullanıcıya uyarı gösteriyorum.
- Hem liste hem de detay sayfasındaki tabloları şık, kenarlıklı ve responsive tasarladım.
- Logout işlemiyle birlikte kullanıcıyı login ekranına yönlendiriyorum.
- Kodun temiz, okunabilir ve sürdürülebilir olması için dikkat ettim.
