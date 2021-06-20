import { useState } from 'react';

const Tabs = ({ tabs }: {
  tabs: { title: string, content: JSX.Element }[]
}): JSX.Element => {
  const [openTab, setOpenTab] = useState(0);
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full">
          <ul
            className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
            role="tablist"
          >
            {tabs.map((tab, i) => (
              <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                <a
                  className={
                `text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal ${
                  openTab === i
                    ? 'text-white bg-gray-700'
                    : 'text-gray-400 bg-gray-800'}`
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenTab(i);
                  }}
                  data-toggle="tab"
                  href={`#link${i}`}
                  role="tablist"
                  key={`tab${i}`}
                >
                  {tab.title}
                </a>
              </li>
            ))}
          </ul>
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 dark:text-white">
            <div className="px-4 py-5 flex-auto">
              <div className="tab-content tab-space">
                {tabs.map((tab, i) => (
                  <div className={openTab === i ? 'block' : 'hidden'} id={`link${i}`} key={`tab${i}`}>
                    {tab.content}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Tabs;
