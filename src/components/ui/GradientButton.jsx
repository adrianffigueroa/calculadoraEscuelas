// components/gradient-button.jsx
import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils'; // Asegurate de tener esta función para combinar clases

export function GradientButton({ children, icon, className, onClick, type = 'button' }) {
  return (
    <Button
      type={type}
      onClick={onClick}
      className={cn(
        'bg-[linear-gradient(to_right,_rgb(44,61,87),_rgb(104,121,136))] text-white font-bold tracking-wide px-6 py-2 rounded-xl shadow-md transition-all duration-300 hover:bg-[linear-gradient(to_right,_#2e8b84,_#75c3b9)]  hover:-translate-y-1 hover:shadow-xl/30 hover:cursor-pointer flex items-center justify-center',
        className
      )}
    >
      {children}
      {icon && <span className="ml-2">{icon}</span>}
    </Button>
  );
}
