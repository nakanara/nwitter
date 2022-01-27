import AuthForm from "components/AuthForm";
import { authService, firebaseInstance } from "fbase";

const Auth = () => {

  const onSociaClick = async (event) => {
    const {
      target: { name },
    } = event;

    let provider;
    if(name === 'google') {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    } else if( name === 'github' ){
      provider = new firebaseInstance.auth.GithubAuthProvider();
    }
    await authService.signInWithPopup(provider);
  };

  return (
      <div>
        
        <AuthForm />

        <div>
          <button onClick={onSociaClick} name="google">
            Continue with Google
          </button>
          <button onClick={onSociaClick} name="github">
            Continue with Github
          </button>
        </div>
      </div>
  );
};

export default Auth;