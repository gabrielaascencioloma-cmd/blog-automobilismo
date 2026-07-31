"use client";

import { logout } from "../actions";

export function LogoutButton() {
  return (
    <form action={logout}>
      <button type="submit" className="transition-colors hover:text-white">
        Sair
      </button>
    </form>
  );
}
