import { useMutation } from '@tanstack/react-query';
import { signup as signUpApi } from '../../services/apiAuth';
import toast from 'react-hot-toast';

export function useSignup() {
  const { mutate: signup, isPending: isLoading } = useMutation({
    mutationFn: signUpApi,
    onSuccess: () => {
      toast.success(
        "Account created successfully. Please verify the new account from the user's email address."
      );
    },
    onError: (error) =>
      toast.error(error.message || 'An error occurred during registration'),
  });

  return {
    signup,
    isLoading,
  };
}
