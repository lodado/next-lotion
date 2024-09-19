import { Plugin } from "prosemirror-state";
import { EditorView } from "prosemirror-view";
import { EditorReduxLocalStore } from "../../models";

let id = 0;

const generateID = () => {
  id += 1;
  return id;
};

/** FSD의 widget layer가 아니라 GUI Widget을 뜻함 */
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
