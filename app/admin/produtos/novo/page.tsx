"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

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
  imagens: [""]
};

export default function CadastroProduto() {
  const [form, setForm] = useState(camposIniciais);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleImageChange(index: number, value: string) {
    const novasImagens = [...form.imagens];
    novasImagens[index] = value;
    setForm({ ...form, imagens: novasImagens });
  }

  function adicionarImagem() {
    setForm({ ...form, imagens: [...form.imagens, ""] });
  }

  function removerImagem(index: number) {
    const novasImagens = form.imagens.filter((_, i) => i !== index);
    setForm({ ...form, imagens: novasImagens });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    // Monta os campos imagem_url, imagem_url_2, ...
    const imagensObj: Record<string, string> = {};
    form.imagens.forEach((url, i) => {
      imagensObj[`imagem_url${i === 0 ? "" : "_" + (i + 1)}`] = url;
    });
    const produto = { ...form, ...imagensObj };
    if ('imagens' in produto) {
      delete (produto as any).imagens;
    }
    const { error } = await supabase.from("produtos").insert([produto]);
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
        </div>
        <div className="col-span-2">
          <label className="block mb-1 font-medium">Imagens do Produto</label>
          {form.imagens.map((url, idx) => (
            <div key={idx} className="flex gap-2 mb-2">
              <input
                type="text"
                className="w-full border rounded px-3 py-2"
                placeholder={`URL da Imagem ${idx + 1}`}
                value={url}
                onChange={e => handleImageChange(idx, e.target.value)}
              />
              {form.imagens.length > 1 && (
                <button type="button" onClick={() => removerImagem(idx)} className="text-red-600 font-bold">X</button>
              )}
            </div>
          ))}
          <button type="button" onClick={adicionarImagem} className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition">Adicionar Imagem</button>
        </div>
        <div className="hidden md:block col-span-2 mt-6">
          <Carousel>
            <CarouselContent>
              {form.imagens.filter(Boolean).map((url, idx) => (
                <CarouselItem key={idx}>
                  <img src={url} alt={`Imagem ${idx + 1}`} className="max-h-64 mx-auto" />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
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