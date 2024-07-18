import CardWrapper from "./card-wrapper";

export default function LoginForm() {
  return (
    // <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
    //   <h1 className="text-2xl font-bold">LoginForm</h1>
    // </div>
    <CardWrapper
      headerLabel="Sign In with :"
      backButtonLabel="Back"
      backButtonHref="/"
      showSocial
      //   className="text-primary-foreground"
    >
      <></>
    </CardWrapper>
  );
}
