import { Injectable } from '@angular/core';
import { Auth, getAuth } from '@angular/fire/auth'
import { createUserWithEmailAndPassword , signInWithEmailAndPassword, signOut  } from "firebase/auth";
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth:Auth) {

  }

  // Creation d'un compte par firebase (email et mot de passe)
  async Inscrire({ email, password }: { email: string, password: string }) {
    const auth = getAuth();
    console.log(email,password);
    
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
      console.error('Erreur lors de l\'inscription :', error);
      return null;
    }
  }

  // Se connecter par firebase (email et mot de passe)
  async Seconnecter({email,password}: { email: string, password: string }){
    const auth = getAuth();
    try {
      const userCredential =  signInWithEmailAndPassword(auth, email , password);
      return (await userCredential).user;
    
   } catch (error) {
      console.error('Erreur lors de la connexion:', error);
      return null;
   }
  }

  async seDeconnecter() {
    try {
      return signOut(this.auth);
    } catch (error) {
      console.error('Erreur lors de la déconnexion :', error);
    }
  }
}
