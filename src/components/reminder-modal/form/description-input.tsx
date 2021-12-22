import React from "react";
import { FormState, UseFormRegister } from "react-hook-form";
import { FormInputs } from ".";
import { IReminder } from "../../../domain/reminders/interfaces";

function FormDescriptionInput({
  register,
  reminder,
  formState: { errors },
}: {
  register: UseFormRegister<FormInputs>;
  reminder?: IReminder;
  formState: FormState<FormInputs>;
}) {
  return (
    <div>
      <div>Description</div>
      <input
        defaultValue={reminder?.description || ""}
        {...register("description", {
          required: { value: true, message: "Description is required" },
          maxLength: {
            value: 30,
            message: "Description must be 30 characters max",
          },
        })}
      />
      {errors.description && <div>{errors.description.message}</div>}
    </div>
  );
}

export default FormDescriptionInput;
