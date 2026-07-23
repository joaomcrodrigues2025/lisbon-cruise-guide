import Link from 'next/link';
import React from 'react';

// Renders guide copy supporting **bold** and [text](href) inline markup.
export default function RichText({ text }: { text: string }) {
  const parts: React.ReactNode[] = [];
  const pattern = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    if (match[1] && match[2]) {
      const href = match[2];
      if (href.startsWith('/')) {
        parts.push(
          <Link key={key++} href={href} className="text-[#003366] font-medium underline decoration-[#FFC72C] decoration-2 underline-offset-2 hover:text-[#004080]">
            {match[1]}
          </Link>
        );
      } else {
        parts.push(
          <a key={key++} href={href} rel="noopener" className="text-[#003366] font-medium underline decoration-[#FFC72C] decoration-2 underline-offset-2 hover:text-[#004080]">
            {match[1]}
          </a>
        );
      }
    } else if (match[3]) {
      parts.push(<strong key={key++} className="font-semibold text-[#003366]">{match[3]}</strong>);
    }
    lastIndex = pattern.lastIndex;
  }
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return <>{parts}</>;
}
