import { getUser } from "../hooks/getUser";
import { LogoIcon } from "./Icons/Logo";

export const Appbar = () => {
  const user = getUser();
  const userNameInitial = user?.name ? user.name[0] : "?";
  return (
    <div className="shadow h-14 p-4 flex justify-between">
      <div className="flex justify-center h-full gap-2">
        <LogoIcon/>
        PayTM App
        </div>
      <div className="flex items-center">
        <div className="rounded-full h-10 w-10 bg-green-300 flex justify-center mt-1 mr-2">
          <div className="flex flex-col justify-center h-full text-xl font-semibold">
            {userNameInitial}
            </div>
        </div>
        <div className="flex flex-col justify-center h-full mr-4 text-xl font-semibold">{user.name}</div>
      </div>
    </div>
  );
};
