# 🚀 Guía de Despliegue - Inmobiliaria Zicatela Frontend

## 📋 Prerrequisitos

- Cuenta de GitHub
- Cuenta de AWS con permisos para S3, CloudFront e IAM
- AWS CLI configurado localmente (opcional, para despliegues manuales)

## 🔧 Configuración Inicial

### 1. Configurar GitHub Secrets

Ve a tu repositorio en GitHub → Settings → Secrets and variables → Actions y agrega:

#### Variables de la Aplicación:

- `STRAPI_URL`: URL de tu instancia de Strapi
- `STRAPI_API_TOKEN`: Token de API de Strapi
- `GOOGLE_MAPS_API_KEY`: Clave de API de Google Maps
- `WHATSAPP_NUMBER`: Número de WhatsApp para contacto
- `SITE_URL`: URL de tu sitio web

#### Variables de AWS:

- `AWS_ACCESS_KEY_ID`: Access Key ID de AWS
- `AWS_SECRET_ACCESS_KEY`: Secret Access Key de AWS
- `S3_BUCKET_NAME`: Nombre de tu bucket S3
- `CLOUDFRONT_DISTRIBUTION_ID`: ID de tu distribución CloudFront

### 2. Configurar AWS

#### Crear Bucket S3:

```bash
aws s3 mb s3://inmobiliaria-zicatela-frontend
aws s3 website s3://inmobiliaria-zicatela-frontend --index-document index.html --error-document 404.html
```

#### Configurar Política del Bucket:

```bash
aws s3api put-bucket-policy --bucket inmobiliaria-zicatela-frontend --policy file://bucket-policy.json
```

#### Crear Distribución CloudFront:

```bash
aws cloudfront create-distribution --distribution-config file://cloudfront-config.json
```

## 🚀 Despliegue Automático

### GitHub Actions

El despliegue se ejecuta automáticamente cuando:

- Se hace push a la rama `main` (producción)
- Se hace push a la rama `develop` (staging)
- Se crea un Pull Request a `main`

### Flujo del Pipeline:

1. **Checkout**: Descarga el código
2. **Setup Node.js**: Configura Node.js 18
3. **Install Dependencies**: Instala dependencias con `npm ci`
4. **Environment Setup**: Crea archivo `.env.local` con secrets
5. **Build**: Construye la aplicación Next.js
6. **AWS Setup**: Configura credenciales de AWS
7. **S3 Deploy**: Sincroniza archivos con S3
8. **CloudFront Invalidation**: Invalida cache de CloudFront

## 🛠️ Despliegue Manual

### Usar Script de Despliegue:

```bash
# Hacer ejecutable el script
chmod +x scripts/deploy.sh

# Desplegar a producción
./scripts/deploy.sh production

# Desplegar a staging
./scripts/deploy.sh staging
```

### Despliegue Directo con AWS CLI:

```bash
# Construir
npm run build

# Sincronizar con S3
aws s3 sync ./out s3://tu-bucket --delete

# Invalidar CloudFront
aws cloudfront create-invalidation --distribution-id tu-distribution-id --paths "/*"
```

## 📁 Estructura de Archivos de Despliegue

```
.github/
  workflows/
    deploy.yml          # Pipeline de GitHub Actions
scripts/
  deploy.sh            # Script de despliegue manual
aws-config.json        # Configuración de AWS CloudFormation
env.example            # Ejemplo de variables de entorno
DEPLOYMENT.md          # Esta documentación
```

## 🔒 Seguridad y Buenas Prácticas

### Variables de Entorno:

- ✅ **NUNCA** commits variables de entorno reales
- ✅ Usa GitHub Secrets para variables sensibles
- ✅ Prefija variables públicas con `NEXT_PUBLIC_`
- ✅ Usa diferentes variables para staging/producción

### AWS:

- ✅ Usa IAM roles con permisos mínimos necesarios
- ✅ Rota regularmente las Access Keys
- ✅ Usa CloudTrail para auditoría
- ✅ Configura alertas de CloudWatch

### Pipeline:

- ✅ Valida código antes del despliegue
- ✅ Usa cache de dependencias
- ✅ Implementa rollback automático
- ✅ Monitorea el estado del despliegue

## 🐛 Troubleshooting

### Error: "Build failed"

- Verifica que todas las variables de entorno estén configuradas
- Revisa los logs del build en GitHub Actions
- Asegúrate de que las dependencias estén actualizadas

### Error: "AWS credentials not found"

- Verifica que los GitHub Secrets estén configurados correctamente
- Asegúrate de que las credenciales tengan permisos suficientes
- Verifica la región de AWS configurada

### Error: "S3 sync failed"

- Verifica que el bucket S3 exista
- Asegúrate de que las credenciales tengan permisos de S3
- Verifica que el bucket tenga la política correcta

### Error: "CloudFront invalidation failed"

- Verifica que el Distribution ID sea correcto
- Asegúrate de que las credenciales tengan permisos de CloudFront
- Verifica que la distribución esté habilitada

## 📞 Soporte

Si tienes problemas con el despliegue:

1. Revisa los logs de GitHub Actions
2. Verifica la configuración de AWS
3. Consulta la documentación de Next.js sobre export estático
4. Revisa los permisos de IAM en AWS

## 🔄 Actualizaciones

Para actualizar la configuración de despliegue:

1. Modifica los archivos de configuración
2. Haz commit y push a la rama correspondiente
3. El pipeline se ejecutará automáticamente
4. Verifica que el despliegue sea exitoso

---

**Nota**: Este pipeline está configurado para Next.js con export estático. Si cambias la configuración de Next.js, asegúrate de que sea compatible con el despliegue a S3.
