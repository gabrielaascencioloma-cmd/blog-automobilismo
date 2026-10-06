// Prepara as tabelas dos posts para exibição: envolve cada <table> em um contêiner (bordas, rolagem)
// e copia o título de cada coluna para um data-label nas células. No celular, o CSS usa esse rótulo
// para mostrar cada linha como um cartão, em vez de uma tabela espremida.

const strip = (s: string) =>
  s
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const escapeAttr = (s: string) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;");

export function enhanceTables(html: string): string {
  if (!html.includes("<table")) return html;

  return html.replace(/<table[\s\S]*?<\/table>/g, (table) => {
    const rows = table.match(/<tr[\s\S]*?<\/tr>/g) ?? [];
    const head = rows.find((r) => /<th[\s>]/.test(r));
    const labels = head ? [...head.matchAll(/<th[^>]*>([\s\S]*?)<\/th>/g)].map((m) => strip(m[1])) : [];

    let out = table;
    if (labels.length > 0) {
      out = table.replace(/<tr[\s\S]*?<\/tr>/g, (row) => {
        if (/<th[\s>]/.test(row)) return row;
        let i = 0;
        return row.replace(/<td/g, () => `<td data-label="${escapeAttr(labels[i++] ?? "")}"`);
      });
    }
    return `<div class="table-wrap">${out}</div>`;
  });
}
