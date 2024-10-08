import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Canvas from './components/Canvas';
import LeftPanel from './components/LeftPanel';
import RightPanel from './components/RightPanel';
import './App.css';

function App() {
  const [selectedElement, setSelectedElement] = useState(null);
  const [elements, setElements] = useState([]);

  const addElement = (type) => {
    const newElement = {
      id: elements.length + 1,
      type,
      content: type === 'text' ? 'Your text here' : '',
      styles: {
        backgroundColor: '#ffffff',
        color: '#000000',
        borderRadius: '0px',
      },
    };
    setElements([...elements, newElement]);
  };

  const updateElementContent = (id, newContent) => {
    const updatedElements = elements.map((el) =>
      el.id === id ? { ...el, content: newContent } : el
    );
    setElements(updatedElements);
  };

  const updateElementStyle = (id, newStyles) => {
    const updatedElements = elements.map(el =>
      el.id === id ? { ...el, styles: { ...el.styles, ...newStyles } } : el
    );
    setElements(updatedElements);
  };

  const deleteElement = (id) => {
    setElements(elements.filter(el => el.id !== id));
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="app-container">
        <LeftPanel addElement={addElement} />
        <Canvas elements={elements} setSelectedElement={setSelectedElement} setElements={setElements} />
        <RightPanel
          selectedElement={selectedElement}
          updateElementContent={updateElementContent}
          updateElementStyle={updateElementStyle}
          deleteElement={deleteElement}
        />
      </div>
    </DndProvider>
  );
}

export default App;