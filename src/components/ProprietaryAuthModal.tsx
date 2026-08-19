import React, { useState, useEffect, useRef } from 'react';
import { Lock, KeyRound, ShieldAlert, Eye, EyeOff, X, ArrowRight } from 'lucide-react';
import { Button } from './ui/Button';

interface ProprietaryAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

// Allowed access keys hashes (SHA-256 hex)
const VALID_PASSWORD_HASHES = [
  '81defdcd49d8029d7c545d008b0d6e6aee51809cfec9ec372418e44da6163b86'
];

// Helper to hash password
const hashPassword = async (password: string) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};

export const ProprietaryAuthModal: React.FC<ProprietaryAuthModalProps> = ({
  isOpen,
  onClose,
  onSuccess
}) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isShaking, setIsShaking] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setPassword('');
      setError('');
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPass = password.trim().toLowerCase();

    if (!cleanPass) {
      setError('Please enter a password.');
      triggerShake();
      return;
    }

    const hashedPass = await hashPassword(cleanPass);

    if (VALID_PASSWORD_HASHES.includes(hashedPass)) {
      setError('');
      try {
        sessionStorage.setItem('mat_proprietary_auth', 'true');
      } catch (err) {
        console.warn('Session storage unavailable', err);
      }
      onSuccess();
      onClose();
    } else {
      setError('Incorrect password.');
      triggerShake();
    }
  };

  const triggerShake = () => {
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/85 backdrop-blur-md animate-fadeIn">
      {/* Outer Click-to-Close Backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Box */}
      <div 
        className={`relative w-full max-w-lg bg-surface border border-white/15 p-8 md:p-10 shadow-2xl transition-transform duration-200 ${
          isShaking ? 'animate-bounce text-red-400' : ''
        }`}
        style={{
          boxShadow: '0 0 50px rgba(0, 0, 0, 0.9), 0 0 20px rgba(255, 203, 5, 0.08)'
        }}
      >
        {/* Corner Accents */}
        <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-primary" />
        <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-primary" />
        <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-primary" />
        <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-primary" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted hover:text-white transition-colors p-2"
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        {/* Header Badge */}
        <div className="flex items-center gap-2 mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/30 text-primary text-[10px] font-mono font-bold tracking-[0.2em] uppercase">
            PROPRIETARY ACCESS
          </div>
        </div>

        {/* Title & Description */}
        <div className="space-y-3 mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-primary/10 border border-primary/30 text-primary">
              <Lock size={22} />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white uppercase">
              Proprietary <span className="text-primary">Research</span>
            </h2>
          </div>
          <p className="text-xs md:text-sm text-muted leading-relaxed font-sans">
            Access internal quantitative models, live execution architecture, and proprietary alpha strategies. Authorized MAT researchers and desks only.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-[10px] font-mono font-bold tracking-[0.25em] text-muted uppercase">
              Password
            </label>
            <div className="relative flex items-center">
              <div className="absolute left-3 text-muted/60 pointer-events-none">
                <KeyRound size={16} />
              </div>
              <input
                ref={inputRef}
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError('');
                }}
                placeholder="ENTER PASSWORD..."
                className="w-full bg-background border border-white/20 pl-10 pr-12 py-3.5 text-sm font-mono text-white placeholder:text-muted/40 focus:outline-none focus:border-primary transition-colors"
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 text-muted hover:text-white transition-colors p-1"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            {/* Error Message */}
            {error ? (
              <div className="text-[11px] font-mono text-red-400 bg-red-500/10 border border-red-500/20 px-3 py-2 mt-2">
                {error}
              </div>
            ) : null}
          </div>



          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button
              type="submit"
              variant="primary"
              className="h-12 flex-1 text-xs tracking-widest uppercase font-mono"
            >
              Authenticate <ArrowRight size={14} className="ml-1" />
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={onClose}
              className="h-12 sm:w-28 text-xs tracking-widest uppercase font-mono"
            >
              Cancel
            </Button>
          </div>
        </form>

        {/* Footer Note */}
        <div className="mt-6 pt-4 border-t border-white/5 text-[9px] font-mono text-muted/60 text-center tracking-widest uppercase">
          MAT Quantitative Systems // Multi-Factor Alpha Repository
        </div>
      </div>
    </div>
  );
};
