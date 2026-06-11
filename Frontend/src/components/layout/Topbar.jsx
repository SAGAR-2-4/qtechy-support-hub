import { useSelector } from "react-redux";

function Topbar(){
    const {user} = useSelector((state) => state.auth);

    return (
        <header className="h-16 bg-white border-b flex items-center justify-between px-6">
            <h2 className="font-semibold text-slate-800">
                Welcome Back
            </h2>

            <div className="text-right">
                <p className="font-medium">{user?.name}</p>
                <p className="text-sm text-slate-500 capitalize">
                    {user?.role}
                </p>
            </div>
        </header>
    );
}

export default Topbar;