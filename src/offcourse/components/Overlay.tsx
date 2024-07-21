import type { CardState } from "../types";
import { OverlayModes } from "../types";
import type { CardActions } from "./CourseCard"

import { Transition } from "@headlessui/react"
import { CheckpointOverlay } from "./CheckpointOverlay";
import { InfoOverlay } from "./InfoOverlay";
import CardChrome from "./CardChrome";

export type OverlayProps = {
  courseId: string,
  cardState: CardState,
  actions: CardActions
}

export function Overlay(props: OverlayProps) {
  const overlayMode = props.cardState.overlayMode;
  const InternalOverlay = {
    [OverlayModes.NONE]: InfoOverlay,
    [OverlayModes.INFO]: InfoOverlay,
    [OverlayModes.CHECKPOINT]: CheckpointOverlay,
  }[overlayMode]

  return (
    <Transition
      as={CardChrome}
      show={overlayMode !== OverlayModes.NONE}
      enter="ease-out duration-200"
      enterFrom="translate-y-full opacity-80"
      enterTo="translate-y-0 z-10 opacity-100"
      leave="ease-out duration-100"
      leaveFrom="translate-y-0 opacity-60"
      leaveTo="translate-y-full opacity-0" >
      <InternalOverlay {...props} />
    </Transition>)
}
