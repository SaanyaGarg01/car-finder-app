// components/Loader.js
import React from 'react';

const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-black transition-all duration-500">
      <div className="loader">
        <div className="circle"></div>
        <div className="circle delay"></div>
        <div className="circle delay2"></div>
      </div>

      <style jsx>{`
        .loader {
          display: flex;
          gap: 8px;
        }

        .circle {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #6366f1;
          animation: bounce 0.6s infinite ease-in-out;
        }

        .circle.delay {
          animation-delay: 0.2s;
        }

        .circle.delay2 {
          animation-delay: 0.4s;
        }

        @keyframes bounce {
          0%, 80%, 100% {
            transform: scale(0);
          }
          40% {
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default Loader;
