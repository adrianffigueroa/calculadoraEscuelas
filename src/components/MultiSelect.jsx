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
          className="min-h-[44px] w-3/4 flex flex-1 items-center justify-between flex-wrap gap-2 rounded-lg text-white bg-[linear-gradient(to_right,_rgb(44,61,87),_rgb(104,121,136))] hover:bg-[linear-gradient(to_right,_#2e8b84,_#75c3b9)] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl/30 hover:cursor-pointer  text-sm font-bold tracking-wide shadow-md cursor-pointer "
        >
          {value.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {value.map((val) => {
                const label = options.find((opt) => opt.value === val)?.label || val;
                return (
                  <span
                    key={val}
                    className="flex items-center gap-1 rounded-full bg-transparent px-2 py-1 text-sm text-white"
                  >
                    {label}
                    <span
                      role="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeValue(val);
                      }}
                      className="ml-1 cursor-pointer text-white "
                    >
                      <X className="h-4 w-4" />
                    </span>
                  </span>
                );
              })}
            </div>
          ) : (
            <span className="text-white px-1">{label}</span>
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
