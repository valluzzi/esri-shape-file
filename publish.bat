@echo off
set packagename="@valluzzi/esri-shape-file"

:: find the version number in package.json and increment it
for /F "tokens=2 delims=:, " %%t in ('findstr "\"version\":" package.json') do (
    set version=%%~t
    for /F "tokens=3 delims=." %%t in ('echo %%~t') do (
        set version=%%~t
        set /A version+=1
    )
)

:: replace the version number in package.json
echo {>package.bkp
echo     "name": %packagename%,>>package.bkp
echo     "version": "1.1.%version%",>>package.bkp
findstr /v "^{" package.json | findstr /v "\"name\":" | findstr /v "\"version\":" >> package.bkp
copy /Y package.bkp package.json
del package.bkp



::commit and push the changes
set comment="version 1.1.%version%"
cmd /c git add .
cmd /c git commit -m %comment%
cmd /c git push
::finally publish the package on npm
cmd /c npm run build 
cmd /c npm publish 

