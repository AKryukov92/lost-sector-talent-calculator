echo Off
::  ��������� ����� ������� �� �����
title Conversion Script
::  ������ ������� ���������
if not exist readdxt.exe goto END
::  ���� ��� readdxt.exe ��������� � ����� ���������
if not exist dds/*.dds goto END2
::  ��������� �� ������� �������� ������
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
::  ����������� ��� .dds ����� � ������ .tga
goto END3
:END
echo Copy utility to current folder!
::  ������� ��������� �� ������
pause
::  ���� ������� � ����������
:END2
echo Nothing to convert [Image files does not found]
::  ������� ��������� �� ������
:END3
pause
::  ���� ������� � ���������� 