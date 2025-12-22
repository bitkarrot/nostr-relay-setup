import { useState } from 'react';
import { Copy } from 'lucide-react';

export function CopyButton({ text, id, className = '' }) {
  const [copiedText, setCopiedText] = useState(null);

  const copyToClipboard = (text, id) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        setCopiedText(id);
        setTimeout(() => setCopiedText(null), 2000);
      });
    }
  };

  return (
    <button
      onClick={() => copyToClipboard(text, id)}
      className={`ml-2 text-slate-400 hover:text-slate-200 transition-colors ${className}`}
      title="Copy to clipboard"
    >
      <Copy
        className="w-4 h-4"
        style={{
          color: copiedText === id ? '#10b981' : undefined,
        }}
      />
    </button>
  );
}