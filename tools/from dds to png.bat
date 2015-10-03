echo Off
::  Отключаем вывод комманд на экран
title Conversion Script
::  Задаем надпись заголовка
if not exist readdxt.exe goto END
::  Если нет readdxt.exe переходим в конец программы
if not exist dds/*.dds goto END2
::  Проверяем на наличие исходных файлов
for %%f in (dds/*.dds) do (
	echo "%%~nf.dds"
	readdxt dds/"%%~nf.dds"
)
for %%f in (dds/*.tga) do (
	echo %%~nf
	mogrify -format png dds/%%~nf.tga
)
if exist "png/" goto SKIP
mkdir "png"
:SKIP
cd dds/
copy *.png "../png/"
del *.png
del *.tga
::  Преобразуем все .dds файлы в формат .tga
goto END3
:END
echo Copy utility to current folder!
::  Выводим сообщение об ошибке
pause
::  Ждем события с клавиатуры
:END2
echo Nothing to convert [Image files does not found]
::  Выводим сообщение об ошибке
:END3
pause
::  Ждем события с клавиатуры 