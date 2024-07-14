import React from 'react';

const DropDown = () => {
  return (
    <div className='fixed z-10 right-[3vw] top-20 bg-slate-600 text-gray-800 p-2 rounded-md'>
        <button className="bg-brand-500 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:hover:bg-brand-300 dark:active:bg-brand-200 rounded-xl px-5 py-3 text-base font-medium text-white transition duration-200 dark:text-white">
          Dropdown Menu
        </button>
        <div className="flex h-max w-56 flex-col justify-start rounded-[20px] bg-white bg-cover bg-no-repeat pb-4 shadow-[0_20px_25px_-5px] shadow-shadow-500 dark:!bg-navy-700dark:shadow-none">
          <div className="mt-3 ml-4">
            <div className="flex items-center gap-2">
              <p className="text-sm font-bold text-navy-700">
                👋 Hey, Adela
              </p>{' '}
            </div>
          </div>
          <div className="mt-3 h-px w-full bg-gray-200  " />

          <div className="mt-3 ml-4 flex flex-col">
            <a
              href=" "
              className="text-sm text-gray-800"
            >
              Profile Settings
            </a>
            <a
              href=" "
              className="mt-3 text-sm text-gray-800"
            >
              Newsletter Settings
            </a>
            <a
              href=" "
              className="mt-3 text-sm font-medium text-red-500 hover:text-red-500"
            >
              Log Out
            </a>
          </div>
        </div>
    </div>
  );
};

export default DropDown;
