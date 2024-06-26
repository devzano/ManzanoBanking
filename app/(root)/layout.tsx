import MobileNavbar from "@/components/MobileNavbar";
import LSidebar from "@/components/LSidebar";
import Image from "next/image";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const loggedIn = await getLoggedInUser();

  if(!loggedIn) redirect('/login')
  return (
    <main className="flex h-screen w-full font-inter">
      <LSidebar user={loggedIn}/>
      <div className="flex size-full flex-col">
        <div className="root-layout">
          <Image src="/icons/logo.svg" width={30} height={30} alt="logo"/>
          <div>
            <MobileNavbar user={loggedIn}/>
          </div>
        </div>
      {children}
      </div>
    </main>
  );
}