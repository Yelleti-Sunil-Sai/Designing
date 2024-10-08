import React from 'react';

function LeftPanel({ addElement }) {
  return (
    <div className="left-panel">
      <h3>Elements</h3>
      <button onClick={() => addElement('box')}>Add Box</button>
      <button onClick={() => addElement('text')}>Add Text</button>
    </div>
  );
}

export default LeftPanel;
