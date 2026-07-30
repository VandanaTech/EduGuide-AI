import React, { useState } from 'react';
import { X, Mail, Send, CheckCircle2, MessageSquare, Globe, Sparkles } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setName('');
      setEmail('');
      setMessage('');
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 dark:bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg glass-card p-6 sm:p-8 rounded-3xl border-slate-200 dark:border-purple-500/30 bg-white/95 dark:bg-[#0d121f] space-y-6">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-1 text-center">
          <div className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-500/15 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-500/30">
            <Sparkles className="w-3.5 h-3.5 text-purple-600 dark:text-cyan-300" /> UN SDG 4 Education Initiative
          </div>
          <h3 className="text-2xl font-black text-slate-900 dark:text-white">Contact EduGuide AI Team</h3>
          <p className="text-xs text-slate-600 dark:text-slate-300">
            Have questions, feedback, or institutional partnership inquiries? We'd love to hear from you.
          </p>
        </div>

        {submitted ? (
          <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-500/40 text-center space-y-3">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 dark:text-emerald-400 mx-auto animate-bounce" />
            <h4 className="font-bold text-slate-900 dark:text-white text-base">Message Received!</h4>
            <p className="text-xs text-emerald-800 dark:text-emerald-200">
              Thank you for reaching out. Our SDG 4 education team will respond to your inquiry shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Your Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Alex Chen"
                className="w-full glass-input px-3.5 py-2.5 rounded-xl text-xs bg-white dark:bg-transparent text-slate-900 dark:text-white border-slate-300 dark:border-purple-500/30"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="alex.chen@university.edu"
                className="w-full glass-input px-3.5 py-2.5 rounded-xl text-xs bg-white dark:bg-transparent text-slate-900 dark:text-white border-slate-300 dark:border-purple-500/30"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Message / Inquiry</label>
              <textarea
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell us about your learning goals or feedback..."
                className="w-full glass-input p-3 rounded-xl text-xs resize-none bg-white dark:bg-transparent text-slate-900 dark:text-white border-slate-300 dark:border-purple-500/30"
              />
            </div>

            <button
              type="submit"
              className="w-full gradient-button py-3 rounded-xl font-bold text-xs sm:text-sm text-white flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Send Message</span>
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
