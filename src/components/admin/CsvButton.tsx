"use client";

import { ghostButton } from "./ui";

const cell = (v: string | number) => (/[",\n]/.test(String(v)) ? `"${String(v).replace(/"/g, '""')}"` : String(v));

/** downloads the rows it is given as a .csv (works even in the preview) */
export default function CsvButton({ filename, rows, label = "Export CSV" }: { filename: string; rows: (string | number)[][]; label?: string }) {
  return (
    <button
      type="button"
      className={ghostButton}
      onClick={() => {
        const blob = new Blob(["﻿" + rows.map((r) => r.map(cell).join(",")).join("\r\n")], { type: "text/csv;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const a = Object.assign(document.createElement("a"), { href: url, download: filename });
        a.click();
        URL.revokeObjectURL(url);
      }}
    >
      {label}
    </button>
  );
}
