"use client";

import { useActionState } from "react";
import Image from "next/image";
import { login } from "./actions";
import { btnPrimary, input, label } from "../components/ui";

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(login, undefined);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-16">
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/10 blur-3xl" />

      <div className="relative w-full max-w-sm">
        <Image
          src="/logotipo/mcp-logo-branca.png"
          alt="Meu Carro Protegido"
          width={200}
          height={40}
          className="mx-auto h-8 w-auto"
          priority
        />

        <div className="mt-8 rounded-2xl border border-white/[0.07] bg-[#17181c] p-8 shadow-2xl shadow-black/40">
          <h1 className="text-lg font-semibold text-white">Entrar no painel</h1>
          <p className="mt-1 text-sm text-zinc-500">Acesso restrito à equipe do blog</p>

          <form action={formAction} className="mt-6 space-y-4">
            <div>
              <label htmlFor="email" className={label}>
                E-mail
              </label>
              <input id="email" name="email" type="email" required autoComplete="email" className={input} />
            </div>
            <div>
              <label htmlFor="password" className={label}>
                Senha
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                className={input}
              />
            </div>

            {state?.error && (
              <p className="rounded-xl border border-red-500/20 bg-red-500/10 px-3 py-2 text-sm text-red-400">
                {state.error}
              </p>
            )}

            <button type="submit" disabled={pending} className={`${btnPrimary} w-full`}>
              {pending ? "Entrando…" : "Entrar"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
