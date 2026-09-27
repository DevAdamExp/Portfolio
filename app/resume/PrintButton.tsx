"use client";

import { FiPrinter } from "react-icons/fi";

export default function PrintButton() {
  return (
    <button type="button" onClick={() => window.print()} className="btn btn-sm btn-secondary">
      <FiPrinter className="size-4" aria-hidden />
      Print
    </button>
  );
}
