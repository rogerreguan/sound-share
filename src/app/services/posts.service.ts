import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, deleteDoc, doc, docData, Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { IPost } from 'src/model/interfaces';


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

  addPost(post: IPost){
    const colfPosts = collection(this.firestore, `posts`);
    return addDoc(colfPosts, post);
  }

  removePost(post: IPost){
    const docfPost = doc(this.firestore, `posts/${post.id}`);
    return deleteDoc(docfPost);
  }
}
