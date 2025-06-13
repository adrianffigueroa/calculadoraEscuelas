import { Checkbox } from '@/components/ui/checkbox';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Input } from './ui/input';

export default function MultiSelect({ value = [], onChange = () => {}, options = [], label = '' }) {
  const [search, setSearch] = useState('');
  const [filtered, setFiltered] = useState(options);

  // Actualiza los elementos filtrados cuando el usuario escribe
  useEffect(() => {
    const lower = search.toLowerCase();
    setFiltered(options.filter((opt) => opt.label.toLowerCase().includes(lower)));
  }, [search, options]);
  // Agrega o elimina del array de seleccionados
  const toggleValue = (val) => {
    if (value.includes(val)) {
      onChange(value.filter((v) => v !== val));
    } else {
      onChange([...value, val]);
    }
  };

  // Elimina un valor desde el badge
  const removeValue = (val) => {
    onChange(value.filter((v) => v !== val));
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div
          role="button"
          className="min-h-[44px] w-3/4 flex flex-1 items-center flex-wrap gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm"
        >
          {value.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {value.map((val) => {
                const label = options.find((opt) => opt.value === val)?.label || val;
                return (
                  <span
                    key={val}
                    className="flex items-center gap-1 rounded-full bg-violet-100 px-2 py-1 text-sm text-violet-500"
                  >
                    {label}
                    <span
                      role="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeValue(val);
                      }}
                      className="ml-1 cursor-pointer text-violet-600 hover:text-violet-800"
                    >
                      <X className="h-4 w-4" />
                    </span>
                  </span>
                );
              })}
            </div>
          ) : (
            <span className="text-muted-foreground">{label}</span>
          )}
        </div>
      </PopoverTrigger>

      <PopoverContent className="w-[300px] max-h-[400px] space-y-2 overflow-y-auto">
        <Input placeholder="Buscar..." value={search} onChange={(e) => setSearch(e.target.value)} />
        {filtered.map((option) => (
          <div key={option.value} className="flex items-center space-x-2">
            <Checkbox
              id={option.value}
              checked={value.includes(option.value)}
              onCheckedChange={() => toggleValue(option.value)}
            />
            <label htmlFor={option.value} className="text-sm cursor-pointer">
              {option.label}
            </label>
          </div>
        ))}
      </PopoverContent>
    </Popover>
  );
}
