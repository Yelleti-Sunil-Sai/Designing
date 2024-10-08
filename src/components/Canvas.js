// Canvas.js
import React, { useEffect } from 'react';
import './Canvas.css'; 

let highestZ = 1;

class Paper {
  holdingPaper = false;
  mouseTouchX = 0;
  mouseTouchY = 0;
  mouseX = 0;
  mouseY = 0;
  prevMouseX = 0;
  prevMouseY = 0;
  currentPaperX = 0;
  currentPaperY = 0;

  init(paper, canvasElement) {
    document.addEventListener('mousemove', (e) => {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;

      if (this.holdingPaper) {
        
        this.currentPaperX += this.mouseX - this.prevMouseX;
        this.currentPaperY += this.mouseY - this.prevMouseY;

 
        const canvasRect = canvasElement.getBoundingClientRect();
        const paperRect = paper.getBoundingClientRect();

        if (this.currentPaperX < 0) this.currentPaperX = 0;
        if (this.currentPaperY < 0) this.currentPaperY = 0;
        if (this.currentPaperX + paperRect.width > canvasRect.width) {
          this.currentPaperX = canvasRect.width - paperRect.width;
        }
        if (this.currentPaperY + paperRect.height > canvasRect.height) {
          this.currentPaperY = canvasRect.height - paperRect.height;
        }

       
        paper.style.transform = `translateX(${this.currentPaperX}px) translateY(${this.currentPaperY}px)`;
      }

      this.prevMouseX = this.mouseX;
      this.prevMouseY = this.mouseY;
    });

    paper.addEventListener('mousedown', (e) => {
      if (this.holdingPaper) return; 
      this.holdingPaper = true;

      paper.style.zIndex = highestZ;
      highestZ += 1;

      this.mouseTouchX = this.mouseX;
      this.mouseTouchY = this.mouseY;
      this.prevMouseX = this.mouseX;
      this.prevMouseY = this.mouseY;
    });

    window.addEventListener('mouseup', () => {
      this.holdingPaper = false;
    });
  }
}

function Canvas({ elements, setSelectedElement }) {
  const handleElementClick = (element) => {
    setSelectedElement(element);
  };

  useEffect(() => {
    const papers = Array.from(document.querySelectorAll('.paper'));
    const canvasElement = document.querySelector('.canvas'); 

    papers.forEach((paper) => {
      const p = new Paper();
      p.init(paper, canvasElement); 
    });
  }, [elements]);


  const handleMouseLeave = () => {
    
    const papers = Array.from(document.querySelectorAll('.paper'));
    papers.forEach((paper) => {
      const p = new Paper();
      p.holdingPaper = false; 
    });
  };

  return (
    <div className="canvas" onMouseLeave={handleMouseLeave}>
      {elements.map((element) => (
        <div
          key={element.id}
          className="paper" 
          style={{
            width: element.styles.width || 100,
            height: element.styles.height || 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: element.styles.fontSize || '16px',
            color: element.styles.color || '#000000',
            fontFamily: element.styles.fontFamily || 'Arial',
            backgroundColor: element.styles.backgroundColor || 'transparent',
            position: 'absolute', 
            cursor: 'move', 
          }}
          onClick={() => handleElementClick(element)}
        >
          {element.content}
        </div>
      ))}
    </div>
  );
}

export default Canvas;