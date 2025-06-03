# 🚀 Node.js CI/CD Pipeline Setup

Bu loyiha uchun CI/CD pipeline sozlamalari va buyruqlari quyida keltirilgan. `npm ci` yordamida barqaror, tez va deterministik qurilish (build) jarayoni ta'minlanadi.

### 📦 1. Paketlarni o‘rnatish: `npm ci`

`npm ci` bu — `npm install` ning CI/CD uchun mo‘ljallangan versiyasi. U `node_modules` ni tozalab, `package-lock.json` faylidagi aniq versiyalarga tayanib o‘rnatadi.

```bash
npm ci
```
<br>

---
<br>

## 📄 .env fayl qo'shish

### Faylni nusxalash

`cp` buyrug'i biron bir faylni nusxalash uchun ishlatiladi

```bash
cp .env.example .env
```

### Faylni taxrirlash

`sed` buyrug'i yordamida faylni taxrirlash mumkin

```bash
sed -i 's/^PORT=.*/PORT=4000/' .env
```

