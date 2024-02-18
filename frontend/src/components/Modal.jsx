import { forwardRef, useImperativeHandle, useRef } from "react";

const Modal = forwardRef(function Modal({onProceed,text}, ref) {
  const dialog = useRef();

  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      },
    };
  });

  return (
    <dialog ref={dialog} className="p-12 rounded-lg shadow-2xl w-[600px] dark:bg-gray-800 dark:text-white">
      <h1 className="text-4xl text-cyan-500 dark:text-cyan-400 font-semibold">Are you sure?</h1>
      <p className="mt-4 text-slate-600 text-lg dark:text-white">{text}</p>
      <form method="dialog" className="text-right mt-5 space-x-6">
        <button className="text-lg bg-gray-700 border shadow-lg rounded-xl px-5 py-0.5 text-white hover:bg-gray-400 hover:scale-110 hover:duration-150 ">No</button>
        <button className="text-lg bg-red-700 border shadow-lg rounded-xl px-5 py-0.5 text-white hover:bg-red-500 hover:scale-110 hover:duration-150" onClick={onProceed}>Yes</button>
      </form>
    </dialog>
  );
});

export default Modal;
