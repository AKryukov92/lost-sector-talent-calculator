echo Off
::  ��������� ����� ������� �� �����
title Conversion Script
::  ������ ������� ���������
if not exist readdxt.exe goto END
::  ���� ��� readdxt.exe ��������� � ����� ���������
if not exist *.dds goto END2
::  ��������� �� ������� �������� ������
for %%f in (*.dds) do (
	echo "%%~nf.dds"
	readdxt "%%~nf.dds"
)
for %%f in (*.tga) do (
	echo %%~nf
	mogrify -format png %%~nf.tga
)
if exist "../itemspng/" goto SKIP
mkdir "../itemspng"
:SKIP
copy *.png "../itemspng/"
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