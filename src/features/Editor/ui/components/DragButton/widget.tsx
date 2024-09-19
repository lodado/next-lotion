import { Plugin, PluginKey } from "prosemirror-state";
import React, { PropsWithChildren, useState } from "react";
import Widget from "../Widget";
import DragButtonStore, { closeTrigger, openTrigger } from "./model";
import { DragButton } from "./ui";
import { getActualCoord } from "@/features/Editor/utils";

export default class DragButtonWidget extends Widget {
  render() {
    return <DragButton />;
  }

  plugin() {
    return [
      new Plugin({
        key: new PluginKey("dragButton"),
        props: {
          handleDOMEvents: {
            mouseover: (view, event) => {
              const { target } = event;

              // @ts-ignore
              const pos = view.posAtDOM(target, 0);
              const { doc, schema } = view.state;
              const $pos = doc.resolve(pos);
              const node = $pos.parent;

              const actualCoords = getActualCoord({ view, pos });

              if (node && node.type.name !== "doc") {
                // Adjust this condition as needed
                this.store.dispatch(openTrigger({ x: actualCoords.left, y: actualCoords.bottom - 20, pos: $pos }));
              } else {
                this.store.dispatch(closeTrigger());
              }

              return false;
            },
          },
        },
      }),
    ];
  }
}
