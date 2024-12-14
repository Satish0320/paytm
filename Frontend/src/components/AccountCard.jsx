import { getUser } from "../hooks/getUser"

export const AccountCard = () =>{

    const user = getUser()

    return <div>
        <div className="rounded-xl bg-slate-700 shadow-xl w-80 max-w-96 pl-5 py-5 flex flex-col gap-4">
            <div className="flex flex-col gap-1">
                <h2 className="text-2xl text-white font-semibold">Balance:</h2>
                <h1 className="text-3xl text-white font-bold"> 100000 </h1>
            </div>
            <div className="flex flex-col">
                <h3 className="text-md text-white ">Account Holder</h3>
                <span className="text-md text-white ">{user.name}</span>
            </div>
        </div>
    </div>
}