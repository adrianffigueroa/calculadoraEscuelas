import { GraduationCap } from 'lucide-react';

const NavBar = () => {
  return (
    <nav className="bg-blue-900 h-18 sticky flex justify-between items-center p-8 w-full">
      <div className="flex flex-row gap-2 items-center">
        <GraduationCap className="text-white" />
        <h2 className="text-2xl text-white flex">
          Calculadora de costos de programas de formación
        </h2>
      </div>
      <span className="text-white">Inicio</span>
    </nav>
  );
};

export default NavBar;
