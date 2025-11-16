'use client';

import { useState, useRef, useEffect } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import {
  profileSchema,
  passwordSchema,
  type ProfileFormData,
  type PasswordFormData,
} from '@/lib/shop/validation/auth';
import { createClient } from '@/lib/supabase/client';

import { useAuthStore } from '@/store/auth-store';

export default function CabinetPage() {
  const router = useRouter();
  const { user, isLoading, setUser } = useAuthStore();
  const supabase = createClient();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register: registerProfile,
    handleSubmit: handleSubmitProfile,
    formState: { errors: errorsProfile, isSubmitting: isSubmittingProfile },
    reset: resetProfile,
    setError: setErrorProfile,
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.user_metadata?.name || user?.user_metadata?.full_name || '',
      email: user?.email || '',
      phone: user?.user_metadata?.phone || '',
      avatar_url: user?.user_metadata?.avatar_url || '',
    },
  });

  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    formState: { errors: errorsPassword, isSubmitting: isSubmittingPassword },
    setError: setErrorPassword,
    reset: resetPassword,
  } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
  });

  useEffect(() => {
    if (user) {
      resetProfile({
        name: user.user_metadata?.name || user.user_metadata?.full_name || '',
        email: user.email || '',
        phone: user.user_metadata?.phone || '',
        avatar_url: user.user_metadata?.avatar_url || '',
      });
    }
  }, [user, resetProfile]);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/');
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="bg-light min-h-screen py-8">
        <div className="mx-auto max-w-[1360px] px-4 md:px-[35px] xl:mt-[138px]">
          <div className="flex items-center justify-center py-20">
            <div className="border-sky h-12 w-12 animate-spin rounded-full border-4 border-t-transparent" />
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const onSubmitProfile = async (data: ProfileFormData) => {
    console.log('Submitting profile data:', data);
    try {
      // Update basic user data (name, email, avatar)
      const updatePayload = {
        email: data.email,
        data: {
          ...user?.user_metadata,
          name: data.name,
          full_name: data.name,
          avatar_url: data.avatar_url,
          phone: data.phone, // Keep in metadata for backward compatibility
        },
      };
      console.log('Supabase update payload:', updatePayload);

      const { error } = await supabase.auth.updateUser(updatePayload);

      if (error) {
        console.error('Supabase update error:', error);
        setErrorProfile('root', { message: error.message });
        return;
      }

      // Update phone in auth.users table via Edge Function
      if (data.phone) {
        const session = await supabase.auth.getSession();
        if (!session.data.session?.access_token) {
          throw new Error('No active session');
        }

        const functionUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/update-user-phone`;
        console.log('Calling Edge Function:', functionUrl);

        const phoneUpdateResponse = await fetch(functionUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session.data.session.access_token}`,
          },
          body: JSON.stringify({ phone: data.phone }),
        });

        if (!phoneUpdateResponse.ok) {
          const errorData = await phoneUpdateResponse.json();
          console.error('Phone update error:', errorData);
          // Continue even if phone update fails - other data was saved
          console.warn(
            'Phone update failed, but other profile data was saved:',
            errorData,
          );
        } else {
          console.log('Phone updated successfully in auth.users');
        }
      }

      // Refresh user data
      const {
        data: { user: updatedUser },
      } = await supabase.auth.getUser();
      console.log('Updated user from Supabase:', updatedUser);
      if (updatedUser) {
        setUser(updatedUser);
      }

      alert('Профіль успішно оновлено!');
    } catch (e) {
      const error = e as Error;
      console.error('Catch block error:', error);
      setErrorProfile('root', {
        message: `Сталася помилка: ${error.message}. Спробуйте ще раз`,
      });
    }
  };

  const handleAvatarUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Будь ласка, виберіть зображення');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Розмір файлу не повинен перевищувати 5MB');
      return;
    }

    setIsUploadingAvatar(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/user/avatar', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        let errorMessage = 'Upload failed';
        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorMessage;
        } catch {
          errorMessage = `Server error: ${response.status} ${response.statusText}`;
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();

      // Update local user state
      const {
        data: { user: updatedUser },
      } = await supabase.auth.getUser();
      if (updatedUser) {
        setUser(updatedUser);
      }

      alert('Аватар успішно оновлено!');
    } catch (error) {
      console.error('Avatar upload error:', error);
      const errorMessage =
        error instanceof Error ? error.message : 'Невідома помилка';
      alert(`Помилка при завантаженні аватара: ${errorMessage}`);
    } finally {
      setIsUploadingAvatar(false);
    }
  };

  const handleAvatarRemove = async () => {
    if (!confirm('Ви впевнені, що хочете видалити аватар?')) {
      return;
    }

    setIsUploadingAvatar(true);

    try {
      const response = await fetch('/api/user/avatar', {
        method: 'DELETE',
      });

      if (!response.ok) {
        let errorMessage = 'Deletion failed';
        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorMessage;
        } catch {
          errorMessage = `Server error: ${response.status} ${response.statusText}`;
        }
        throw new Error(errorMessage);
      }

      // Update local user state
      const {
        data: { user: updatedUser },
      } = await supabase.auth.getUser();
      if (updatedUser) {
        setUser(updatedUser);
      }

      alert('Аватар успішно видалено!');
    } catch (error) {
      console.error('Avatar removal error:', error);
      const errorMessage =
        error instanceof Error ? error.message : 'Невідома помилка';
      alert(`Помилка при видаленні аватара: ${errorMessage}`);
    } finally {
      setIsUploadingAvatar(false);
    }
  };

  const onSubmitPassword = async (data: PasswordFormData) => {
    try {
      const { error } = await supabase.auth.updateUser({
        password: data.newPassword,
      });

      if (error) {
        setErrorPassword('root', { message: error.message });
        return;
      }

      resetPassword();
      alert('Пароль успішно змінено!');
    } catch {
      setErrorPassword('root', {
        message: 'Сталася помилка. Спробуйте ще раз',
      });
    }
  };

  const handleDeleteAccount = async () => {
    setIsDeleting(true);
    try {
      const session = await supabase.auth.getSession();
      if (!session.data.session?.access_token) {
        throw new Error('No active session found. Please log in again.');
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/delete-user`,
        {
          method: 'POST', // Deno.serve currently has issues with DELETE method bodies
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session.data.session.access_token}`,
          },
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete account.');
      }

      alert('Ваш профіль було успішно видалено.');
      await supabase.auth.signOut();
      router.push('/'); // Redirect to homepage
      router.refresh(); // Force a refresh to clear all state
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Невідома помилка';
      alert(`Помилка при видаленні профілю: ${errorMessage}`);
    } finally {
      setIsDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  return (
    <div className="bg-light min-h-screen py-8">
      <div className="mx-auto max-w-[1360px] px-4 md:px-[35px] xl:mt-[138px]">
        <h1 className="text-dark mb-8 text-3xl font-bold">Особистий кабінет</h1>

        <div className="space-y-6">
          {/* Profile Info */}
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <h2 className="text-dark mb-4 text-xl font-semibold">
              Особисті дані
            </h2>
            <form
              onSubmit={handleSubmitProfile(onSubmitProfile)}
              className="space-y-4"
            >
              {/* Avatar Upload */}
              <div className="flex items-center gap-6">
                <div className="relative">
                  {user?.user_metadata?.avatar_url ? (
                    <Image
                      src={user.user_metadata.avatar_url}
                      alt="Avatar"
                      width={100}
                      height={100}
                      className="h-24 w-24 rounded-full object-cover"
                    />
                  ) : (
                    <div className="bg-grey-light-r text-grey flex h-24 w-24 items-center justify-center rounded-full text-3xl font-semibold">
                      {user?.user_metadata?.name?.[0]?.toUpperCase() ||
                        user?.email?.[0]?.toUpperCase() ||
                        '?'}
                    </div>
                  )}
                  {isUploadingAvatar && (
                    <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50">
                      <div className="h-8 w-8 animate-spin rounded-full border-4 border-white border-t-transparent" />
                    </div>
                  )}
                </div>
                <div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarUpload}
                    className="hidden"
                  />
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isUploadingAvatar}
                      className="bg-grey-light-r text-dark hover:bg-grey-light rounded-lg px-4 py-2 text-sm font-medium transition-colors disabled:opacity-50"
                    >
                      {isUploadingAvatar
                        ? 'Завантаження...'
                        : user?.user_metadata?.avatar_url
                          ? 'Змінити аватар'
                          : 'Завантажити аватар'}
                    </button>
                    {user?.user_metadata?.avatar_url && (
                      <button
                        type="button"
                        onClick={handleAvatarRemove}
                        disabled={isUploadingAvatar}
                        className="border-red text-red hover:bg-red rounded-lg border px-4 py-2 text-sm font-medium transition-colors hover:text-white disabled:opacity-50"
                      >
                        Видалити
                      </button>
                    )}
                  </div>
                  <p className="text-grey mt-2 text-xs">
                    JPG, PNG або GIF. Максимум 5MB.
                  </p>
                </div>
              </div>

              <div>
                <label className="text-grey mb-2 block text-sm font-medium">
                  Ім&apos;я
                </label>
                <input
                  type="text"
                  className="bg-grey-light-r text-dark focus:border-sky block w-full rounded-lg border border-transparent px-4 py-3 transition-colors outline-none"
                  {...registerProfile('name')}
                />
                {errorsProfile.name && (
                  <p className="text-red mt-1 text-sm">
                    {errorsProfile.name.message}
                  </p>
                )}
              </div>

              <div>
                <label className="text-grey mb-2 block text-sm font-medium">
                  Email
                </label>
                <input
                  type="email"
                  className="bg-grey-light-r text-dark focus:border-sky block w-full rounded-lg border border-transparent px-4 py-3 transition-colors outline-none"
                  {...registerProfile('email')}
                />
                {errorsProfile.email && (
                  <p className="text-red mt-1 text-sm">
                    {errorsProfile.email.message}
                  </p>
                )}
              </div>

              <div>
                <label className="text-grey mb-2 block text-sm font-medium">
                  Телефон (опціонально)
                </label>
                <input
                  type="tel"
                  className="bg-grey-light-r text-dark focus:border-sky block w-full rounded-lg border border-transparent px-4 py-3 transition-colors outline-none"
                  {...registerProfile('phone')}
                />
                {errorsProfile.phone && (
                  <p className="text-red mt-1 text-sm">
                    {errorsProfile.phone.message}
                  </p>
                )}
              </div>

              {errorsProfile.root && (
                <div className="bg-red/10 text-red rounded-lg p-3 text-sm">
                  {errorsProfile.root.message}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmittingProfile}
                className="bg-sky hover:bg-sky-dark rounded-lg px-6 py-3 font-semibold text-white transition-colors disabled:opacity-50"
              >
                {isSubmittingProfile ? 'Збереження...' : 'Зберегти зміни'}
              </button>
            </form>
          </div>

          {/* Change Password */}
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <h2 className="text-dark mb-4 text-xl font-semibold">
              Зміна паролю
            </h2>
            <form
              onSubmit={handleSubmitPassword(onSubmitPassword)}
              className="space-y-4"
            >
              <div>
                <label className="text-grey mb-2 block text-sm font-medium">
                  Поточний пароль
                </label>
                <input
                  type="password"
                  className="bg-grey-light-r text-dark focus:border-sky block w-full rounded-lg border border-transparent px-4 py-3 transition-colors outline-none"
                  {...registerPassword('currentPassword')}
                />
                {errorsPassword.currentPassword && (
                  <p className="text-red mt-1 text-sm">
                    {errorsPassword.currentPassword.message}
                  </p>
                )}
              </div>

              <div>
                <label className="text-grey mb-2 block text-sm font-medium">
                  Новий пароль
                </label>
                <input
                  type="password"
                  className="bg-grey-light-r text-dark focus:border-sky block w-full rounded-lg border border-transparent px-4 py-3 transition-colors outline-none"
                  {...registerPassword('newPassword')}
                />
                {errorsPassword.newPassword && (
                  <p className="text-red mt-1 text-sm">
                    {errorsPassword.newPassword.message}
                  </p>
                )}
              </div>

              <div>
                <label className="text-grey mb-2 block text-sm font-medium">
                  Підтвердження нового паролю
                </label>
                <input
                  type="password"
                  className="bg-grey-light-r text-dark focus:border-sky block w-full rounded-lg border border-transparent px-4 py-3 transition-colors outline-none"
                  {...registerPassword('confirmPassword')}
                />
                {errorsPassword.confirmPassword && (
                  <p className="text-red mt-1 text-sm">
                    {errorsPassword.confirmPassword.message}
                  </p>
                )}
              </div>

              {errorsPassword.root && (
                <div className="bg-red/10 text-red rounded-lg p-3 text-sm">
                  {errorsPassword.root.message}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmittingPassword}
                className="bg-sky hover:bg-sky-dark rounded-lg px-6 py-3 font-semibold text-white transition-colors disabled:opacity-50"
              >
                {isSubmittingPassword ? 'Зміна...' : 'Змінити пароль'}
              </button>
            </form>
          </div>

          {/* Delete Account */}
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <h2 className="text-red mb-4 text-xl font-semibold">
              Небезпечна зона
            </h2>
            <p className="text-grey mb-4 text-sm">
              Видалення профілю є незворотною дією. Всі ваші дані будуть
              втрачені.
            </p>

            {!showDeleteConfirm ? (
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="border-red text-red hover:bg-red rounded-lg border px-6 py-3 font-semibold transition-colors hover:text-white"
              >
                Видалити профіль
              </button>
            ) : (
              <div className="space-y-4">
                <p className="text-dark font-medium">
                  Ви впевнені? Цю дію неможливо скасувати.
                </p>
                <div className="flex gap-4">
                  <button
                    onClick={handleDeleteAccount}
                    disabled={isDeleting}
                    className="bg-red hover:bg-red/90 rounded-lg px-6 py-3 font-semibold text-white transition-colors disabled:opacity-50"
                  >
                    {isDeleting ? 'Видалення...' : 'Так, видалити'}
                  </button>
                  <button
                    onClick={() => setShowDeleteConfirm(false)}
                    className="bg-grey-light-r text-dark hover:bg-grey-light rounded-lg px-6 py-3 font-semibold transition-colors"
                  >
                    Скасувати
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
