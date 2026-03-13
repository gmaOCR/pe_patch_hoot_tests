# Patch: HOOT Test Normalization

## Purpose

This module patches specific JavaScript tests in Odoo 19 that fail due to environment-dependent browser rendering differences, specifically related to CSS `padding-inline-start` calculations in the `html_editor` module.

## Problem

The test `@html_editor/list/indent/with selection collapsed/should adjust list padding on tab` fails with:

```
Failed to set a named property 'paddingInlineStart' on 'CSSStyleDeclaration': 
These styles are computed, and therefore the 'padding-inline-start' property is read-only.
```

This occurs when the test attempts to modify a computed CSS property, which is read-only in certain browser contexts.

## Solution

The module wraps:
1. `CSSStyleDeclaration.prototype.paddingInlineStart` setter to silently catch and ignore `TypeError` exceptions on read-only computed styles
2. `CSSStyleDeclaration.prototype.setProperty` to handle the `padding-inline-start` string property name

## Installation

This module is marked as `auto_install: True` and will be automatically loaded when `html_editor` and `web` are present.

## Testing

After installation, verify the fix by running the desktop and mobile HOOT test suites:

```bash
# In Odoo shell
odoo --test-enable -i web -d test_db --stop-after-init
```

Or via web interface:
```
http://localhost:8069/web/tests?preset=desktop
http://localhost:8069/web/tests?preset=mobile
```

## Compatibility

- Odoo version: 19.0
- Auto-installs with: `html_editor`, `web`

## License

LGPL-3
