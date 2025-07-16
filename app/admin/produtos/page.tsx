"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import produtosData from "@/data/produtos.json";
import { supabase } from "@/lib/supabaseClient";

export default function ListaProdutosAdmin() {
  const router = useRouter();
  const [produtos, setProdutos] = useState<any[]>([]);
  const [busca, setBusca] = useState("");
  const [excluindo, setExcluindo] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProdutos() {
      const { data, error } = await supabase.from("produtos").select("*");
      if (!error) setProdutos(data || []);
    }
    fetchProdutos();
  }, []);

  async function handleExcluir(id: string) {
    if (!window.confirm("Tem certeza que deseja excluir este produto?")) return;
    setExcluindo(id);
    await supabase.from("produtos").delete().eq("id", id);
    setProdutos((prev) => prev.filter((p) => p.id !== id));
    setExcluindo(null);
  }

  const produtosFiltrados = produtos.filter((produto) =>
    produto.modelo?.toLowerCase().includes(busca.toLowerCase()) ||
    produto.codigo_interno?.toLowerCase().includes(busca.toLowerCase()) ||
    produto.categoria?.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="container py-12">
      <h1 className="text-2xl font-bold mb-6">Produtos Cadastrados</h1>
      <input
        type="text"
        placeholder="Buscar por modelo, código ou categoria..."
        className="mb-4 px-3 py-2 border rounded w-full max-w-md"
        value={busca}
        onChange={e => setBusca(e.target.value)}
      />
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded shadow">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Código</th>
              <th className="px-4 py-2 border">Modelo</th>
              <th className="px-4 py-2 border">Categoria</th>
              <th className="px-4 py-2 border">Descrição</th>
              <th className="px-4 py-2 border">Ações</th>
            </tr>
          </thead>
          <tbody>
            {produtosFiltrados.map((produto) => (
              <tr key={produto.id}>
                <td className="px-4 py-2 border">{produto.codigo_interno}</td>
                <td className="px-4 py-2 border">{produto.modelo}</td>
                <td className="px-4 py-2 border">{produto.categoria}</td>
                <td className="px-4 py-2 border max-w-xs truncate">{produto.descricao}</td>
                <td className="px-4 py-2 border flex gap-2">
                  <button
                    onClick={() => router.push(`/admin/produtos/${produto.id}`)}
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleExcluir(produto.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                    disabled={excluindo === produto.id}
                  >
                    {excluindo === produto.id ? "Excluindo..." : "Excluir"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 