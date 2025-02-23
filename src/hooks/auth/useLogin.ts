import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login as loginApi, LoginProps } from '../../services/apiAuth';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: login, isPending: isLoading } = useMutation({
    mutationFn: ({ email, password }: LoginProps) =>
      loginApi({
        email,
        password,
      }),

    mutationKey: ['login'],

    onSuccess: (user) => {
      queryClient.setQueryData(['user'], user.user);
      toast.success('Login successful');
      navigate('/dashboard');
    },

    onError: (error) => {
      toast.error(error.message || 'An error occurred');
    },
  });

  return {
    login,
    isLoading,
  };
}
