import { Injectable } from '@angular/core';
import {Auth, getAuth} from '@angular/fire/auth';
import { doc, collection, docData, Firestore, setDoc} from '@angular/fire/firestore'
import { ref, Storage, uploadString, uploadBytes } from '@angular/fire/storage';
import { Photo } from '@capacitor/camera';
import { getDownloadURL } from '@angular/fire/storage';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})

export class AvatarService {

  constructor(
    private auth : Auth,
    private firestore : Firestore,
    private storage :  Storage,
  
  ) { }



  async getUserProfile(): Promise<any | null> {
    const user = this.auth.currentUser;
    if (!user) {
      return null;
    }

    const userDocRef = doc(this.firestore, `users/${user.uid}`);
    const userData$: Observable<any | undefined> = docData(userDocRef);

    return new Promise((resolve, reject) => {
      userData$.subscribe((userData) => {
        if (userData) {
          resolve(userData);
        } else {
          resolve(null);
        }
      }, reject);
    });
  }

  
  
 
  

  async  uploadImage(cameraFile: Photo): Promise<string | null | boolean> {
    const user = await this.auth.currentUser;
    if (!user) {
      return null;
    }
  
    const path = `uploads/${user.uid}/profile.png`;
    const storageRef = ref(this.storage, path);
  
    if (!cameraFile || !cameraFile.base64String) {
      console.error('Le fichier de l\'appareil photo est null ou ne contient pas de base64String.');
      return null;
    }
  
    try {
      await uploadString(storageRef, cameraFile.base64String, 'base64');
      const imageUrl = await getDownloadURL(storageRef);
      const userDocRef = doc(this.firestore, `users/${user.uid}`); // Correction : utiliser "?." pour accéder à "uid" en cas d'utilisateur nul
      await setDoc(userDocRef, { imageUrl });
      return true;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  


  
  
   
    // async uploadImage(cameraFile :Photo){
      
  //   const user = this.auth.currentUser;
  //   if (!user) {
  //     return null;
  //   }
  //   const path = `uploads/${user.uid}/profile.png`;
  //   const storageRef = ref(this.storage, path);

  //     if (cameraFile && cameraFile.base64String) {
        
  //         try{
  //           await uploadString(storageRef, cameraFile.base64String, 'base64');
  //           const imageUrl = await getDownloadURL(storageRef); // Correction : utiliser "getDownloadURL" pour obtenir l'URL de téléchargement
  //           const userDocRef = doc(this.firestore, `users/${user.uid}`); // Correction : utiliser "?." pour accéder à "uid" en cas d'utilisateur nul
  //           await setDoc(userDocRef, { imageUrl });
  //           return true;
  //         }catch(e){
  //           console.error(e);
  //           return false;
            
  //         }
  //       }else{
  //     console.error('Le fichier de l\'appareil photo est null ou ne contient pas de base64String.');
  //     return null;
  //   }
  // }
  
  
}
