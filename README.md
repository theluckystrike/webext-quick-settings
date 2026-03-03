# webext-quick-settings — Settings Panel for Extensions

[![npm version](https://img.shields.io/npm/v/webext-quick-settings)](https://npmjs.com/package/webext-quick-settings)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![Chrome Web Extension](https://img.shields.io/badge/Chrome-Web%20Extension-orange.svg)](https://developer.chrome.com/docs/extensions/)
[![CI Status](https://github.com/theluckystrike/webext-quick-settings/actions/workflows/ci.yml/badge.svg)](https://github.com/theluckystrike/webext-quick-settings/actions)
[![Discord](https://img.shields.io/badge/Discord-Zovo-blueviolet.svg?logo=discord)](https://discord.gg/zovo)
[![Website](https://img.shields.io/badge/Website-zovo.one-blue)](https://zovo.one)
[![GitHub Stars](https://img.shields.io/github/stars/theluckystrike/webext-quick-settings?style=social)](https://github.com/theluckystrike/webext-quick-settings)

> Toggle switches, sliders, dropdowns with auto-persistence and one-line rendering.

**webext-quick-settings** is a pre-built settings panel component for Chrome extensions. Build beautiful options pages with toggles, sliders, and dropdowns — all with automatic chrome.storage persistence.

Part of the [Zovo](https://zovo.one) developer tools family.

## Features

- ✅ **Toggle Switches** - Boolean settings with visual on/off
- ✅ **Sliders** - Numeric range inputs with min/max/step
- ✅ **Dropdowns** - Select from predefined options
- ✅ **Auto-Persistence** - Changes save automatically to chrome.storage
- ✅ **TypeScript Support** - Full type definitions included

## Installation

```bash
npm install webext-quick-settings
```

## Quick Start

```typescript
import { QuickSettings } from 'webext-quick-settings';

const settings = new QuickSettings();
settings.addToggle('darkMode', 'Dark Mode', true)
         .addSlider('fontSize', 'Font Size', 10, 24, 14)
         .addDropdown('theme', 'Theme', ['light', 'dark', 'auto']);

await settings.render('settings-container');
```

## Usage Examples

### Toggle Switch

```typescript
const toggle = settings.addToggle('notifications', 'Enable Notifications', true);
toggle.onChange((value) => {
  console.log('Notifications:', value);
});
```

### Slider

```typescript
const slider = settings.addSlider('opacity', 'Panel Opacity', 0, 100, 80);
slider.onChange((value) => {
  document.body.style.opacity = value / 100;
});
```

### Dropdown

```typescript
const dropdown = settings.addDropdown('language', 'Language', ['en', 'es', 'fr', 'de']);
dropdown.onChange((value) => {
  i18n.setLocale(value);
});
```

## API

### QuickSettings

| Method | Description |
|--------|-------------|
| `addToggle(key, label, defaultValue)` | Add a toggle switch |
| `addSlider(key, label, min, max, defaultValue)` | Add a slider |
| `addDropdown(key, label, options)` | Add a dropdown |
| `render(container)` | Render the settings panel |
| `getValue(key)` | Get a setting value |
| `setValue(key, value)` | Set a setting value |

## Contributing

Contributions are welcome! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/settings-feature`
3. **Make** your changes
4. **Test** your changes: `npm test`
5. **Commit** your changes: `git commit -m 'Add new feature'`
6. **Push** to the branch: `git push origin feature/settings-feature`
7. **Submit** a Pull Request

## Built by Zovo

Part of the [Zovo](https://zovo.one) developer tools family — privacy-first Chrome extensions built by developers, for developers.

## See Also

### Related Zovo Repositories

- [webext-options-page](https://github.com/theluckystrike/webext-options-page) - Full options page framework
- [chrome-storage-plus](https://github.com/theluckystrike/chrome-storage-plus) - Type-safe storage wrapper
- [webext-toast-notifications](https://github.com/theluckystrike/webext-toast-notifications) - Toast notifications
- [chrome-extension-starter-mv3](https://github.com/theluckystrike/chrome-extension-starter-mv3) - Extension template

### Zovo Chrome Extensions

- [Zovo Tab Manager](https://chrome.google.com/webstore/detail/zovo-tab-manager) - Manage tabs efficiently
- [Zovo Focus](https://chrome.google.com/webstore/detail/zovo-focus) - Block distractions
- [Zovo Permissions Scanner](https://chrome.google.com/webstore/detail/zovo-permissions-scanner) - Check extension privacy grades

Visit [zovo.one](https://zovo.one) for more information.

## License

MIT — [Zovo](https://zovo.one)

---

*Built by developers, for developers. No compromises on privacy.*
