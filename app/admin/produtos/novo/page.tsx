"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

const camposIniciais = {
  codigo_interno: "",
  modelo: "",
  categoria: "",
  descricao: "",
  ncm: "",
  codigo_ean: "",
  unidade: "",
  peso_bruto: "",
  largura: "",
  comprimento: "",
  altura: "",
  cor: "",
  garantia: "",
  voltagem: "",
  ciclo: "",
  corrente_maxima: "",
  rede_eletrica: "",
  imagem_url: "",
  imagem_url_2: "",
  imagem_url_3: "",
  imagem_url_4: "",
  imagem_url_5: "",
  imagem_url_6: "",
  imagem_url_7: ""
};

export default function CadastroProduto() {
  const [form, setForm] = useState(camposIniciais);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    // Integração com Supabase
    const { error } = await supabase.from("produtos").insert([{ ...form }]);
    setLoading(false);
    if (error) {
      setError("Erro ao cadastrar produto: " + error.message);
    } else {
      router.push("/admin/produtos");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-lg border">
        <h1 className="text-2xl font-bold mb-6 text-center">Cadastrar Produto</h1>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">Código Interno</label>
            <input name="codigo_interno" value={form.codigo_interno} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
          </div>
          <div>
            <label className="block mb-1 font-medium">Modelo</label>
            <input name="modelo" value={form.modelo} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
          </div>
          <div>
            <label className="block mb-1 font-medium">Categoria</label>
            <input name="categoria" value={form.categoria} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
          </div>
          <div className="col-span-2">
            <label className="block mb-1 font-medium">Descrição</label>
            <textarea name="descricao" value={form.descricao} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
          </div>
          <div>
            <label className="block mb-1 font-medium">NCM</label>
            <input name="ncm" value={form.ncm} onChange={handleChange} className="w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label className="block mb-1 font-medium">Código EAN</label>
            <input name="codigo_ean" value={form.codigo_ean} onChange={handleChange} className="w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label className="block mb-1 font-medium">Unidade</label>
            <input name="unidade" value={form.unidade} onChange={handleChange} className="w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label className="block mb-1 font-medium">Peso Bruto</label>
            <input name="peso_bruto" value={form.peso_bruto} onChange={handleChange} className="w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label className="block mb-1 font-medium">Largura</label>
            <input name="largura" value={form.largura} onChange={handleChange} className="w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label className="block mb-1 font-medium">Comprimento</label>
            <input name="comprimento" value={form.comprimento} onChange={handleChange} className="w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label className="block mb-1 font-medium">Altura</label>
            <input name="altura" value={form.altura} onChange={handleChange} className="w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label className="block mb-1 font-medium">Cor</label>
            <input name="cor" value={form.cor} onChange={handleChange} className="w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label className="block mb-1 font-medium">Garantia</label>
            <input name="garantia" value={form.garantia} onChange={handleChange} className="w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label className="block mb-1 font-medium">Voltagem</label>
            <input name="voltagem" value={form.voltagem} onChange={handleChange} className="w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label className="block mb-1 font-medium">Ciclo</label>
            <input name="ciclo" value={form.ciclo} onChange={handleChange} className="w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label className="block mb-1 font-medium">Corrente Máxima</label>
            <input name="corrente_maxima" value={form.corrente_maxima} onChange={handleChange} className="w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label className="block mb-1 font-medium">Rede Elétrica</label>
            <input name="rede_eletrica" value={form.rede_eletrica} onChange={handleChange} className="w-full border rounded px-3 py-2" />
          </div>
          <div className="col-span-2">
            <label className="block mb-1 font-medium">URL da Imagem 1</label>
            <input name="imagem_url" value={form.imagem_url} onChange={handleChange} className="w-full border rounded px-3 py-2" />
          </div>
          <div className="col-span-2">
            <label className="block mb-1 font-medium">URL da Imagem 2</label>
            <input name="imagem_url_2" value={form.imagem_url_2} onChange={handleChange} className="w-full border rounded px-3 py-2" />
          </div>
          <div className="col-span-2">
            <label className="block mb-1 font-medium">URL da Imagem 3</label>
            <input name="imagem_url_3" value={form.imagem_url_3} onChange={handleChange} className="w-full border rounded px-3 py-2" />
          </div>
          <div className="col-span-2">
            <label className="block mb-1 font-medium">URL da Imagem 4</label>
            <input name="imagem_url_4" value={form.imagem_url_4} onChange={handleChange} className="w-full border rounded px-3 py-2" />
          </div>
          <div className="col-span-2">
            <label className="block mb-1 font-medium">URL da Imagem 5</label>
            <input name="imagem_url_5" value={form.imagem_url_5} onChange={handleChange} className="w-full border rounded px-3 py-2" />
          </div>
          <div className="col-span-2">
            <label className="block mb-1 font-medium">URL da Imagem 6</label>
            <input name="imagem_url_6" value={form.imagem_url_6} onChange={handleChange} className="w-full border rounded px-3 py-2" />
          </div>
          <div className="col-span-2">
            <label className="block mb-1 font-medium">URL da Imagem 7</label>
            <input name="imagem_url_7" value={form.imagem_url_7} onChange={handleChange} className="w-full border rounded px-3 py-2" />
          </div>
        </div>
        {error && <div className="mb-4 text-red-600 text-sm">{error}</div>}
        <button
          type="submit"
          className="w-full bg-primary text-white py-2 rounded font-semibold hover:bg-primary/90 transition mt-6"
          disabled={loading}
        >
          {loading ? "Salvando..." : "Salvar Produto"}
        </button>
      </form>
    </div>
  );
} 