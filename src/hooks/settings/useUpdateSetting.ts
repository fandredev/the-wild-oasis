import { useQueryClient, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateSetting as updateSettingAPI } from "../../services/apiSettings";


export function useUpdateSetting(){
  const queryClient = useQueryClient();

  const { mutate: updateSetting, isPending: isEditing } = useMutation({
    mutationFn: updateSettingAPI,
    onSuccess: () => {
      toast.success('Settings sucessfully updated!');
            /**
       * Quando a requisição der sucesso, pegue o cachê atual e invalidate ele (pois ele agora é obsoleto, já que fiz um create)
       * Quando isso for chamado, ele revalidará o cachê com os dados novos e invalidando o cachê antigo (com o dado obsoleto)
       */
      queryClient.invalidateQueries({
        queryKey: ['settings'],
      });
  
    },
    onError: (err) => toast.error(err.message),
  });

  return {
    updateSetting, 
    isEditing
  }
}
