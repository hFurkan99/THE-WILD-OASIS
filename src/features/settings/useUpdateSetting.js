import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateSetting as updateSettingApi } from "../../services/apiSettings";

export function useUpdateSetting() {
  const queryClint = useQueryClient();
  const { mutate: updateSetting, isPending: isUpdating } = useMutation({
    mutationFn: updateSettingApi,
    onSuccess: () => {
      toast.success("Setting updated successfully!");
      queryClint.invalidateQueries({ queryKey: ["settings"] });
    },
    onError: (error) => {
      toast.error("Error updating setting: " + error.message);
    },
  });
  return { isUpdating, updateSetting };
}
