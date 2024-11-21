import { useQueryClient, useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { logout as logoutApi } from '../../services/apiAuth';

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: logout, isPending: isLoading } = useMutation({
    mutationFn: () => logoutApi(),

    mutationKey: ['logout'],

    onSuccess: () => {
      queryClient.removeQueries();
      toast.success('Logout successful');
      navigate('/login', { replace: true });
    },

    onError: (error) => {
      toast.error(error.message || 'An error occurred');
    },
  });

  return {
    logout,
    isLoading,
  };
}
