import { useForm } from "react-hook-form";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSettings } from "./useSettings";
import Spinner from "../../ui/Spinner";
import { useUpdateSetting } from "./useUpdateSetting";
import { useEffect } from "react";

function UpdateSettingsForm() {
  const {
    isPending,
    settings: {
      minBookingLength,
      maxBookingLength,
      maxGuestsPerBooking,
      breakfastPrice,
    } = {},
  } = useSettings();

  const { isUpdating, updateSetting } = useUpdateSetting();

  const {
    register,
    reset,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      minBookingLength: minBookingLength || 1,
      maxBookingLength: maxBookingLength || 30,
      maxGuestsPerBooking: maxGuestsPerBooking || 10,
      breakfastPrice: breakfastPrice || 0,
    },
  });

  useEffect(() => {
    if (!isPending) {
      reset({
        minBookingLength,
        maxBookingLength,
        maxGuestsPerBooking,
        breakfastPrice,
      });
    }
  }, [
    isPending,
    reset,
    minBookingLength,
    maxBookingLength,
    maxGuestsPerBooking,
    breakfastPrice,
  ]);

  function handleBlur(field) {
    const value = getValues(field);
    updateSetting({ [field]: value });
  }

  if (isPending) return <Spinner />;

  return (
    <Form>
      <FormRow
        label="Minimum nights/booking"
        error={errors.minBookingLength?.message}
      >
        <Input
          type="number"
          id="min-nights"
          {...register("minBookingLength", { min: 1 })}
          onBlur={() => handleBlur("minBookingLength")}
          disabled={isUpdating}
        />
      </FormRow>

      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          {...register("maxBookingLength", { min: 1 })}
          onBlur={() => handleBlur("maxBookingLength")}
          disabled={isUpdating}
        />
      </FormRow>

      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          {...register("maxGuestsPerBooking", { min: 1 })}
          onBlur={() => handleBlur("maxGuestsPerBooking")}
          disabled={isUpdating}
        />
      </FormRow>

      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          {...register("breakfastPrice", { min: 0 })}
          onBlur={() => handleBlur("breakfastPrice")}
          disabled={isUpdating}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
