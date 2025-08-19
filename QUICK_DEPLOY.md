# 🚀 Despliegue Rápido - 5 Minutos

## ⚡ Configuración Inmediata

### 1. GitHub Secrets (2 min)

Ve a tu repo → Settings → Secrets → Actions y agrega:

```
STRAPI_URL=https://tu-strapi.com
STRAPI_API_TOKEN=tu-token
GOOGLE_MAPS_API_KEY=tu-api-key
WHATSAPP_NUMBER=+525512345678
SITE_URL=https://tu-dominio.com
AWS_ACCESS_KEY_ID=tu-access-key
AWS_SECRET_ACCESS_KEY=tu-secret-key
S3_BUCKET_NAME=tu-bucket
CLOUDFRONT_DISTRIBUTION_ID=tu-distribution-id
```

### 2. AWS Setup (2 min)

```bash
# Crear bucket
aws s3 mb s3://inmobiliaria-zicatela-frontend

# Configurar como website
aws s3 website s3://inmobiliaria-zicatela-frontend --index-document index.html

# Aplicar política
aws s3api put-bucket-policy --bucket inmobiliaria-zicatela-frontend --policy file://bucket-policy.json
```

### 3. Push y Despliegue (1 min)

```bash
git add .
git commit -m "🚀 Setup deployment pipeline"
git push origin main
```

## ✅ ¡Listo!

El pipeline se ejecutará automáticamente y desplegará tu app a AWS.

## 🔍 Verificar Despliegue

1. Ve a GitHub Actions en tu repo
2. Verifica que el workflow "Deploy to AWS" esté ejecutándose
3. Revisa los logs para confirmar éxito
4. Tu sitio estará disponible en: `https://tu-bucket.s3-website-us-east-1.amazonaws.com`

## 🆘 Si algo falla

- Revisa que todos los secrets estén configurados
- Verifica permisos de AWS
- Consulta `DEPLOYMENT.md` para troubleshooting completo
