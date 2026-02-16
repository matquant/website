import React, { useState, useCallback } from 'react';
import { Upload, CheckCircle2, Loader2 } from 'lucide-react';

interface FileDropzoneProps {
  onFileProcessed: (content: string, fileName: string) => void;
}

export const FileDropzone = ({ onFileProcessed }: FileDropzoneProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const onDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const onDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    setIsProcessing(true);

    const files = Array.from(e.dataTransfer.files);
    const htmlFile = files.find(f => f.name.endsWith('.html') || f.name.endsWith('.txt'));

    if (htmlFile) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        onFileProcessed(content, htmlFile.name);
        setIsProcessing(false);
        setStatus('success');
        setTimeout(() => setStatus('idle'), 3000);
      };
      reader.readAsText(htmlFile);
    } else {
      setIsProcessing(false);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  }, [onFileProcessed]);

  return (
    <div
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      className={`
        relative overflow-hidden rounded-2xl border-2 border-dashed transition-all duration-300
        flex flex-col items-center justify-center p-12 text-center
        ${isDragging ? 'border-primary bg-primary/5 scale-[1.02]' : 'border-white/5 bg-white/[0.02]'}
        ${status === 'success' ? 'border-green-500/50 bg-green-500/5' : ''}
      `}
    >
      {isProcessing ? (
        <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
      ) : status === 'success' ? (
        <CheckCircle2 className="w-12 h-12 text-green-500 mb-4 animate-bounce" />
      ) : (
        <Upload className={`w-12 h-12 mb-4 transition-colors ${isDragging ? 'text-primary' : 'text-white/20'}`} />
      )}

      <div className="font-mono text-xs tracking-[0.2em] mb-2 uppercase">
        {isDragging ? 'RELEASE_TO_UPLOAD' : 'DROP_RESEARCH_HTML'}
      </div>
      <p className="text-muted text-[10px] font-mono uppercase tracking-widest max-w-[200px]">
        Automatically syncs with institutional index
      </p>

      {/* Decorative corners */}
      <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary/20"></div>
      <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-primary/20"></div>
      <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-primary/20"></div>
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary/20"></div>
    </div>
  );
};
