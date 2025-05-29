import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin as deleteCabinApi } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useDeleteCabin() {
  const queryClint = useQueryClient();

  const { isPending: isDeleting, mutate: deleteCabin } = useMutation({
    mutationFn: deleteCabinApi,
    onSuccess: () => {
      toast.success("Cabin deleted successfully!");
      queryClint.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: () => {
      toast.error("Failed to delete cabin. Please try again");
    },
  });

  return { isDeleting, deleteCabin };
}
