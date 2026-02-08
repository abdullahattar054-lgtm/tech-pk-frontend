
Add-Type -AssemblyName System.Drawing

$sourceDir = "C:\CHMN"
$destDir = "c:\ANTIGRAVITY\tech-pk-frontend\src\assets\blog"

function Optimize-Image {
    param (
        [string]$SourcePath,
        [string]$DestPath
    )

    Write-Host "Processing: $SourcePath -> $DestPath"

    try {
        $img = [System.Drawing.Image]::FromFile($SourcePath)
        
        $newWidth = 1200
        if ($img.Width -lt 1200) { $newWidth = $img.Width }
        
        $ratio = $img.Height / $img.Width
        $newHeight = [int]($newWidth * $ratio)

        $resized = New-Object System.Drawing.Bitmap $newWidth, $newHeight
        $graph = [System.Drawing.Graphics]::FromImage($resized)
        
        $graph.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
        $graph.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
        $graph.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
        
        $graph.Clear([System.Drawing.Color]::White)
        $graph.DrawImage($img, 0, 0, $newWidth, $newHeight)

        $codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq "image/jpeg" }
        $encParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
        $encParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]80)

        $resized.Save($DestPath, $codec, $encParams)
        
        $img.Dispose()
        $resized.Dispose()
        $graph.Dispose()
        
        Write-Host "Success!"
    }
    catch {
        Write-Error "Failed to process $SourcePath : $_"
    }
}

$file = Get-ChildItem "$sourceDir" -Filter "*black*ear*" | Select-Object -First 1
if ($file) {
    Optimize-Image $file.FullName "$destDir\blog-1-earbuds.jpg"
} else {
    Write-Error "Still could not find file"
    Get-ChildItem "$sourceDir" # List dir to debug
}
