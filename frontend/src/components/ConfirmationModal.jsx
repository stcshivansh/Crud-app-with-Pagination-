import React from 'react';

const ConfirmationModal = ({ setConfirm, deleteHandler,
  filterHandler,setCheck }) => {

  return (
    <div className="fixed inset-0  flex justify-center items-center z-50 min-w-full min-h-full" style={
      {backgroundColor: "rgba(0, 0, 0, 0.8)"}
    }>
      <div className=" bg-cyan-900 border-white w-96 h-44 rounded-lg flex flex-col justify-center items-center gap-6 p-6 shadow-lg">
        <h2 className="text-white text-xl font-semibold">Are you sure?</h2>
        <div className="flex gap-6">
          <button
            onClick={deleteHandler||filterHandler}
            className="px-6 py-2 bg-green-600 rounded-md text-white hover:bg-green-700 transition"
          >
            Yes
          </button>
          <button
            onClick={() =>setConfirm?  setConfirm(false) : setCheck(false)}
            className="px-6 py-2 bg-red-600 rounded-md text-white hover:bg-red-700 transition"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
