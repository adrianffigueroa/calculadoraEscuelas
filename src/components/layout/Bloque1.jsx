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
import { GradientButton } from '../ui/GradientButton';
import MultiSelect from '../MultiSelect';
import CustomSlider from '../ui/CustomSlider';
import useEscuelasFiltradas from '@/hooks/useEscuelasFiltradas';
import { useEffect } from 'react';
import { getDepartamentosPorProvincia } from '@/utils/getDepartamentosPorProvincia';

const Bloque1 = ({
  provincia,
  setProvincia,
  departamentos,
  setDepartamentos,
  escuelasObjetivo,
  setEscuelasObjetivo,
  docentesObjetivo,
  setDocentesObjetivo,
  diasObjetivo,
  setDiasObjetivo,
  docentesRurales,
  setDocentesRurales,
}) => {
  const { cantidadEscuelas, cantidadDocentes, loading } = useEscuelasFiltradas(departamentos);

  useEffect(() => {
    setEscuelasObjetivo(cantidadEscuelas);
  }, [cantidadEscuelas, setEscuelasObjetivo]);

  useEffect(() => {
    setDocentesObjetivo(cantidadDocentes);
  }, [cantidadDocentes, setDocentesObjetivo]);

  const handleReiniciar = () => {
    setDepartamentos([]);
    setEscuelasObjetivo(cantidadEscuelas);
    setDocentesObjetivo(cantidadDocentes);
  };
  const opcionesDepartamentos = getDepartamentosPorProvincia(provincia);
  useEffect(() => {
    console.log(docentesRurales);
  }, [docentesRurales]);
  return (
    <section className="flex justify-center mb-10">
      <Card className="w-13/14 text-center my-4">
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
                  <SelectTrigger className="w-[220px] text-white font-bold py-1 bg-[linear-gradient(to_right,_rgb(44,61,87),_rgb(104,121,136))] hover:bg-[linear-gradient(to_right,_#2e8b84,_#75c3b9)] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl/30 hover:cursor-pointer  [&_[data-placeholder]]:!text-white [&_[data-slot]]:!text-white">
                    <SelectValue
                      placeholder="Seleccione una provincia"
                      className="text-white [&_[data-placeholder]]:text-white"
                    />
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
                  <p>Total Unidades Educativas</p>
                  <span className="font-semibold text-blue-700">{escuelasObjetivo}</span>
                </Card>

                <Card className="w-3/5 p-4 text-center flex justify-between transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg">
                  <p>Total Docentes</p>
                  <span className="font-semibold text-blue-700">{docentesObjetivo}</span>
                </Card>

                <Card className="w-3/5 p-4 text-center flex justify-between transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg">
                  <p>Total Docentes Rurales</p>
                  <span className="font-semibold text-blue-700">
                    {docentesRurales} <br />{' '}
                    {((docentesRurales / docentesObjetivo) * 100).toFixed(1)} %
                  </span>
                </Card>

                <Card className="w-3/5 p-4 text-center flex justify-between transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg">
                  <p>Total Encuentros (días)</p>
                  <span className="font-semibold text-blue-700">{diasObjetivo}</span>
                </Card>
              </div>
              <div className="space-y-6 px-6 pb-6 w-1/2">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    ¿Cuántas unidades educativas objetivo? ({escuelasObjetivo})
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

                <div>
                  <label className="block text-sm font-medium mb-1">
                    ¿Cuántos docentes se encuentran en el ámbito rural? ({docentesRurales})
                  </label>
                  <CustomSlider
                    max={docentesObjetivo}
                    min={0}
                    step={1}
                    value={docentesRurales}
                    onChange={setDocentesRurales}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    ¿Cuántos encuentros objetivo? ({diasObjetivo})
                  </label>
                  <CustomSlider
                    max={20}
                    min={0}
                    step={1}
                    value={diasObjetivo}
                    onChange={setDiasObjetivo}
                  />
                </div>
              </div>
            </div>
          )}
        </CardContent>

        <CardFooter className={'flex justify-center'}>
          <GradientButton icon={<RotateCcw />} onClick={handleReiniciar}>
            REINICIAR
          </GradientButton>
        </CardFooter>
      </Card>
    </section>
  );
};

export default Bloque1;
