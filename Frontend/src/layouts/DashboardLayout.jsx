import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";

function DashboardLayout({children}){
    return (
        <div className="min-h-screen flex bg-slate-100">
            <Sidebar/>
   

        <div className="flex-1 flex flex-col">
        <Topbar/>

        <main className="p-6">
            {children}
        </main>
        </div>
        </div>


       
    );
}

export default DashboardLayout;