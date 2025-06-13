import * as Slider from '@radix-ui/react-slider';
import clsx from 'clsx';

export default function CustomSlider({ value, max, onChange, color = 'violet' }) {
  const percent = (value / max) * 100;

  // Escala de colores entre 200, 400, 600 según el % (tramo de 33%)
  const getRangeColor = () => {
    if (percent < 33) return `bg-blue-200`;
    if (percent < 66) return `bg-blue-400`;
    return `bg-blue-600`;
  };

  return (
    <div className="w-full py-2">
      <Slider.Root
        className="relative flex items-center select-none touch-none w-full h-5"
        max={max}
        min={0}
        step={1}
        value={[value]}
        onValueChange={(val) => onChange(val[0])}
      >
        <Slider.Track className="bg-gray-200 relative grow rounded-full h-2">
          <Slider.Range
            className={clsx('absolute h-full rounded-full transition-colors', getRangeColor())}
          />
        </Slider.Track>
        <Slider.Thumb
          className={clsx('block w-4 h-4 bg-white border-2 rounded-full shadow transition-colors', {
            [`border-blue-200`]: percent < 33,
            [`border-blue-400`]: percent >= 33 && percent < 66,
            [`border-blue-600`]: percent >= 66,
          })}
        />
      </Slider.Root>
    </div>
  );
}
