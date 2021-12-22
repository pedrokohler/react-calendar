import React from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { HexColorPicker } from "react-colorful";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { IReminder } from "../../../domain/reminders/interfaces";

export interface FormInputs {
  description: string;
  color: string;
  time: Date;
}

function ReminderForm({
  onSubmit,
  reminder,
}: {
  onSubmit: SubmitHandler<FormInputs>;
  reminder?: IReminder;
}) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormInputs>();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        defaultValue={reminder?.description || "Enter description"}
        {...register("description", { required: true })}
      />
      {errors.description && <span>This field is required</span>}

      <Controller
        name="color"
        defaultValue={reminder?.color || "#808080"}
        control={control}
        render={({ field: { onChange, value } }) => (
          <HexColorPicker color={value} onChange={onChange} />
        )}
      />

      <Controller
        name="time"
        defaultValue={reminder?.time.toJSDate() || new Date()}
        control={control}
        render={({ field: { onChange, value } }) => {
          return (
            <DatePicker selected={value} showTimeSelect onChange={onChange} />
          );
        }}
      />

      <input type="submit" />
    </form>
  );
}

export default ReminderForm;
