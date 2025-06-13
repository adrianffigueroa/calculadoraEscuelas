import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { UsersRound } from 'lucide-react';
import { RotateCcw } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectLabel,
  SelectGroup,
} from '../ui/select';
import { Button } from '../ui/button';
import MultiSelect from '../MultiSelect';
import CustomSlider from '../ui/CustomSlider';
import useEscuelasFiltradas from '@/hooks/useEscuelasFiltradas';
import { useEffect, useState } from 'react';
import { getDepartamentosPorProvincia } from '@/utils/getDepartamentosPorProvincia';

const Bloque1 = ({ provincia, setProvincia, departamentos, setDepartamentos }) => {
  const { escuelasFiltradas, cantidadEscuelas, cantidadDocentes, loading } =
    useEscuelasFiltradas(departamentos);

  const [escuelasObjetivo, setEscuelasObjetivo] = useState(cantidadEscuelas);
  const [docentesObjetivo, setDocentesObjetivo] = useState(cantidadDocentes);

  useEffect(() => {
    setEscuelasObjetivo(cantidadEscuelas);
  }, [cantidadEscuelas]);

  useEffect(() => {
    setDocentesObjetivo(cantidadDocentes);
  }, [cantidadDocentes]);

  const handleReiniciar = () => {
    setDepartamentos([]);
    setEscuelasObjetivo(cantidadEscuelas);
    setDocentesObjetivo(cantidadDocentes);
  };
  const opcionesDepartamentos = getDepartamentosPorProvincia(provincia);

  return (
    <section className="flex justify-center">
      <Card className="w-7/8 text-center my-4">
        <CardHeader>
          <CardTitle>
            <div className="bg-gray-100 text-2xl flex justify-start items-center gap-1 p-2 rounded-md">
              <span>
                <UsersRound />
              </span>{' '}
              Bloque 1: Población Objetivo
            </div>
          </CardTitle>
          <CardDescription>
            <div className="flex gap-6 items-center flex-wrap justify-center">
              <div className="flex items-center gap-2">
                <label className="text-lg text-gray-600 whitespace-nowrap">Provincia:</label>
                <Select value={provincia} onValueChange={setProvincia}>
                  <SelectTrigger className="w-[220px]">
                    <SelectValue placeholder="Seleccione una provincia" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Provincia</SelectLabel>
                      <SelectItem value="Salta">Salta</SelectItem>
                      <SelectItem value="Misiones">Misiones</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-2">
                <label className="text-lg text-gray-600 whitespace-nowrap">Departamentos:</label>
                <MultiSelect
                  label="Seleccione uno o más Departamentos"
                  value={departamentos}
                  onChange={setDepartamentos}
                  options={opcionesDepartamentos}
                />
              </div>
              <div className="text-lg text-gray-600">Nivel: Primario</div>
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center p-4">
              <p className="text-gray-500 italic">Cargando datos de escuelas...</p>
            </div>
          ) : departamentos.length === 0 ? (
            <div className="flex justify-center p-4">
              <p className="text-gray-500 italic">
                Seleccione al menos un departamento para ver los resultados.
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center flex-wrap gap-4">
              <div className="flex flex-row gap-2">
                <Card className="w-3/5 p-4 text-center flex justify-between transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg">
                  <p>Total Departamentos</p>
                  <span className="font-semibold text-blue-700">{departamentos.length}</span>
                </Card>

                <Card className="w-3/5 p-4 text-center flex justify-between transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg">
                  <p>Total Escuelas</p>
                  <span className="font-semibold text-blue-700">{cantidadEscuelas}</span>
                </Card>

                <Card className="w-3/5 p-4 text-center flex justify-between transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg">
                  <p>Total Docentes</p>
                  <span className="font-semibold text-blue-700">{cantidadDocentes}</span>
                </Card>
              </div>
              <div className="space-y-6 px-6 pb-6 w-1/2">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    ¿Cuántas escuelas objetivo? ({escuelasObjetivo})
                  </label>
                  <CustomSlider
                    value={escuelasObjetivo}
                    max={cantidadEscuelas}
                    onChange={setEscuelasObjetivo}
                    color="violet"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    ¿Cuántos docentes objetivo? ({docentesObjetivo})
                  </label>
                  <CustomSlider
                    max={cantidadDocentes}
                    min={0}
                    step={1}
                    value={docentesObjetivo}
                    onChange={setDocentesObjetivo}
                  />
                </div>
              </div>
            </div>
          )}
        </CardContent>

        <CardFooter className={'flex justify-center'}>
          <Button
            onClick={handleReiniciar}
            className={'bg-blue-900 hover:bg-blue-800 cursor-pointer'}
          >
            Reiniciar <RotateCcw />
          </Button>
        </CardFooter>
      </Card>
    </section>
  );
};

export default Bloque1;
