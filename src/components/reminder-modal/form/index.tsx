import React from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { HexColorPicker } from "react-colorful";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { IReminder } from "../../../domain/reminders/interfaces";
import { Container, SubmitButton } from "./styled-components";

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
      <Container>
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
      </Container>
      <SubmitButton purpose="primary" type="submit" value="Save" />
    </form>
  );
}

export default ReminderForm;
