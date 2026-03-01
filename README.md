# webext-quick-settings — Settings Panel for Extensions
> **Built by [Zovo](https://zovo.one)** | `npm i webext-quick-settings`

Toggle switches, sliders, dropdowns with auto-persistence and one-line rendering.

```typescript
import { QuickSettings } from 'webext-quick-settings';
const settings = new QuickSettings();
settings.addToggle('darkMode', 'Dark Mode', true).addSlider('fontSize', 'Font Size', 10, 24, 14);
await settings.render('settings-container');
```
MIT License
