import React from "react";

const SendMoney = () => {
  return (
    <div className="flex justify-center h-screen bg-gray-100">
      <div className="h-full flex flex-col justify-center">
        <div className="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg">
          <div className="flex flex-col space-y-1.5 p-6">
            <h2 className="text-3xl font-bold text-center">Send Money</h2>
          </div>

          <div className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                <span className="text-2xl text-white">A</span>
              </div>

              <h3 className="text-2xl font-semibold">Atharva</h3>
            </div>

            <div className="space-y-4 mt-6">
              <div className="space-y-2">
                <label
                  className="text-sm font-medium leading-none"
                  htmlFor="amount"
                >
                  Amount (in Rs)
                </label>

                <input
                  type="number"
                  id="amount"
                  className="flex h-10 w-full rounded-md border px-3 py-2 text-sm"
                  placeholder="Enter amount"
                />
              </div>

              <button className="w-full rounded-md bg-green-500 text-white h-10 hover:bg-green-600">
                Initiate Transfer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendMoney;
