import React, { useState, useEffect } from 'react';
import { ChromePicker } from 'react-color';

function RightPanel({ selectedElement, updateElementContent, updateElementStyle, deleteElement }) {
  const [content, setContent] = useState('');
  const [isPanelOpen, setIsPanelOpen] = useState(false); 

  useEffect(() => {
    if (selectedElement) {
      setContent(selectedElement.content);
    }
  }, [selectedElement]);

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleUpdateClick = () => {
    if (selectedElement) {
      updateElementContent(selectedElement.id, content);
    }
  };

  const handleBackgroundColorChange = (color) => {
    if (selectedElement) {
      updateElementStyle(selectedElement.id, { backgroundColor: color.hex });
    }
  };

  const handleTextColorChange = (color) => {
    if (selectedElement) {
      updateElementStyle(selectedElement.id, { color: color.hex });
    }
  };

  const handleFontSizeChange = (e) => {
    if (selectedElement) {
      updateElementStyle(selectedElement.id, { fontSize: `${e.target.value}px` });
    }
  };

  const handleFontFamilyChange = (e) => {
    if (selectedElement) {
      updateElementStyle(selectedElement.id, { fontFamily: e.target.value });
    }
  };

  const togglePanel = () => {
    setIsPanelOpen(!isPanelOpen); 
  };

  return (
    <>
     
      <button className="toggle-btn" onClick={togglePanel}>
        {isPanelOpen ? 'Open Panel' : 'Open Panel'}
      </button>

 
      <div className={`right-panel ${isPanelOpen ? 'open' : 'closed'}`}>
        <div className="close-arrow" onClick={togglePanel}>
          &larr; 
        </div>
        {selectedElement ? (
          <>
            <div className="section">
              <label>Edit Text:</label>
              <textarea
                value={content}
                onChange={handleContentChange}
                rows="4"
                style={{ width: '100%' }}
                className="text-input"
              />
              <button onClick={handleUpdateClick} className="update-btn">
                Update Content
              </button>
            </div>

            <div className="section">
              <label>Background Color:</label>
              <ChromePicker
                color={selectedElement.styles.backgroundColor}
                onChange={handleBackgroundColorChange}
              />
            </div>

            <div className="section">
              <label>Text Color:</label>
              <ChromePicker
                color={selectedElement.styles.color}
                onChange={handleTextColorChange}
              />
            </div>

            <div className="section">
              <label>Font Size:</label>
              <input
                type="number"
                min="8"
                max="72"
                value={parseInt(selectedElement.styles.fontSize || 16)}
                onChange={handleFontSizeChange}
                className="number-input"
              />
            </div>

            <div className="section">
              <label>Font Family:</label>
              <select
                value={selectedElement.styles.fontFamily || 'Arial'}
                onChange={handleFontFamilyChange}
                className="select-input"
              >
                <option value="Arial">Arial</option>
                <option value="Times New Roman">Times New Roman</option>
                <option value="Courier New">Courier New</option>
                <option value="Verdana">Verdana</option>
              </select>
            </div>

            <div className="section">
              <button onClick={() => deleteElement(selectedElement.id)} className="delete-btn">
                Delete Element
              </button>
            </div>
          </>
        ) : (
          <div className="no-selection">
            <p>Select an element to customize.</p>
          </div>
        )}
      </div>
    </>
  );
}

export default RightPanel;