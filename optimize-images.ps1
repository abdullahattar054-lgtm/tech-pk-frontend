$imagesDir = "c:\ANTIGRAVITY\tech-pk-frontend\public\images\products"
$files = Get-ChildItem $imagesDir -File

Write-Host "Starting image optimization..." -ForegroundColor Green

foreach ($file in $files) {
    if ($file.Extension -match "\.(jpg|jpeg|png)$") {
        $inputPath = $file.FullName
        $sizeMB = [math]::Round($file.Length/1MB, 2)
        
        # Skip if already optimized (less than 500KB)
        if ($file.Length -lt 500000) {
            Write-Host "Skipping $($file.Name) - already optimized ($sizeMB MB)" -ForegroundColor Yellow
            continue
        }
        
        $outputPath = "$($file.DirectoryName)\temp_$($file.Name)"
        
        Write-Host "Optimizing $($file.Name) ($sizeMB MB)..." -ForegroundColor Cyan
        
        # Determine quality based on original size
        $quality = if ($sizeMB -gt 5) { 15 } elseif ($sizeMB -gt 2) { 18 } else { 20 }
        
        # Scale to 1200px width for product images, maintain aspect ratio
        # Use appropriate quality level
        ffmpeg -y -v error -i $inputPath -vf "scale=1200:-1" -q:v $quality $outputPath
        
        if (Test-Path $outputPath) {
            $newSizeMB = [math]::Round((Get-Item $outputPath).Length/1MB, 2)
            Remove-Item $inputPath
            Rename-Item $outputPath $file.Name
            Write-Host "Done. Reduced from $sizeMB MB to $newSizeMB MB" -ForegroundColor Green
        } else {
            Write-Error "Failed to optimize $($file.Name)"
        }
    }
}

Write-Host "`nOptimization complete!" -ForegroundColor Green

