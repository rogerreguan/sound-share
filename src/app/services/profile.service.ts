import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { addDoc, collection, collectionData, doc, docData, Firestore, getDoc, getDocs, query, setDoc, updateDoc, where } from '@angular/fire/firestore';
import { getDownloadURL, ref, Storage, uploadString } from '@angular/fire/storage';
import { Photo } from '@capacitor/camera';
import { catchError, from, map, Observable, of, tap } from 'rxjs';
import { IProfile } from 'src/model/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private auth: Auth, private firestore: Firestore) {}
  // private storage: Storage
  createUserProfile(username: IProfile) {
    const colfPosts = collection(this.firestore, `users`);
    return addDoc(colfPosts, username);
  }

  updateUserProfile(user: IProfile) {
    const docfPost = doc(this.firestore, `users/${user.id}`);
    return updateDoc(docfPost, { ...user });
  }

  getUserProfileById(id: string): Observable<any>{
    const docfUProfile= doc(this.firestore, `users/${id}`);
    return from(getDoc(docfUProfile)).pipe(
      map((snapshot) => {
        if (snapshot.exists()) {
          return snapshot.data(); // Devuelve los datos si el documento existe
        } else {
          console.error('Documento no encontrado.');
          return null;
        }
      }),
      catchError((error) => {
        console.error('Error al obtener el documento:', error);
        return of(null); // Maneja errores
      })
    );
    // return docData(docfPost, {idField: 'id'}) as Observable<IProfile>;
  }

	getUserProfile(): Observable<IProfile | null> {

      const user = this.auth.currentUser;
      if(user){
		  const userColRef = collection(this.firestore, `users`);
      const userQuery = query(userColRef, where("id", "==", user.uid));

      return from(getDocs(userQuery)).pipe(
        map((querySnapshot) => {
          if (!querySnapshot.empty) {
            const documentData = querySnapshot.docs[0].data();
            return documentData as IProfile;
          } else {
            console.log("No Document found.");
            return null;
          }
        }),
        catchError((error) => {
          console.error("Error obtaining Documents:", error);
          return of(null);
        })
      );
      
      }else{
        console.log("no user logged");
        return of(null);
      }
	}

  getProfiles() : Observable<IProfile[]>{

    const colfPosts = collection(this.firestore, 'users');
    return collectionData(colfPosts, {idField: 'id'}) as Observable<IProfile[]>;
    
  }

	// async uploadImage(cameraFile: Photo) {
	// 	const user = this.auth.currentUser;
	// 	const path = `uploads/${user!.uid}/profile.webp`;
	// 	const storageRef = ref(this.storage, path);

	// 	try {

  //     if (!cameraFile.base64String) throw new Error("Base64String undefined.");
	// 		await uploadString(storageRef, cameraFile.base64String, 'base64');

	// 		const imageUrl = await getDownloadURL(storageRef);

	// 		const userDocRef = doc(this.firestore, `users/${user!.uid}`);
	// 		await setDoc(userDocRef, {
	// 			imageUrl
	// 		});
	// 		return true;
	// 	} catch (e) {
	// 		return null;
	// 	}
	// }

}
