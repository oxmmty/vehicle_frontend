import Header from 'src/components/Header';
import Menu from 'src/components/Menu';
import Footer from 'src/components/Footer';
import 'src/components/Notification'
import { axiosSetting } from 'src/components/AxiosSetting'
import Sidebar from "./components/Sidebar";
import Toc from "./components/Toc";
import Main from "./components/Main";
import { Processbar } from 'src/components/Processbar'
import 'nprogress/nprogress.css';

axiosSetting();

function App() {
  return (
    <div className="bg-base-100 min-h-screen grid grid-rows-[64px_1fr_auto] grid-cols-1 xl:grid-cols-[auto_1fr] 2xl:grid-cols-[auto_1fr_200px] grid-areas-layout">
      <Processbar />
      <Header className="sticky top-0 backdrop-blur-md z-50 border-b border-border-100 xl:col-span-2 2xl:col-span-3 grid-in-head" />
      <Sidebar className="bg-base-400 hidden xl:inline row-span-2 overflow-auto sticky top-[64px] max-h-[calc(100vh-64px)] box-border grid-in-sidebar pr-[10px]" />
      <div className='bg-base-400'>
        <Main className="z-10 ml-[14px] mr-6 flex flex-col grid-in-main pt-4" />
        </div>
      <div className='bg-base-400'>
        <Toc className="hidden 2xl:block sticky top-[100px] w-[176px] max-h-[80vh] pt-12 z-10 overflow-auto overscroll-contain grid-in-toc" />
      </div>
      <Footer className="xl:col-start-2 xl:col-span-1 2xl:col-span-2 2xl:col-start-2 text-center text-text-100 grid-in-footer bg-base-400" />
    </div>
  )
}

export default App