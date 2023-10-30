import { Injectable } from '@angular/core';
import {Auth} from '@angular/fire/auth';
import { doc, docData, Firestore, setDoc} from '@angular/fire/firestore'
import { ref, Storage, uploadString, uploadBytes } from '@angular/fire/storage';
import { Photo } from '@capacitor/camera';
import { getDownloadURL } from '@angular/fire/storage';
@Injectable({
  providedIn: 'root'
})

export class AvatarService {

  constructor(
    private auth : Auth,
    private firestore : Firestore,
    private storage :  Storage,
  
  ) { }

  // // recuperer les informations d'un utilisateurs connectes
  // async getUserProfile(){
  //   const user =  this.auth.currentUser;
  //   const userDocRed = doc(this.firestore, `users/${user.uid}`);
  //   return docData(userDocRed);
  // }

    async getUserProfile() {
      const user = await this.auth.currentUser;
      if (!user) {
        return null;
      }
      const userDocRef = doc(this.firestore, `users/${user.uid}`);
      const userDoc = await docData(userDocRef);
      return userDoc;
    }


  // async uploadImage(cameraFile: Photo){
  //   const user =  this.auth.currentUser;
  //   const path  = `uploads/${user.uid}/profile.png`;
  //   const storageRef = ref(this.storage, path);

  //   try {
  //     await uploadString(storageRef, cameraFile.base64String, 'base64');
  //     const imageUrl = await getDownloadURL(storageRef);
  //     const userDocRef = doc(this.firestore, `users/${user.id}`);
  //     await setDoc(userDocRef,{
  //       imageUrl
  //     });
  //     return true;
  //   } catch (error) {
  //     return null
  //   }
  // }

  async uploadImage(cameraFile: Photo) {
    const user = await this.auth.currentUser; // Correction : utiliser "await" pour obtenir l'utilisateur actuel
    console.log(user);
    
    const path = `uploads/${user?.uid}/profile.png`; // Correction : utiliser "?." pour accéder à "uid" en cas d'utilisateur nul
    const storageRef = ref(this.storage, path);
    if (cameraFile && cameraFile.base64String) {

      try {
        await uploadString(storageRef, cameraFile.base64String, 'base64');
        const imageUrl = await getDownloadURL(storageRef); // Correction : utiliser "getDownloadURL" pour obtenir l'URL de téléchargement
        const userDocRef = doc(this.firestore, `users/${user?.uid}`); // Correction : utiliser "?." pour accéder à "uid" en cas d'utilisateur nul
        await setDoc(userDocRef, { imageUrl });
        return true;
      } catch (error) {
        console.error('Erreur lors du téléchargement de l\'image :', error); // Correction : afficher l'erreur dans la console
        return null;
      }

    }else{
      console.error('Le fichier de l\'appareil photo est null ou ne contient pas de base64String.');
      return null;
    }
  }
  
  
}
