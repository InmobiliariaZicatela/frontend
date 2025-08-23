# 🚀 Despliegue Rápido - Inmobiliaria Zicatela Frontend

## ⚡ Configuración Inmediata (5-10 minutos)

### 1. GitHub Secrets (3 min)

Ve a tu repo → Settings → Secrets and variables → Actions y agrega:

#### Variables de la Aplicación:

```
NEXT_PUBLIC_STRAPI_URL=https://tu-strapi.com
STRAPI_TOKEN=tu-strapi-token
NEXT_PUBLIC_SITE_URL=https://tu-dominio.com
```

#### Variables de AWS:

```
AWS_ACCESS_KEY_ID=tu-access-key
AWS_SECRET_ACCESS_KEY=tu-secret-key
S3_BUCKET_NAME=tu-bucket
CLOUDFRONT_DISTRIBUTION_ID=tu-distribution-id
```

### 2. AWS Setup (3 min)

```bash
# Crear bucket S3
aws s3 mb s3://inmobiliaria-zicatela-frontend

# Configurar como website estático
aws s3 website s3://inmobiliaria-zicatela-frontend --index-document index.html --error-document 404.html

# Aplicar política de bucket
aws s3api put-bucket-policy --bucket inmobiliaria-zicatela-frontend --policy file://bucket-policy.json

# Crear distribución CloudFront (opcional, para mejor rendimiento)
aws cloudfront create-distribution --distribution-config file://cloudfront-config.json
```

### 3. Push y Despliegue Automático (1 min)

```bash
git add .
git commit -m "🚀 Setup deployment pipeline"
git push origin main
```

## ✅ ¡Listo!

El pipeline se ejecutará automáticamente en GitHub Actions:

1. **Build**: Compila tu app Next.js con `npm run build`
2. **Export**: Genera archivos estáticos en `/out`
3. **Deploy**: Sincroniza con S3 y actualiza CloudFront
4. **Cache**: Invalida caché de CloudFront

## 🔍 Verificar Despliegue

1. Ve a **GitHub Actions** en tu repo
2. Verifica que el workflow "Deploy to AWS S3 and CloudFront" esté ejecutándose
3. Revisa los logs para confirmar éxito
4. Tu sitio estará disponible en:
   - **S3 Website**: `http://inmobiliaria-zicatela-frontend.s3-website-us-east-1.amazonaws.com`
   - **CloudFront**: `https://tu-distribution-id.cloudfront.net` (si configuraste CloudFront)

## 🚨 Notas Importantes

- **Next.js 15**: Tu app usa `output: "export"` para generar archivos estáticos
- **Build Process**: Se ejecuta `npm run build` automáticamente
- **Environment Variables**: Se crean automáticamente en `.env.local` durante el build
- **Cache Control**: Archivos estáticos se cachean por 1 año, HTML por 0 tiempo

## 🆘 Si algo falla

- Revisa que todos los secrets estén configurados correctamente
- Verifica permisos de AWS (S3, CloudFront, IAM)
- Asegúrate de que el bucket S3 esté configurado como website
- Consulta `DEPLOYMENT.md` para troubleshooting completo
- Revisa los logs de GitHub Actions para errores específicos

## 🔧 Comandos Útiles

```bash
# Verificar configuración de AWS
aws sts get-caller-identity

# Listar buckets
aws s3 ls

# Verificar website del bucket
aws s3 website s3://inmobiliaria-zicatela-frontend

# Invalidar caché manualmente
aws cloudfront create-invalidation --distribution-id TU_ID --paths "/*"
```
