/* eslint-disable no-param-reassign */
import { NodeSpec, Schema } from "prosemirror-model";
import { Plugin } from "prosemirror-state";
import React from "react";

import BaseNode from "./BaseNode";
import Break from "./Break";
import Code from "./Code";
import Heading from "./Heading";
import ProseImage from "./Image/Image";
import Indent from "./Indent";
import { BulletList, UnorderedList } from "./List";
import Paragraph from "./Paragraph";
import SplitScreen from "./Split";

/**
 * paragraph를 가장 먼저 안 읽으면 화면 터짐
 */
const atomics = {
  paragraph: new Paragraph(),

  heading: new Heading(),
  break: new Break(),
  indent: new Indent(),
};

const molecules = {
  proseImage: new ProseImage({ paragraph: atomics.paragraph }),

  splitScreen: new SplitScreen({ paragraph: atomics.paragraph }),
  code: new Code({ paragraph: atomics.paragraph }),
  // codeMirror: new CodeMirror({ paragraph: atomics.paragraph }),

  BulletList: new BulletList({ paragraph: atomics.paragraph }),
};

const Organisms = {
  UnorderedList: new UnorderedList({
    paragraph: atomics.paragraph,
    bulletList: molecules.BulletList,
    indent: atomics.indent,
  }),
};

const NODE_REGISTER: BaseNode[] = [
  ...Object.values(atomics),
  ...Object.values(molecules),
  ...Object.values(Organisms),
].reverse();

class _NodeController {
  nodes = NODE_REGISTER;

  getPlugins(schema: Schema) {
    return this.nodes.flatMap((node) => {
      const type = schema.nodes[node.name];

      node.setMetadata({ type, schema });
      return node.plugins();
    });
  }

  getNodes() {
    return this.nodes.reduce((obj: { [key in string]: NodeSpec }, node) => {
      obj[node.name] = node.createSchema;
      return obj;
    }, {});
  }
}

const NodeController = new _NodeController();
export default NodeController;
