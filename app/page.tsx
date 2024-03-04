"use client";
import { useStore } from "../store/bear.store";

export default function Home() {
  return (
    <main>
      <h1>HOLA MUNDO</h1>
      <div className="flex items-center space-x-3 justify-center mt-12">
        <BearCounter />
        <Controls />
      </div>
    </main>
  );
}

function BearCounter() {
  const bears = useStore((state) => state.bears);
  return <h1>{bears} por aquí...</h1>;
}

function Controls() {
  const increasePopulation = useStore((state) => state.increasePopulation);
  const removeAllBears = useStore((state) => state.removeAllBears);
  const updateBears = useStore((state) => state.updateBears);
  return (
    <>
      <button className="border p-2 rounded-2xl" onClick={increasePopulation}>
        uno arriba
      </button>
      <button className="border p-2 rounded-2xl" onClick={removeAllBears}>
        bajar uno
      </button>
      <button
        className="border p-2 rounded-2xl"
        onClick={() => updateBears(4555555)}
      >
        bajar update
      </button>
    </>
  );
}
