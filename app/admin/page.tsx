"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function AdminPanel() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      const { data } = await supabase.auth.getUser();
      if (!data.user) {
        router.replace("/admin/login");
      } else {
        setUser(data.user);
      }
      setLoading(false);
    }
    checkAuth();
  }, [router]);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/admin/login");
  }

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center">Carregando...</div>;
  }

  return (
    <div className="container py-16">
      <div className="max-w-xl mx-auto bg-white p-8 rounded shadow-md border">
        <h1 className="text-2xl font-bold mb-4">Painel Administrativo</h1>
        <p className="mb-6">Bem-vindo, <span className="font-semibold">{user?.email}</span>!</p>
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => router.push('/admin/produtos/novo')}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          >
            Cadastrar Produto
          </button>
          <button
            onClick={() => router.push('/admin/produtos')}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Editar Produtos
          </button>
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
        >
          Sair
        </button>
      </div>
    </div>
  );
} 