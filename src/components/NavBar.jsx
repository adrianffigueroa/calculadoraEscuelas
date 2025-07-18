import { GraduationCap } from 'lucide-react';

const NavBar = () => {
  return (
    <nav className="bg-[rgb(44,61,87)] h-18 sticky flex justify-between items-center p-8 w-full">
      <div className="flex flex-row gap-2 items-center">
        <GraduationCap className="text-white" />
        <h2 className="text-2xl text-white flex font-semibold">
          Calculadora de Costos de Programas de Formación Docente Continua
        </h2>
      </div>

      <div className="flex space-x-8">
        <img src="../src/assets/Imagen1.png" alt="logo1" className="w-30" />
        <img src="../src/assets/Imagen2.png" alt="logo2" className="w-30" />
      </div>
    </nav>
  );
};

export default NavBar;
