'use client';

import { useState } from 'react';

import ForgotPasswordModal from './forgot-password-modal';
import LoginForm from './login-form';
import RegisterForm from './register-form';

interface AuthModalProps {
  onClose: () => void;
}

export default function AuthModal({ onClose }: AuthModalProps) {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const handleForgotPassword = () => {
    setShowForgotPassword(true);
  };

  const handleBackToAuth = () => {
    setShowForgotPassword(false);
  };

  const handleSuccess = () => {
    onClose();
  };

  if (showForgotPassword) {
    return <ForgotPasswordModal onClose={onClose} onBack={handleBackToAuth} />;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-4">
      <div className="relative my-8 w-full max-w-md rounded-2xl bg-white p-6 shadow-xl sm:p-8">
        <button
          onClick={onClose}
          className="text-grey hover:text-dark absolute top-4 right-4 transition-colors"
          aria-label="Закрити"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Tabs */}
        <div className="border-grey-light-r mb-6 flex justify-center gap-8 border-b">
          <button
            onClick={() => setActiveTab('login')}
            className={`text-grey hover:text-dark relative pb-3 font-medium transition-colors ${
              activeTab === 'login' ? 'text-dark' : ''
            }`}
          >
            Увійти
            {activeTab === 'login' && (
              <div className="bg-sky absolute right-0 bottom-0 left-0 h-0.5" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('register')}
            className={`text-grey hover:text-dark relative pb-3 font-medium transition-colors ${
              activeTab === 'register' ? 'text-dark' : ''
            }`}
          >
            Зареєструватися
            {activeTab === 'register' && (
              <div className="bg-sky absolute right-0 bottom-0 left-0 h-0.5" />
            )}
          </button>
        </div>

        {/* Form Content */}
        {activeTab === 'login' ? (
          <LoginForm
            onForgotPassword={handleForgotPassword}
            onSuccess={handleSuccess}
          />
        ) : (
          <RegisterForm onSuccess={handleSuccess} />
        )}
      </div>
    </div>
  );
}
