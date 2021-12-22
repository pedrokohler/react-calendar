import React, { Fragment, useCallback } from 'react';
import { SubmitHandler } from "react-hook-form";
import { useDispatch } from 'react-redux';
import { RemindersActions } from "../../../domain/reminders";
import ReminderForm, { FormInputs } from '../form';
import { Container } from './styled-components';

function ReminderModal({ isHidden, onClose }: { isHidden?: boolean, onClose: Function }) {
  const dispatch = useDispatch();

  const onSubmit = useCallback<SubmitHandler<FormInputs>>((data) => {
    dispatch({ type: RemindersActions.CREATE , payload: data });
    onClose();
  }, [dispatch, onClose]);

  if(isHidden){
    return <Fragment></Fragment>;
  }

  return (
    <Container>
      <ReminderForm onSubmit={onSubmit}></ReminderForm>
      <button onClick={() => onClose()}>Close</button>
    </Container>
  )
}

export default ReminderModal;
