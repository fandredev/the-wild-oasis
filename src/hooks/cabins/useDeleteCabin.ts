import { useQueryClient, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteCabin as deleteCabinAPI } from "../../services/apiCabins";

export function useDeleteCabin(){
  const queryClient = useQueryClient();

  const { isPending: isDeleting, mutate: deleteCabin} = useMutation({
    mutationFn: (id: number) => deleteCabinAPI(id),
    onSuccess: () => {
      toast.success('Cabin successfully deleted!');
      /**
       * Quando a requisição der sucesso, pegue o cachê atual e invalidate ele (pois ele agora é obsoleto, já que fiz um delete)
       * Quando isso for chamado, ele revalidará o cachê com os dados novos e invalidando o cachê antigo (com o dado obsoleto)
       */
      queryClient.invalidateQueries({
        queryKey: ['cabins'],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return {
    isDeleting,
    deleteCabin
  }
}

