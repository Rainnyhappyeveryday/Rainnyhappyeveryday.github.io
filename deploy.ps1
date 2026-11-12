$ErrorActionPreference = "Stop"

git add -A
git commit -m "Update weekly notes"
git push origin main

Write-Output "Online: https://rainnyhappyeveryday.github.io/"
