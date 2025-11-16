'use client';

import { useEffect, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { ArrowLeftIcon, CheckCircleIcon } from '@/lib/shop/icons';
import {
  forgotPasswordSchema,
  type ForgotPasswordFormData,
} from '@/lib/shop/validation/auth';
import { createClient } from '@/lib/supabase/client';

interface ForgotPasswordModalProps {
  onClose: () => void;
  onBack: () => void;
}

export default function ForgotPasswordModal({
  onClose,
  onBack,
}: ForgotPasswordModalProps) {
  const [isSuccess, setIsSuccess] = useState(false);
  const supabase = createClient();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    watch,
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const emailValue = watch('email');

  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [isSuccess, onClose]);

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
        redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password`,
      });

      if (error) {
        setError('root', {
          message: 'Помилка відправки листа. Спробуйте ще раз',
        });
        return;
      }

      setIsSuccess(true);
    } catch {
      setError('root', {
        message: 'Сталася помилка. Спробуйте ще раз',
      });
    }
  };

  if (isSuccess) {
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

          <div className="flex flex-col items-center text-center">
            <div className="bg-green/10 mb-4 rounded-full p-4">
              <CheckCircleIcon className="text-green h-12 w-12" />
            </div>

            <h2 className="text-dark mb-2 text-2xl font-bold">
              Перевірте пошту
            </h2>

            <p className="text-grey mb-4 text-sm">
              Ми надіслали інструкції для відновлення паролю на:
            </p>

            <p className="text-dark mb-6 font-medium">{emailValue}</p>

            <p className="text-grey mb-6 text-sm">
              Не отримали лист? Перевірте папку &quot;Спам&quot;
            </p>

            <button
              onClick={onBack}
              className="bg-sky hover:bg-sky-dark w-full rounded-lg py-3 font-semibold text-white transition-colors"
            >
              Повернутися до входу
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-4">
      <div className="relative my-8 w-full max-w-md rounded-2xl bg-white p-6 shadow-xl sm:p-8">
        <button
          onClick={onBack}
          className="text-grey hover:text-dark absolute top-4 left-4 transition-colors"
          aria-label="Назад"
        >
          <ArrowLeftIcon className="h-6 w-6" />
        </button>

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

        <h2 className="text-dark mb-2 text-center text-2xl font-bold">
          Забули пароль?
        </h2>
        <p className="text-grey mb-6 text-center text-sm">
          Введіть email, щоб отримати інструкції для відновлення
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label
              htmlFor="forgot-email"
              className="text-grey mb-2 block text-sm font-medium"
            >
              Email
            </label>
            <input
              id="forgot-email"
              type="email"
              autoComplete="email"
              className="bg-grey-light-r text-dark placeholder:text-grey-light focus:border-sky focus:ring-sky block w-full rounded-lg border border-transparent px-4 py-3 transition-colors outline-none"
              placeholder="oniksdnipro@gmail.com"
              {...register('email')}
            />
            {errors.email && (
              <p className="text-red mt-1 text-sm">{errors.email.message}</p>
            )}
          </div>

          {errors.root && (
            <div className="bg-red/10 text-red rounded-lg p-3 text-sm">
              {errors.root.message}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-sky hover:bg-sky-dark w-full rounded-lg py-3 font-semibold text-white transition-colors disabled:opacity-50"
          >
            {isSubmitting ? 'Надсилання...' : 'Надіслати інструкції'}
          </button>
        </form>
      </div>
    </div>
  );
}
