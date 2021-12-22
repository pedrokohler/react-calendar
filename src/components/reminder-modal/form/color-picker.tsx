import React from "react";
import { Control, FormState, Controller } from "react-hook-form";
import { HexColorPicker } from "react-colorful";
import { IReminder } from "../../../domain/reminders/interfaces";
import { FormInputs } from ".";

function FormColorPicker({
  reminder,
  control,
  formState,
}: {
  reminder?: IReminder;
  control: Control<FormInputs, object>,
  formState: FormState<FormInputs>
}) {
  return (
    <div>
      <div>Color</div>
      <Controller
        name="color"
        rules={{ required: true }}
        defaultValue={reminder?.color || "#da2b2b"}
        control={control}
        render={({ field: { onChange, value } }) => (
          <HexColorPicker color={value} onChange={onChange} />
        )}
      />
    </div>
  );
}

export default FormColorPicker;
