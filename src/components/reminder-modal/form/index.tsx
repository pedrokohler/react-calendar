import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { IReminder } from "../../../domain/reminders/interfaces";
import { Container, SubmitButton } from "./styled-components";
import FormColorPicker from "./color-picker";
import FormDatePicker from "./date-picker";
import FormDescriptionInput from "./description-input";

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
    formState,
  } = useForm<FormInputs>();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Container>
        <FormDescriptionInput formState={formState} register={register} reminder={reminder}></FormDescriptionInput>
        <FormDatePicker control={control} reminder={reminder} formState={formState}></FormDatePicker>
        <FormColorPicker control={control} reminder={reminder} formState={formState}></FormColorPicker>
      </Container>
      <SubmitButton purpose="primary" type="submit" value="Save" />
    </form>
  );
}

export default ReminderForm;
