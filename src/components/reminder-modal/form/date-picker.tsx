import React from "react";
import { Control, FormState, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { IReminder } from "../../../domain/reminders/interfaces";
import { FormInputs } from ".";

function FormDatePicker({
  reminder,
  control,
  formState: { errors },
}: {
  reminder?: IReminder;
  control: Control<FormInputs, object>;
  formState: FormState<FormInputs>;
}) {
  return (
    <div>
      <div>Time</div>
      <Controller
        name="time"
        rules={{
          required: {
            value: true,
            message: "Time is required",
          },
        }}
        defaultValue={reminder?.time.toJSDate() || new Date()}
        control={control}
        render={({ field: { onChange, value } }) => {
          return (
            <div>
              <DatePicker
                selected={value}
                showTimeSelect
                onChange={onChange}
              />
              {errors.time && <div>{errors.time.message}</div>}
            </div>
          );
        }}
      />
    </div>
  );
}

export default FormDatePicker;
