import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useEditCabin() {
  const queryClint = useQueryClient();
  const { mutate: editCabin, isPending: isEditing } = useMutation({
    mutationFn: ({ cabinData, id }) => createEditCabin(cabinData, id),
    onSuccess: () => {
      toast.success("Cabin edited successfully!");
      queryClint.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (error) => {
      toast.error("Error editing cabin: " + error.message);
    },
  });
  return { isEditing, editCabin };
}
