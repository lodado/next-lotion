import React from "react";

import EditorDropdownWidget from "./Dropdown/widget";
import DragButtonWidget from "./DragButton/widget";
import BlockCreateButtonWidget from "./BlockCreateButton/widget";
import { EditorReduxStore } from "../../models";

export default class WidgetController {
  widgets = [new DragButtonWidget(), new BlockCreateButtonWidget()];

  constructor(store: typeof EditorReduxStore) {
    this.widgets.forEach((widget) => {
      widget.setStore(store);
    });
  }

  getPlugins() {
    return this.widgets.flatMap((widget) => widget.plugin());
  }

  Widgets = () => {
    return (
      <>
        {this.widgets.map((widget) => {
          return <widget.render key={widget.key} />;
        })}
      </>
    );
  };
} 
