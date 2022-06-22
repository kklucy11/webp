
import { getAuth,GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import app from '../Firebase/FirebaseApp';

const LoginGoogle = () => {
    
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
}

export default LoginGoogle


