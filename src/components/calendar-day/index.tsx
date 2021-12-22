import React from "react";
import { IReminder } from "../../domain/reminders";
import { Block, Reminder, Button } from "./styled-components";

function CalendarDay({
  children,
  reminders,
  onClick,
}: {
  children: React.ReactNode;
  reminders: IReminder[];
  onClick: (reminder: IReminder) => void;
}) {
  if (children === null) {
    return <Block>&nbsp;</Block>;
  }

  return (
    <Block className="active">
      <div>{children}</div>
      {reminders.map(reminder => {
        const hour = reminder.time.toFormat("HH:mm");
        return (
          <Reminder backgroundColor={reminder.color}>
            <Button onClick={() => onClick(reminder)}>
              {hour} - {reminder.description}
            </Button>
          </Reminder>)
      })}
    </Block>
  );
}

export default CalendarDay;
