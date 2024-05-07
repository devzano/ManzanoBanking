import RSidebar from '@/components/RSidebar';
import TotalBalanceBox from '@/components/TotalBalanceBox';
import UserHeader from '@/components/UserHeader';
import { getLoggedInUser } from '@/lib/actions/user.actions';

const Home = async () => {
  const loggedIn = await getLoggedInUser();

  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <UserHeader
            type="greeting"
            title="Welcome"
            user={loggedIn?.name || 'Guest'}
            subtext="Manage your account below"
          />

          <TotalBalanceBox
            accounts={[]}
            totalBanks={1}
            totalCurrentBalance={1000.01}
          />

        </header>
      </div>
      <RSidebar
        user={loggedIn}
        transactions={[]}
        banks={[{currentBalance: 123.45},{currentBalance: 678.90}]}
      />
    </section>
  );
};

export default Home;