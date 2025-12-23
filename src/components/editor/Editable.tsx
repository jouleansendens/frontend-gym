import { useContent } from '../../context/ContentContext';
import { useState, useEffect } from 'react';

interface EditableProps {
  id: string;
  as?: any; // Menggunakan any agar fleksibel untuk h1, p, span, dll.
  type?: 'text' | 'textarea';
  className?: string;
  defaultText?: string;
  style?: React.CSSProperties; // ✅ Tambahan prop untuk mendukung font kustom
  children?: React.ReactNode;
}

export function Editable({ 
  id, 
  as: Component = 'div', 
  type = 'text',
  className = '', 
  defaultText = '',
  style, // ✅ Destructure style
  children 
}: EditableProps) {
  const { content, updateContent, isEditMode } = useContent();
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState('');

  useEffect(() => {
    setValue(content[id] || defaultText || '');
  }, [content, id, defaultText]);

  const handleSave = () => {
    updateContent(id, value);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey && type !== 'textarea') {
      e.preventDefault();
      handleSave();
    }
    if (e.key === 'Escape') {
      setValue(content[id] || defaultText || '');
      setIsEditing(false);
    }
  };

  // 1. Tampilan saat sedang mengetik (Input/Textarea)
  if (isEditMode && isEditing) {
    if (type === 'textarea') {
      return (
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
          style={style} // ✅ Terapkan font saat mengetik
          className={`${className} bg-zinc-900/80 border-2 border-orange-500 rounded-lg p-2 focus:outline-none resize-none min-h-[100px] custom-scrollbar text-white`}
          autoFocus
        />
      );
    }
    
    return (
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={handleSave}
        onKeyDown={handleKeyDown}
        style={style} // ✅ Terapkan font saat mengetik
        className={`${className} bg-zinc-900/80 border-2 border-orange-500 rounded-lg px-2 py-1 focus:outline-none text-white`}
        autoFocus
      />
    );
  }

  // 2. Tampilan Mode Edit (Clickable)
  if (isEditMode) {
    return (
      <Component
        onClick={() => setIsEditing(true)}
        style={style} // ✅ Terapkan font pada preview
        className={`${className} cursor-pointer hover:bg-orange-500/10 hover:outline hover:outline-2 hover:outline-orange-500/50 rounded transition-all relative group`}
      >
        {content[id] || defaultText || children || 'Click to edit'}
        <span className="absolute -top-6 left-0 bg-orange-500 text-white text-[10px] px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
          Edit Text
        </span>
      </Component>
    );
  }

  // 3. Tampilan Normal (Production)
  return (
    <Component className={className} style={style}>
      {content[id] || defaultText || children}
    </Component>
  );
}