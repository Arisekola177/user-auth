import Link from "next/link";

interface Props {
  params: {
    jwt: string;
  };
}

const ActivationPage = async ({ params }: Props) => {
  const baseUrl = process.env.NEXTAUTH_URL;

  if (!baseUrl) {
    throw new Error("Base URL is not defined in environment variables");
  }

  // Fetch the API with an absolute URL
  const response = await fetch(`${baseUrl}/api/register/activate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ jwtUserId: params.jwt }),
  });

  const result: 'userNotExist' | 'alreadyActivated' | 'success' | 'error' = await response.json();

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      {result === 'userNotExist' ? (
        <p className="text-red-500 text-2xl">The user does not exist</p>
      ) : result === 'alreadyActivated' ? (
        <p className="text-red-500 text-2xl">The user is already activated</p>
      ) : result === 'success' ? (
        <p className="text-green-500 text-2xl">
          Success! The user is now activated <br />
          <Link className="text-blue-500 text-sm text-center hover:underline" href="/">
            Click here to go login
          </Link>
        </p>
      ) : (
        <p className="text-yellow-500 text-2xl">Oops! Something went wrong!</p>
      )}
    </div>
  );
};

export default ActivationPage;
