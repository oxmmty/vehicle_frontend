import Header from 'src/components/Header';
import Menu from 'src/components/Menu';
import Footer from 'src/components/Footer';
import 'src/components/Notification'
import { axiosSetting } from 'src/components/AxiosSetting'
import Sidebar from "./components/Sidebar";
import Toc from "./components/Toc";
import Main from "./components/Main";

axiosSetting();

function App() {
  return (
    <div className="bg-base-100 min-h-screen grid grid-rows-[64px_1fr_auto] grid-cols-1 xl:grid-cols-[auto_1fr] 2xl:grid-cols-[auto_1fr_200px] grid-areas-layout">
      <Header className="sticky top-0 backdrop-blur-md z-[950] border-b border-border-100 xl:col-span-2 2xl:col-span-3 grid-in-head" />
      <Sidebar className="hidden xl:block overflow-auto sticky top-16 max-h-[calc(100vh-64px)] box-border p-1 border-r border-border-100 grid-in-sidebar" />
      <Main className="z-10 m-6 flex flex-col bg-base-300 grid-in-main p-1 sm:p-2"/>
      <Toc className="hidden 2xl:block sticky top-[100px] w-[176px] max-h-[80vh] mt-12 z-10 overflow-auto overscroll-contain grid-in-toc" />
      <Footer className="xl:col-start-2 xl:col-span-1 2xl:col-span-2 2xl:col-start-2 border-t border-border-100 text-center text-text-100 grid-in-footer" />
    </div>
  )
}

export default App