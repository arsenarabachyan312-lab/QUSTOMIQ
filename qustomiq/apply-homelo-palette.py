#!/usr/bin/env python3
"""
apply-homelo-palette.py
Запусти из корня проекта: python apply-homelo-palette.py

Меняет цветовую гамму qustomiq.ru на палитру Homelo:
  - тёплый кремово-бежевый фон
  - жёлто-лимонный акцент
  - тёмный ink вместо чистого чёрного
"""

import re
import os
import sys
from pathlib import Path

# ─── Новая палитра (Homelo) ──────────────────────────────────────────────────
PALETTE = {
    # CSS-переменные → новые значения
    "css_vars": {
        "--background":        "#F5EFE0",
        "--foreground":        "#1A1A18",
        "--card":              "#EDE6D3",
        "--card-foreground":   "#1A1A18",
        "--popover":           "#F5EFE0",
        "--popover-foreground":"#1A1A18",
        "--primary":           "#1A1A18",
        "--primary-foreground":"#F5EFE0",
        "--secondary":         "#EDE6D3",
        "--secondary-foreground":"#1A1A18",
        "--muted":             "#E8E0CB",
        "--muted-foreground":  "#6B6456",
        "--accent":            "#E5D44A",
        "--accent-foreground": "#1A1A18",
        "--destructive":       "#C0392B",
        "--border":            "#D8D0BC",
        "--input":             "#D8D0BC",
        "--ring":              "#E5D44A",
    },
    # Tailwind extend.colors → новые hex
    "tailwind_colors": {
        "background":  "#F5EFE0",
        "foreground":  "#1A1A18",
        "primary":     "#1A1A18",
        "secondary":   "#EDE6D3",
        "accent":      "#E5D44A",
        "muted":       "#E8E0CB",
        "border":      "#D8D0BC",
        "card":        "#EDE6D3",
        "ring":        "#E5D44A",
    },
}

# Старые тёмные hex, которые нужно заменить на ink (встречаются инлайн)
DARK_SWAP = {
    "#0a0a0a": "#1A1A18",
    "#09090b": "#1A1A18",
    "#000000": "#1A1A18",
    "#ffffff": "#F5EFE0",
    "#fafafa": "#F5EFE0",
    "#f4f4f5": "#EDE6D3",
    "#e4e4e7": "#D8D0BC",
    "#18181b": "#1A1A18",
    "#27272a": "#2E2E2A",
    "#3f3f46": "#4A4A42",
    "#71717a": "#6B6456",
    "#a1a1aa": "#9A9285",
}


def patch_globals_css(path: Path):
    text = path.read_text(encoding="utf-8")
    original = text

    # Заменяем значения CSS-переменных внутри :root и .dark
    for var, val in PALETTE["css_vars"].items():
        # Ищем: --variable-name: <anything>;
        text = re.sub(
            rf"({re.escape(var)}\s*:\s*)[^;]+;",
            rf"\g<1>{val};",
            text,
        )

    # Грубая замена инлайн hex-цветов (с учётом регистра)
    for old, new in DARK_SWAP.items():
        text = text.replace(old, new)
        text = text.replace(old.upper(), new)

    if text != original:
        path.write_text(text, encoding="utf-8")
        print(f"  ✅ Обновлён: {path}")
    else:
        print(f"  ℹ️  Без изменений: {path}")


def patch_tailwind_config(path: Path):
    text = path.read_text(encoding="utf-8")
    original = text

    for key, val in PALETTE["tailwind_colors"].items():
        # Ищем 'key': '...' или "key": "..."  (одинарные и двойные кавычки)
        text = re.sub(
            rf"""(['"]){re.escape(key)}\1\s*:\s*(['"])[^'"]+\2""",
            rf'"{key}": "{val}"',
            text,
        )

    # Также заменяем инлайн hex
    for old, new in DARK_SWAP.items():
        text = text.replace(f'"{old}"', f'"{new}"')
        text = text.replace(f"'{old}'", f"'{new}'")

    if text != original:
        path.write_text(text, encoding="utf-8")
        print(f"  ✅ Обновлён: {path}")
    else:
        print(f"  ℹ️  Без изменений: {path}")


def patch_file_inline(path: Path):
    """Для .tsx/.jsx/.css файлов — заменяем инлайн hex-цвета."""
    try:
        text = path.read_text(encoding="utf-8")
    except Exception:
        return
    original = text

    for old, new in DARK_SWAP.items():
        text = text.replace(old, new)
        text = text.replace(old.upper(), new)

    if text != original:
        path.write_text(text, encoding="utf-8")
        print(f"  ✅ Инлайн-цвета обновлены: {path}")


def main():
    root = Path(".")

    print("\n🎨 Применяю палитру Homelo к qustomiq.ru...\n")

    # 1. globals.css
    candidates_css = list(root.rglob("globals.css"))
    if not candidates_css:
        print("⚠️  globals.css не найден — убедись, что запускаешь из корня проекта")
    for p in candidates_css:
        patch_globals_css(p)

    # 2. tailwind.config (js / ts / mjs)
    for name in ("tailwind.config.js", "tailwind.config.ts", "tailwind.config.mjs"):
        p = root / name
        if p.exists():
            patch_tailwind_config(p)

    # 3. Инлайн-цвета в компонентах (src/ или app/)
    for pattern in ("src/**/*.tsx", "src/**/*.jsx", "src/**/*.css",
                    "app/**/*.tsx",  "app/**/*.jsx",  "app/**/*.css",
                    "components/**/*.tsx", "components/**/*.jsx"):
        for p in root.glob(pattern):
            if "node_modules" in str(p):
                continue
            patch_file_inline(p)

    print("\n✅ Готово! Перезапусти dev-сервер: npm run dev\n")
    print("Палитра:")
    print("  Фон:      #F5EFE0  (тёплый кремовый)")
    print("  Карточки: #EDE6D3")
    print("  Акцент:   #E5D44A  (жёлто-лимонный)")
    print("  Текст:    #1A1A18  (ink)")
    print("  Бордер:   #D8D0BC")


if __name__ == "__main__":
    main()
