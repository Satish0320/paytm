import { AccountCard } from "../components/AccountCard";
import { Appbar } from "../components/AppBar";
import { Users } from "../components/Users";

export const Dashboard = () => {
  return (
    <div>
      <Appbar />
      <div className="m-8 flex justify-between">
        <AccountCard/>
        <Users />
      </div>
    </div>
  );
};
