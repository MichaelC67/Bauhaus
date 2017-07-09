import React from 'react';
import { EditorState } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import EditorHtml from 'js/components/shared/editor-html';

//TODO in the previous version, we used `stateToHTML(note.getCurrentContent()) !== '<p>undefined</p>'`
// see if it is still necessary.
function ConceptModifyNotes({ note, onChange }) {
  if (stateToHTML(note.getCurrentContent()) !== '<p>undefined</p>') {
    return <EditorHtml editor={note} onEditorChange={onChange} />;
  } else {
    return (
      <EditorHtml
        editor={EditorState.createEmpty()}
        onEditorChange={onChange}
      />
    );
  }
}

export default ConceptModifyNotes;
