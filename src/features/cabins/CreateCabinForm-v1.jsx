import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";
import { createCabin } from "../../services/apiCabins";

function CreateCabinForm() {
  const { register, handleSubmit, reset, formState } = useForm();
  const { errors } = formState;

  const queryClint = useQueryClient();

  const { mutate, isPending: isCreating } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success("Cabin created successfully!");
      queryClint.invalidateQueries({ queryKey: ["cabins"] });
      reset();
    },
    onError: (error) => {
      toast.error("Error creating cabin: " + error.message);
    },
  });

  function onSubmit(data) {
    mutate({ ...data, image: data.image[0] });
  }

  function onerror(errors) {}

  return (
    <Form onSubmit={handleSubmit(onSubmit, onerror)}>
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          placeholder="Enter cabin name"
          disabled={isCreating}
          {...register("name", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          placeholder="Enter maximum capacity"
          disabled={isCreating}
          {...register("maxCapacity", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity must be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          placeholder="Enter regular price"
          disabled={isCreating}
          {...register("regularPrice", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          placeholder="Enter discount percentage"
          disabled={isCreating}
          defaultValue={0}
          {...register("discount", {
            required: "This field is required",
            min: {
              value: 0,
              message: "Discount cannot be negative",
            },
            validate: (value) => value < 100 || "Discount cannot exceed 100%",
            // max: {
            //   value: 100,
            //   message: "Discount cannot exceed 100%",
            // },
          })}
        />
      </FormRow>

      <FormRow label="Description" error={errors?.description?.message}>
        <Textarea
          type="number"
          id="description"
          placeholder="Enter cabin description"
          disabled={isCreating}
          defaultValue=""
          {...register("description", {
            required: "This field is required",
            minLength: {
              value: 10,
              message: "Description must be at least 10 characters long",
            },
            maxLength: {
              value: 500,
              message: "Description cannot exceed 500 characters",
            },
          })}
        />
      </FormRow>

      <FormRow label="Cabin photo" error={errors?.image?.message}>
        <FileInput
          id="image"
          accept="image/*"
          type="file"
          {...register("image", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isCreating}>Add cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
