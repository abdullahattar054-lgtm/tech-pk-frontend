#!/bin/bash

# Production Cleanup & Optimization Script
# Run this before deployment

echo "🧹 Starting Production Cleanup & Optimization..."

# ===== FRONTEND CLEANUP =====
echo -e "\n📦 Cleaning Frontend..."

# Remove console.log statements from source files
find src -name "*.jsx" -o -name "*.js" | while read file; do
  # Remove console.log, console.warn, console.error (but not in ErrorBoundary)
  if [[ "$file" != *"ErrorBoundary"* ]]; then
    sed -i '/console\.\(log\|warn\|error\|info\|debug\)/d' "$file"
    echo "✓ Cleaned console from $file"
  fi
done

# ===== DEPENDENCY CHECK =====
echo -e "\n🔍 Checking Dependencies..."
npm outdated --long | grep -E "^(package|red|yellow)" && echo "⚠️  Update outdated packages" || echo "✅ All dependencies up to date"

# ===== BUILD =====
echo -e "\n🔨 Building Production Bundle..."
npm run build

# ===== BUILD ANALYSIS =====
echo -e "\n📊 Bundle Analysis:"
du -sh dist/
echo "Files in dist:"
find dist -type f | wc -l

# ===== PERFORMANCE CHECK =====
echo -e "\n⚡ Performance Checks:"
echo "- JavaScript bundle size:"
du -sh dist/js/
echo "- CSS bundle size:"
du -sh dist/css/
echo "- Total assets:"
du -sh dist/

# ===== SECURITY CHECK =====
echo -e "\n🔐 Security Checks:"
npm audit

# ===== CLEANUP =====
echo -e "\n🗑️  Removing build artifacts..."
rm -rf dist/.map
rm -rf node_modules/.cache

echo -e "\n✅ Production Cleanup Complete!"
echo -e "\n📋 Pre-Deployment Checklist:"
echo "- [ ] All console.log removed"
echo "- [ ] Environment variables set"
echo "- [ ] Bundle size optimized"
echo "- [ ] Security audit passed"
echo "- [ ] All tests passing"
echo "- [ ] API endpoints verified"
echo "- [ ] Database backups ready"
echo "- [ ] Monitoring configured"

echo -e "\n🚀 Ready for deployment!"
