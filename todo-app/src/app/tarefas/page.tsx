"use client";
import { useState } from "react";
import dados, { TarefaInterface } from "@/data";
import Cabecalho from "@/componentes/Cabecalho";
import { ModalTarefa } from "@/componentes/ModalTarefa";

interface NovaTarefa {
	titulo: string;
	concluido?: boolean;
}

export default function Home() {
	const [tarefas, setTarefas] = useState<NovaTarefa[]>([]);
	const [modalAberto, setModalAberto] = useState(false);

	const adicionarTarefa = (titulo: string) => {
		setTarefas([...tarefas, { titulo, concluido: false }]);
	};

	const todasTarefas = [
		...dados.map((t) => ({
			titulo: t.title,
			concluido: t.completed,
		})),
		...tarefas,
	];

	const alternarConclusao = (index: number) => {
		const novas = [...todasTarefas];
		novas[index].concluido = !novas[index].concluido;
		setTarefas(novas.slice(dados.length)); // Atualiza apenas as tarefas adicionadas pelo usuário
	};

	return (
		<main className="min-h-screen bg-black text-white p-6">
			<Cabecalho />

			<div className="flex justify-between items-center mb-6">
				<h1 className="text-3xl font-bold">Minhas Tarefas</h1>
				<button
					className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
					onClick={() => setModalAberto(true)}
				>
					Nova Tarefa
				</button>
			</div>

			{todasTarefas.length === 0 ? (
				<p className="text-gray-400">Nenhuma tarefa ainda.</p>
			) : (
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
					{todasTarefas.map((tarefa, index) => (
						<div
							key={index}
							onClick={() => alternarConclusao(index)}
							className={`p-4 rounded shadow cursor-pointer transition ${
								tarefa.concluido
									? "bg-gray-800 text-white"
									: "bg-gray-700 text-white"
							}`}
						>
							<h3 className="text-lg font-bold">{tarefa.titulo}</h3>
							<p className="text-sm">
								{tarefa.concluido ? "Concluída" : "Pendente"}
							</p>
						</div>
					))}
				</div>
			)}

			{modalAberto && (
				<ModalTarefa
					onAdd={adicionarTarefa}
					onClose={() => setModalAberto(false)}
				/>
			)}
		</main>
	);
}