import { MouseSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core";

export const useTodolistBodyData = () => {
  const mouseSensor = useSensor(MouseSensor, { activationConstraint: { distance: 10 } });
  const touchSensor = useSensor(TouchSensor, { activationConstraint: { delay: 200, tolerance: 5 } });
  const sensors = useSensors(mouseSensor, touchSensor);

  return {sensors}
}