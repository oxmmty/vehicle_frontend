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
    <div className="bg-bg-light min-h-screen grid grid-rows-[64px_1fr_auto] grid-cols-1 xl:grid-cols-[auto_minmax(0,1fr)] grid-areas-layout"> {/* 2xl:grid-cols-[auto_minmax(0,1fr)_200px] */}
      <Processbar />
      <Header className="sticky top-0 backdrop-blur-md z-50 border-b border-border-100 xl:col-span-2 2xl:col-span-3 grid-in-head" />
      <Sidebar className="bg-bg-dark hidden xl:inline row-span-2 overflow-auto sticky top-[64px] max-h-[calc(100vh-64px)] box-border grid-in-sidebar pr-[10px]" />
      <div className='bg-bg-dark'>
        <Main className="z-10 ml-[14px] mr-6 flex flex-col grid-in-main pt-4" />
      </div>
      <Footer className="xl:col-start-2 xl:col-span-1 2xl:col-span-2 2xl:col-start-2 text-center text-txt-100 grid-in-footer bg-bg-dark" />
    </div>
  )
}

export default App