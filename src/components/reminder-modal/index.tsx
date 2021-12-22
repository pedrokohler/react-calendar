import React, { Fragment, useCallback } from "react";
import { SubmitHandler } from "react-hook-form";
import { useDispatch } from "react-redux";
import { IReminder, RemindersActions } from "../../domain/reminders";
import ReminderForm, { FormInputs } from "./form";
import { ButtonContainer, Container, Button } from "./styled-components";

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

  const onDelete = useCallback(
    () => {
      if(reminder) {
        dispatch({ type: RemindersActions.DELETE, payload: reminder });
        onClose();
      }
    },
    [dispatch, onClose, reminder]
  );

  if (isHidden) {
    return <Fragment></Fragment>;
  }

  return (
    <Container>
      <ButtonContainer>
        {reminder && <Button purpose="danger" onClick={() => onDelete()}>Delete</Button>}
        <Button purpose="secondary" onClick={() => onClose()}>Close</Button>
      </ButtonContainer>
      <ReminderForm onSubmit={onSubmit} reminder={reminder}></ReminderForm>
    </Container>
  );
}

export default ReminderModal;
