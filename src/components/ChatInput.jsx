// import React, { useRef } from 'react';
// import { FiPlus, FiMic } from 'react-icons/fi';
// import { FaSearch, FaPaintBrush, FaImage } from 'react-icons/fa';

// export default function ChatInput({ onSend }) {
//   const fileInputRef = useRef(null);

//   const handleFileClick = () => {
//     fileInputRef.current.click();
//   };

//   return (
//     <div className="w-full rounded-[2rem] border border-gray-300 dark:border-gray-700 px-6 py-4 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-100 shadow-sm">
//       {/* Hidden file input */}
//       <input
//         type="file"
//         ref={fileInputRef}
//         className="hidden"
//         onChange={(e) => {
//           const file = e.target.files[0];
//           if (file && onSend) onSend('', file); // Send file
//         }}
//       />

//       {/* Input text */}
//       <input
//         type="text"
//         placeholder="Ask Gemini"
//         className="w-full bg-transparent focus:outline-none text-base mb-4"
//         onKeyDown={(e) => {
//           if (e.key === 'Enter' && onSend) {
//             onSend(e.target.value, null);
//             e.target.value = '';
//           }
//         }}
//       />

//       {/* Options + Mic */}
//       <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-300">
//         <div className="flex items-center gap-6">
//           <button onClick={handleFileClick}>
//             <FiPlus className="cursor-pointer text-lg" />
//           </button>
//           <button className="flex items-center gap-1 cursor-pointer">
//             <FaSearch /> Deep Research
//           </button>
//           <button className="flex items-center gap-1 cursor-pointer">
//             <FaPaintBrush /> Canvas
//           </button>
//           <button className="flex items-center gap-1 cursor-pointer">
//             <FaImage /> Image
//           </button>
//         </div>
//         <FiMic className="cursor-pointer text-lg" />
//       </div>
//     </div>
//   );
// }


import React, { useRef } from 'react';
import { FiPlus, FiMic } from 'react-icons/fi';
import { FaSearch, FaPaintBrush, FaImage } from 'react-icons/fa';

export default function ChatInput({ onSend }) {
  const fileInputRef = useRef(null);

  const handleFileClick = () => {
    fileInputRef.current.click();
  };

  const toBase64 = file =>
    new Promise((res, rej) => {
      const reader = new FileReader();
      reader.onload = () => res(reader.result);
      reader.onerror = rej;
      reader.readAsDataURL(file);
    });

  return (
    <div className="w-full rounded-[2rem] border border-gray-300 dark:border-gray-700 px-6 py-4 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-100 shadow-sm">
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={async (e) => {
          const file = e.target.files[0];
          if (file && onSend) {
            const b64 = await toBase64(file);
            onSend('', b64);
          }
        }}
      />

      <input
        type="text"
        placeholder="Ask Gemini"
        className="w-full bg-transparent focus:outline-none text-base mb-4"
        onKeyDown={(e) => {
          if (e.key === 'Enter' && onSend) {
            onSend(e.target.value, null);
            e.target.value = '';
          }
        }}
      />

      <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-300">
        <div className="flex items-center gap-6">
          <button onClick={handleFileClick}>
            <FiPlus className="cursor-pointer text-lg" />
          </button>
          <button className="flex items-center gap-1 cursor-pointer">
            <FaSearch /> Deep Research
          </button>
          <button className="flex items-center gap-1 cursor-pointer">
            <FaPaintBrush /> Canvas
          </button>
          <button className="flex items-center gap-1 cursor-pointer">
            <FaImage /> Image
          </button>
        </div>
        <FiMic className="cursor-pointer text-lg" />
      </div>
    </div>
  );
}
