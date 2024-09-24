import { ResolvedPos } from 'prosemirror-model'
import { EditorView } from 'prosemirror-view'
import React from 'react'

/**
 * Calculates the actual coordinates of a given position in the editor view.
 *
 * @param {Object} options - The options object.
 * @param {EditorView} options.view - The editor view.
 * @param {number} options.pos - The position in the editor.
 * @returns {Object} - The actual coordinates of the position.
 */
export const getActualCoord = ({ view, pos }: { view: EditorView; pos: number }) => {
  const coords = view.coordsAtPos(pos)
  const actualCoords = {
    left: coords.left + window.scrollX,
    top: coords.top + window.scrollY,
    right: coords.right + window.scrollX,
    bottom: coords.bottom + window.scrollY,
  }

  return actualCoords
}

export const getNodeRelativeCoord = ({ view, pos }: { view: EditorView; pos: number }) => {
  const $pos = view.state.doc.resolve(pos);

  const coords = view.coordsAtPos(pos);
  const domNode = view.nodeDOM($pos.start());

  if (!(domNode instanceof HTMLElement)) return null;

  const domNodeRect = domNode.getBoundingClientRect();
  const editorRect = view.dom.getBoundingClientRect();

  const relativeLeft = domNodeRect.left + window.scrollX - editorRect.left;
  const relativeTop = domNodeRect.top + window.scrollY - editorRect.top;

  return { left: relativeLeft, top: relativeTop };
};
