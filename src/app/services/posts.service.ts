import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, deleteDoc, doc, docData, Firestore, getDocs, query, updateDoc, where } from '@angular/fire/firestore';
import { catchError, from, map, Observable, of } from 'rxjs';
import { IPost, IProfile } from 'src/model/interfaces';


@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private firestore: Firestore) { }

  getPosts() : Observable<IPost[]>{

    const colfPosts = collection(this.firestore, 'posts');
    return collectionData(colfPosts, {idField: 'id'}) as Observable<IPost[]>;
    
  }

  getPostById(id: number): Observable<IPost>{
    const docfPost= doc(this.firestore, `posts/${id}`);
      return docData(docfPost, {idField: 'id'}) as Observable<IPost>;
  }

  getPostsByUser(username: string): Observable<IPost[]>{

    const postsColRef = collection(this.firestore, `posts`);
    const postsQuery = query(postsColRef, where("user", "==", username));

    return from(getDocs(postsQuery)).pipe(
      map((querySnapshot) => {
        if (!querySnapshot.empty) {
          const postsData: IPost[] = querySnapshot.docs.map(post => {
            return post.data() as IPost;
          });
          return postsData;
        } else {
          console.log("No Posts Found.");
          return [];
        }
      }),
      catchError((error) => {
        console.error("Error obtaining Posts:", error);
        return of([]);
      })
    );
    
  }

  addPost(post: IPost){
    const colfPosts = collection(this.firestore, `posts`);
    return addDoc(colfPosts, post);
  }

  removePost(post: IPost){
    const docfPost = doc(this.firestore, `posts/${post.id}`);
    return deleteDoc(docfPost);
  }

  updatePost(post: IPost) {
    const docfPost = doc(this.firestore, `posts/${post.id}`);
    return updateDoc(docfPost, { ...post });
  }

}
