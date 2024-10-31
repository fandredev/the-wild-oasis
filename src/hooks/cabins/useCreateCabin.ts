import { useQueryClient, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createCabin as createCabinAPI } from "../../services/apiCabins";


export function useCreateCabin(){
  const queryClient = useQueryClient();

  const { mutate: createCabin, isPending: isCreating } = useMutation({
    mutationFn: createCabinAPI,
    onSuccess: () => {
      toast.success('New cabin successfully created');
            /**
       * Quando a requisição der sucesso, pegue o cachê atual e invalidate ele (pois ele agora é obsoleto, já que fiz um create)
       * Quando isso for chamado, ele revalidará o cachê com os dados novos e invalidando o cachê antigo (com o dado obsoleto)
       */
      queryClient.invalidateQueries({
        queryKey: ['cabins'],
      });
  
    },
    onError: (err) => toast.error(err.message),
  });

  return {
    createCabin, isCreating
  }
}
