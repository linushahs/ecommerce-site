import React, { Fragment, useEffect } from "react";

export interface OverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const Overlay: React.FC<OverlayProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
  }, [isOpen]);

  return (
    <Fragment>
      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-full z-50">
          <div
            className="bg-black/50 backdrop-blur-xl opacity-50 w-full h-full fixed top-0 left-0 cursor-pointer "
            onClick={onClose}
          />
        </div>
      )}
    </Fragment>
  );
};

export default Overlay;
