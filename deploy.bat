@echo off
echo Деплой QUSTOMIQ на Vercel...
git add .
git commit -m "update: %date% %time%"
vercel --prod
echo Готово! Сайт обновлён.
pause
