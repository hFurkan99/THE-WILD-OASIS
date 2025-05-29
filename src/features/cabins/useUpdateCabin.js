import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useUpdateCabin() {
  const queryClint = useQueryClient();
  const { mutate: updateCabin, isPending: isUpdating } = useMutation({
    mutationFn: ({ cabinData, id }) => createEditCabin(cabinData, id),
    onSuccess: () => {
      toast.success("Cabin updated successfully!");
      queryClint.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (error) => {
      toast.error("Error updating cabin: " + error.message);
    },
  });
  return { isUpdating, updateCabin };
}
