#!/bin/bash

# Script de despliegue local a AWS S3 y CloudFront
# Uso: ./scripts/deploy.sh [environment]

set -e

ENVIRONMENT=${1:-production}
BUCKET_NAME=""
DISTRIBUTION_ID=""
REGION="us-east-1"

# Cargar variables de entorno según el ambiente
if [ "$ENVIRONMENT" = "staging" ]; then
    source .env.staging
    BUCKET_NAME=$STAGING_S3_BUCKET_NAME
    DISTRIBUTION_ID=$STAGING_CLOUDFRONT_DISTRIBUTION_ID
elif [ "$ENVIRONMENT" = "production" ]; then
    source .env.production
    BUCKET_NAME=$PRODUCTION_S3_BUCKET_NAME
    DISTRIBUTION_ID=$PRODUCTION_CLOUDFRONT_DISTRIBUTION_ID
else
    echo "❌ Ambiente no válido. Usa 'staging' o 'production'"
    exit 1
fi

echo "🚀 Iniciando despliegue a $ENVIRONMENT..."

# Verificar que las variables estén definidas
if [ -z "$BUCKET_NAME" ] || [ -z "$DISTRIBUTION_ID" ]; then
    echo "❌ Variables de entorno no configuradas correctamente"
    exit 1
fi

# Construir la aplicación
echo "📦 Construyendo aplicación..."
npm run build

# Sincronizar con S3
echo "☁️ Subiendo a S3..."
aws s3 sync ./out s3://$BUCKET_NAME --delete --cache-control "max-age=31536000,public"

# Configurar cache para archivos HTML
echo "📄 Configurando cache para archivos HTML..."
aws s3 cp ./out s3://$BUCKET_NAME --recursive --exclude "*" --include "*.html" --cache-control "no-cache,no-store,must-revalidate"

# Configurar cache para archivos JS y CSS
echo "🎨 Configurando cache para archivos JS y CSS..."
aws s3 cp ./out s3://$BUCKET_NAME --recursive --exclude "*" --include "*.js" --include "*.css" --cache-control "max-age=31536000,public"

# Invalidar cache de CloudFront
echo "🔄 Invalidando cache de CloudFront..."
aws cloudfront create-invalidation \
    --distribution-id $DISTRIBUTION_ID \
    --paths "/*"

echo "✅ Despliegue completado exitosamente!"
echo "🌐 Sitio desplegado en: https://$BUCKET_NAME.s3-website-$REGION.amazonaws.com"
