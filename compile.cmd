@echo off
echo.
date /t
time /t
ver
echo.
echo TypeScript compiler
call tsc --version
echo.
echo tsc defiant.ts --strict --declaration --declarationMap --allowJs --checkJs --pretty --diagnostics --removeComments --target ESNEXT --lib ESNEXT,DOM,DOM.iterable,DOM.asynciterable,ESNext.Iterator,webworker.importscripts
echo.
call tsc defiant.ts --strict --declaration --declarationMap --allowJs --checkJs --pretty --diagnostics --removeComments --target ESNEXT --lib ESNEXT,DOM,DOM.iterable,DOM.asynciterable,ESNext.Iterator,webworker.importscripts
echo.
pause