import { getProviders, signIn } from "next-auth/react";

const Login = ({ providers }) => {
  return (
    <div className="min-h-screen flex items-center justify-center flex-col bg-black">
      <img src="https://links.papareact.com/9xl" alt="" className="w-48 mb-5" />
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button
            className="bg-[#18D860] text-white p-4 rounded-lg"
            onClick={() => signIn(provider.id, { callbackUrl: "/" })}
          >
            Login with {provider.name}
          </button>
        </div>
      ))}
    </div>
  );
};

export default Login;
export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}
