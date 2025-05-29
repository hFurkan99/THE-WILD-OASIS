import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createEditCabin } from "../../services/apiCabins";

export function useCreateCabin() {
  const queryClint = useQueryClient();

  const { mutate: createCabin, isPending: isCreating } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      toast.success("Cabin created successfully!");
      queryClint.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (error) => {
      toast.error("Error creating cabin: " + error.message);
    },
  });

  return { isCreating, createCabin };
}
