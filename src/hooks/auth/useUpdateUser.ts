import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateCurrentUser } from '../../services/apiAuth';
import toast from 'react-hot-toast';

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const { mutate: updateUser, isPending: isLoadingUpdateUser } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: ({ user }) => {
      queryClient.setQueryData(['user'], user);

      queryClient.invalidateQueries({
        queryKey: ['user'],
      });
      toast.success("User account updated successfully. You're all set!");
    },
    onError: (error) =>
      toast.error(
        error.message || 'An error occurred during update user account.'
      ),
  });

  return {
    updateUser,
    isLoadingUpdateUser,
  };
}
