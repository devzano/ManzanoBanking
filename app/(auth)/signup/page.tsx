import AuthForm from '@/components/AuthForm';
import { getLoggedInUser } from '@/lib/actions/user.actions';

const Signup = async () => {
  const loggedInUser = await getLoggedInUser();
  console.log(loggedInUser);
  return (
    <section className="flex-center size-full max-sm:px-6">
      <AuthForm type="signup"/>
    </section>
  )
}

export default Signup