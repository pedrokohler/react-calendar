import React, { Fragment, useCallback } from "react";
import { SubmitHandler } from "react-hook-form";
import { useDispatch } from "react-redux";
import { IReminder, RemindersActions } from "../../../domain/reminders";
import ReminderForm, { FormInputs } from "../form";
import { Container } from "./styled-components";

function ReminderModal({
  isHidden,
  onClose,
  reminder,
}: {
  isHidden?: boolean;
  onClose: Function;
  reminder?: IReminder;
}) {
  const dispatch = useDispatch();

  const onSubmit = useCallback<SubmitHandler<FormInputs>>(
    (data) => {
      if (reminder) {
        dispatch({
          type: RemindersActions.UPDATE,
          payload: {
            newReminder: data,
            oldReminder: reminder,
          },
        });
      } else {
        dispatch({ type: RemindersActions.CREATE, payload: data });
      }

      onClose();
    },
    [dispatch, onClose, reminder]
  );

  if (isHidden) {
    return <Fragment></Fragment>;
  }

  return (
    <Container>
      <ReminderForm onSubmit={onSubmit} reminder={reminder}></ReminderForm>
      <button onClick={() => onClose()}>Close</button>
    </Container>
  );
}

export default ReminderModal;
