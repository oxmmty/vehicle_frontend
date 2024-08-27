import Header from 'src/components/Header';
import 'src/components/Notification'
import { axiosSetting } from 'src/components/AxiosSetting'
import Sidebar from "./components/Sidebar";
import Main from "./components/Main";
import { Processbar } from 'src/components/Processbar'
import 'nprogress/nprogress.css';

axiosSetting();

function App() {
  return (
    <div className="bg-bg-light min-h-screen grid grid-rows-[64px_1fr] grid-cols-1 xl:grid-cols-[250px_minmax(0,1fr)] grid-areas-layout">
      <Processbar />
      <Header className="bg-bg-header sticky top-0 backdrop-blur-md z-50 border-b border-colorPrimary xl:col-span-2 2xl:col-span-3 grid-in-head flex justify-end items-center pr-5" />
      <Sidebar className="hidden xl:inline row-span-2 overflow-auto sticky top-[64px] max-h-[calc(100vh-64px)] box-border grid-in-sidebar w-full" />
      <Main className="z-10 ml-[14px] mr-6 flex flex-col grid-in-main pt-4" />
    </div>
  )
}

export default App