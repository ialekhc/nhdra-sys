import { useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';
import { parseApiError } from '../../../api/apiErrorHandler';
import { settingApi } from '../api/settingApi';
import { Input } from '../../../shared/components/ui/Input';
import { Textarea } from '../../../shared/components/ui/Textarea';
import { Button } from '../../../shared/components/ui/Button';
import { Loader } from '../../../shared/components/ui/Loader';

const getValueType = (value) => {
  if (Array.isArray(value)) return 'array';
  if (value && typeof value === 'object') return 'object';
  if (typeof value === 'boolean') return 'boolean';
  if (typeof value === 'number') return 'number';
  return 'string';
};

const serializeValue = (value, type) => {
  if (type === 'array') return value.join('\n');
  if (type === 'object') return JSON.stringify(value, null, 2);
  if (type === 'boolean') return value ? 'true' : 'false';
  if (type === 'number') return String(value);
  return value ?? '';
};

const parseValue = (raw, type) => {
  if (type === 'array') {
    return raw
      .split('\n')
      .map((item) => item.trim())
      .filter(Boolean);
  }

  if (type === 'object') {
    return JSON.parse(raw || '{}');
  }

  if (type === 'boolean') {
    return raw === 'true';
  }

  if (type === 'number') {
    const value = Number(raw);
    if (Number.isNaN(value)) throw new Error('Invalid number value');
    return value;
  }

  return raw;
};

export const SettingsPage = () => {
  const [settings, setSettings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const loadSettings = async () => {
    try {
      setLoading(true);
      const response = await settingApi.list();
      setSettings(response.data.data || []);
    } catch (error) {
      toast.error(parseApiError(error));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSettings();
  }, []);

  const visibleSettings = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return settings;

    return settings.filter((setting) => {
      const source = `${setting.key} ${setting.description || ''}`.toLowerCase();
      return source.includes(query);
    });
  }, [settings, search]);

  if (loading) return <Loader text="Loading settings..." />;

  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-card">
        <h1 className="text-xl font-bold text-slate-900">Settings</h1>
        <p className="mt-1 text-sm text-slate-600">Update hospital options used across the system.</p>

        <div className="mt-3">
          <Input
            placeholder="Search settings..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>
      </div>

      <div className="space-y-3">
        {visibleSettings.length ? (
          visibleSettings.map((setting) => <SettingCard key={setting._id || setting.key} setting={setting} onRefresh={loadSettings} />)
        ) : (
          <div className="rounded-lg border border-slate-200 bg-white p-4 text-sm text-slate-500">No settings found.</div>
        )}
      </div>
    </div>
  );
};

const SettingCard = ({ setting, onRefresh }) => {
  const type = getValueType(setting.value);
  const initialValue = serializeValue(setting.value, type);

  const [editorValue, setEditorValue] = useState(initialValue);
  const [saving, setSaving] = useState(false);

  const isDirty = editorValue !== initialValue;

  useEffect(() => {
    setEditorValue(initialValue);
  }, [initialValue]);

  const save = async () => {
    try {
      setSaving(true);
      const parsed = parseValue(editorValue, type);
      await settingApi.update(setting.key, { value: parsed });
      toast.success('Setting updated');
      await onRefresh();
    } catch (error) {
      toast.error(parseApiError(error));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-card">
      <div className="mb-2">
        <h2 className="text-sm font-semibold text-slate-900">{setting.key}</h2>
        <p className="text-xs text-slate-500">{setting.description || 'No description'}</p>
      </div>

      <SettingEditor type={type} value={editorValue} onChange={setEditorValue} />

      <div className="mt-3 flex gap-2">
        <Button onClick={save} disabled={saving || !isDirty}>
          {saving ? 'Saving...' : 'Save'}
        </Button>
        <Button variant="secondary" onClick={() => setEditorValue(initialValue)} disabled={saving || !isDirty}>
          Reset
        </Button>
      </div>
    </div>
  );
};

const SettingEditor = ({ type, value, onChange }) => {
  if (type === 'array') {
    return <Textarea rows={5} value={value} onChange={(event) => onChange(event.target.value)} placeholder="One option per line" />;
  }

  if (type === 'object') {
    return (
      <Textarea
        rows={7}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder='{"key":"value"}'
        className="font-mono text-xs"
      />
    );
  }

  if (type === 'boolean') {
    return (
      <select
        className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        <option value="true">True</option>
        <option value="false">False</option>
      </select>
    );
  }

  if (type === 'number') {
    return <Input type="number" value={value} onChange={(event) => onChange(event.target.value)} />;
  }

  return <Input value={value} onChange={(event) => onChange(event.target.value)} />;
};
