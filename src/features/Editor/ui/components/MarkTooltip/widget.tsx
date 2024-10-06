import { Plugin, PluginKey } from "prosemirror-state";
import React from "react";

import Widget from "../Widget";
import { OPEN_EDITOR_MARK_TOOLTIP, RESET_EDITOR_MARK_TOOLTIP } from "./model";
import { EditorMarkTooltip } from "./ui";
import { MARGIN_LEFT_EDITOR } from "@/features/Editor/constants";
import { debounce } from "lodash-es";

const DIRECTION_UP = "up";
const DIRECTION_DOWN = "down";

export default class EditorMarkTooltipWidget extends Widget {
  render() {
    return <EditorMarkTooltip />;
  }

  plugin() {
    const widgetInstance = this;
    let initialSelection: { from: number; to: number } | null = null;

    return [
      new Plugin({
        key: new PluginKey("selection-change"),
        view: (view) => {
          return {
            update: (view, prevState) => {
              const { state } = view;
              if (!prevState) {
                prevState = state;
              }
              const prevSelection = prevState.selection;
              const newSelection = state.selection;

              if (!prevSelection.eq(newSelection)) {
                // Selection has changed
                const { from, to } = newSelection;

                if (from !== to) {
                  if (!initialSelection) {
                    initialSelection = { from, to };
                  }

                  const direction = from < initialSelection.from ? DIRECTION_UP : DIRECTION_DOWN;

                  let yCoords;

                  switch (direction) {
                    case DIRECTION_UP:
                      const startCoords = view.coordsAtPos(Math.min(from, initialSelection.from));
                      yCoords = startCoords.top - 85;
                      break;
                    case DIRECTION_DOWN:
                    default:
                      const endCoords = view.coordsAtPos(Math.max(to, initialSelection.to));
                      yCoords = endCoords.bottom - 85;
                  }

                  // Dispatch an action with the coordinates of the selection
                  widgetInstance.debouncedDispatch(
                    OPEN_EDITOR_MARK_TOOLTIP({
                      x: MARGIN_LEFT_EDITOR,
                      y: yCoords,
                    })
                  );
                } else {
                  initialSelection = null;
                  widgetInstance.debouncedDispatch(RESET_EDITOR_MARK_TOOLTIP());
                }
              }
            },
          };
        },
      }),
    ];
  }
}
