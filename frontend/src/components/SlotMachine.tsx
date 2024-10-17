import React, { useState } from 'react';
import './SlotMachine.css';
import slot1 from '../assets/slot1.png';
import slot2 from '../assets/slot2.png';
import slot3 from '../assets/slot3.png';

const slotImages = [slot1, slot2, slot3];

const getRandomIndex = () => Math.floor(Math.random() * slotImages.length);

const SlotMachine: React.FC<{ onWin: () => void }> = ({ onWin }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [reels, setReels] = useState([0, 0, 0]);

  const spin = () => {
    setIsSpinning(true);

    const newReels = [getRandomIndex(), getRandomIndex(), getRandomIndex()];

    // Spin each reel with a slight delay
    setTimeout(() => setReels([newReels[0], reels[1], reels[2]]),200);
    setTimeout(() => setReels([newReels[0], newReels[1], reels[2]]), 400);
    setTimeout(() => {
      setReels(newReels);
      setIsSpinning(false);

      if (newReels[0] === newReels[1] 
        && newReels[1] === newReels[2]) {
        onWin(); // Trigger win if all reels match
      }
    },600);
  };

  return (
    <div className="slot-machine">
      <div className="reels-container">
        {reels.map((reel, index) => (
          <div key={index} className="reel">
            <div
              className={`reel-images ${isSpinning ? 'spinning' : ''}`}
              style={{ transform: `translateY(-${reel * 100}px)` }}
            >
              {slotImages.map((image, i) => (
                <img key={i} src={image} alt="slot" className="slot-image" />
              ))}
            </div>
          </div>
        ))}
      </div>
      <button className="spin-button" onClick={spin} disabled={isSpinning}>
        {isSpinning ? 'Spinning...' : 'Spin'}
      </button>
    </div>
  );
};

export default SlotMachine;
