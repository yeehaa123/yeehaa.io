import type { CourseCardState } from "./CourseCard"
import { Transition } from "@headlessui/react"
import { CheckpointOverlay } from "./CheckpointOverlay";
import { NoneOverlay } from "./NoneOverlay";
import { NotesOverlay } from "./NotesOverlay";
import { InfoOverlay } from "./InfoOverlay";
import CardChrome from "./CardChrome";

export enum OverlayModes {
  NONE = "NONE",
  INFO = "INFO",
  CHECKPOINT = "CHECKPOINT",
  NOTES = "NOTES"
}

export function Overlay(props: CourseCardState) {
  const overlayMode = props.cardState.overlayMode;
  const InternalOverlay = {
    [OverlayModes.NONE]: NoneOverlay,
    [OverlayModes.NOTES]: NotesOverlay,
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
      leaveFrom="translate-y-0 opacity-100"
      leaveTo="translate-y-full opacity-0" >
      <InternalOverlay {...props} />
    </Transition>)
}
