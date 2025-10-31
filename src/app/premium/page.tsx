import { getSession } from "@/actions";
import Link from "next/link";
import { redirect } from "next/navigation";

const PremiumPage = async () => {

  const session = await getSession();

  if (!session.isLoggedIn) {
    redirect("/")
  }

  if (!session.isPremium) {
    return (
      <div className="notPremium">
        <h1>You need to be a premium user to access this page.</h1>
        <p>Please upgrade your account to access premium features.</p>
        <Link href="/profile">Go to Profile</Link>
      </div>
    );
  }

  return (
    <div className="premium">
      <h1>Welcome to the PremiumPage</h1>
      <p>You have access to premium features!</p>
      <ul>
        <li>Exclusive content #1</li>
        <li>Exclusive content #2</li>
        <li>Exclusive content #3</li>
      </ul>
    </div>
  )
}

export default PremiumPage;