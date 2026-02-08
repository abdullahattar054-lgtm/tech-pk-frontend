
Add-Type -AssemblyName System.Drawing

$sourceDir = "C:\CHMN"
$destDir = "c:\ANTIGRAVITY\tech-pk-frontend\src\assets\blog"

# Create destination directory
if (!(Test-Path $destDir)) {
    New-Item -ItemType Directory -Force -Path $destDir | Out-Null
}

function Optimize-Image {
    param (
        [string]$SourcePath,
        [string]$DestPath
    )

    Write-Host "Processing: $SourcePath -> $DestPath"

    if (!(Test-Path $SourcePath)) {
        Write-Error "File not found: $SourcePath"
        return
    }

    try {
        $img = [System.Drawing.Image]::FromFile($SourcePath)
        
        # Calculate new dimensions (max width 1200)
        $newWidth = 1200
        if ($img.Width -lt 1200) { $newWidth = $img.Width }
        
        $ratio = $img.Height / $img.Width
        $newHeight = [int]($newWidth * $ratio)

        # Create new bitmap
        $resized = New-Object System.Drawing.Bitmap $newWidth, $newHeight
        $graph = [System.Drawing.Graphics]::FromImage($resized)
        
        # High quality settings
        $graph.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
        $graph.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
        $graph.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
        
        # Handle transparency by adding white background
        $graph.Clear([System.Drawing.Color]::White)
        $graph.DrawImage($img, 0, 0, $newWidth, $newHeight)

        # Encoder for JPG
        $codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq "image/jpeg" }
        $encParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
        $encParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]80)

        # Save
        $resized.Save($DestPath, $codec, $encParams)
        
        # Cleanup
        $img.Dispose()
        $resized.Dispose()
        $graph.Dispose()
        
        Write-Host "Success!"
    }
    catch {
        Write-Error "Failed to process $SourcePath : $_"
    }
}

# Map images
Optimize-Image "$sourceDir\black ear buds pro .jpg.jpg" "$destDir\blog-1-earbuds.jpg"
Optimize-Image "$sourceDir\white watch. smart jpg.png" "$destDir\blog-2-watch.jpg"
Optimize-Image "$sourceDir\BLACK HEADPHONES.png" "$destDir\blog-3-headphones.jpg"
Optimize-Image "$sourceDir\ORANGE SMART WATCH.JPG.png" "$destDir\blog-4-anc.jpg"
