import { useState } from "react";

interface ModalTarefaProps {
  onClose: () => void;
  onAdd: (titulo: string) => void;
}

export function ModalTarefa({ onClose, onAdd }: ModalTarefaProps) {
  const [titulo, setTitulo] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (titulo.trim()) {
      onAdd(titulo.trim());
      setTitulo(""); // limpa o campo
      onClose();     // fecha o modal
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md">
        <h2 className="text-2xl text-black font-bold mb-4">Adicionar nova tarefa</h2>
        
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            placeholder="Digite o título da tarefa"
            className="w-full text-black border border-gray-300 p-2 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Adicionar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}