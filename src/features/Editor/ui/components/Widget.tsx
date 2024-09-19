import { Plugin } from "prosemirror-state";
import { EditorView } from "prosemirror-view";
import { EditorReduxLocalStore } from "../../models";

let id = 0;

const generateID = () => {
  id += 1;
  return id;
};

export default abstract class Widget {
  key = generateID();
  store: typeof EditorReduxLocalStore;

  constructor() {
    this.store = EditorReduxLocalStore;
  }

  public abstract render(): JSX.Element;

  public plugin(): Plugin[] {
    return [];
  }
}
