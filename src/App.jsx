import { Outlet } from "react-router-dom";
import Header from 'src/components/Header';
import Menu from 'src/components/Menu';
import Footer from 'src/components/Footer';
import 'src/components/Notification'
import { axiosSetting } from 'src/components/AxiosSetting'

axiosSetting();

function App() {
  return (
    <div className="App flex flex-col h-screen overflow-hidden">
      <div className="flex-none h-[60px]">
        <Header />
      </div>
      <div className="bg-base-300 flex-1 p-3 overflow-y-auto rounded-md">
        <div className="flex justify-center items-center xl:w-[80%] overflow-y-auto bg-base-100 m-auto p-2 xl:p-4">
          <Outlet />
        </div>
      </div>
      <div className="flex-none h-[80px]">
        <Footer />
      </div>
    </div>
  )
}

export default App
