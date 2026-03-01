/**
 * Quick Settings — Toggle panel with persistent settings
 */
export interface SettingControl { id: string; label: string; type: 'toggle' | 'slider' | 'select'; default: unknown; options?: string[]; min?: number; max?: number; }

export class QuickSettings {
    private controls: SettingControl[] = [];
    private storageKey: string;

    constructor(storageKey: string = '__quick_settings__') { this.storageKey = storageKey; }

    /** Add toggle switch */
    addToggle(id: string, label: string, defaultValue: boolean = false): this {
        this.controls.push({ id, label, type: 'toggle', default: defaultValue }); return this;
    }

    /** Add slider */
    addSlider(id: string, label: string, min: number, max: number, defaultValue: number): this {
        this.controls.push({ id, label, type: 'slider', default: defaultValue, min, max }); return this;
    }

    /** Add select dropdown */
    addSelect(id: string, label: string, options: string[], defaultValue: string): this {
        this.controls.push({ id, label, type: 'select', default: defaultValue, options }); return this;
    }

    /** Get setting value */
    async get<T>(id: string): Promise<T> {
        const all = await this.getAll();
        const control = this.controls.find((c) => c.id === id);
        return (all[id] ?? control?.default) as T;
    }

    /** Set setting value */
    async set(id: string, value: unknown): Promise<void> {
        const all = await this.getAll();
        all[id] = value;
        await chrome.storage.local.set({ [this.storageKey]: all });
    }

    /** Get all settings */
    async getAll(): Promise<Record<string, unknown>> {
        const result = await chrome.storage.local.get(this.storageKey);
        const saved = (result[this.storageKey] as Record<string, unknown>) || {};
        const defaults: Record<string, unknown> = {};
        this.controls.forEach((c) => { defaults[c.id] = c.default; });
        return { ...defaults, ...saved };
    }

    /** Reset all to defaults */
    async reset(): Promise<void> {
        const defaults: Record<string, unknown> = {};
        this.controls.forEach((c) => { defaults[c.id] = c.default; });
        await chrome.storage.local.set({ [this.storageKey]: defaults });
    }

    /** Render settings panel to container */
    async render(containerId: string): Promise<void> {
        const container = document.getElementById(containerId);
        if (!container) return;
        const values = await this.getAll();
        container.innerHTML = '';
        Object.assign(container.style, { fontFamily: '-apple-system,sans-serif', fontSize: '14px' });

        for (const ctrl of this.controls) {
            const row = document.createElement('div');
            Object.assign(row.style, { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #e5e7eb' });

            const label = document.createElement('span');
            label.textContent = ctrl.label;

            if (ctrl.type === 'toggle') {
                const input = document.createElement('input'); input.type = 'checkbox';
                input.checked = values[ctrl.id] as boolean;
                input.addEventListener('change', () => this.set(ctrl.id, input.checked));
                row.appendChild(label); row.appendChild(input);
            } else if (ctrl.type === 'slider') {
                const input = document.createElement('input'); input.type = 'range';
                input.min = String(ctrl.min || 0); input.max = String(ctrl.max || 100);
                input.value = String(values[ctrl.id]);
                input.addEventListener('input', () => this.set(ctrl.id, Number(input.value)));
                row.appendChild(label); row.appendChild(input);
            } else if (ctrl.type === 'select') {
                const select = document.createElement('select');
                ctrl.options?.forEach((opt) => { const o = document.createElement('option'); o.value = opt; o.textContent = opt; select.appendChild(o); });
                select.value = String(values[ctrl.id]);
                select.addEventListener('change', () => this.set(ctrl.id, select.value));
                row.appendChild(label); row.appendChild(select);
            }
            container.appendChild(row);
        }
    }
}
