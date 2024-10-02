import { DOMParser, Node, Schema } from 'prosemirror-model'
import { EditorState } from 'prosemirror-state'

import { createPlugin } from './plugins/plugin'
import { createSchema } from './schema/schema'
import { WidgetController } from "../../ui/components";

export const createState = ({
  widgetController,
  getDoc,
  schema,
}: {
  widgetController: WidgetController;
  getDoc: (schemaObject: Schema) => Node;
  schema?: Schema;
}) => {
  const schemaData = schema ?? createSchema();

  return EditorState.create({
    doc: getDoc(schemaData),
    plugins: createPlugin(schemaData, widgetController),
    schema: schemaData,
  });
};
