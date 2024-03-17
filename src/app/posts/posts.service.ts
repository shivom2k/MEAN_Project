import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Post } from './post.model';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class PostsService  {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();
  constructor(private readonly http:HttpClient){}

  getPosts() {
    this.http.get<{message: string, posts: any}>('http://localhost:3000/api/posts')
    .pipe(map((postData) => {
      return {posts: postData.posts.map(post => {
        return {
          title: post.title,
          content: post.content,
          id: post._id
        }
      })}
    }))
    .subscribe((postData) => {
      this.posts = postData.posts
      this.postsUpdated.next([...this.posts]);
     });
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  addPost(title: string, content: string) {
    const post: Post = {id:null,title: title, content: content};
    this.http.post<{message:string}>('http://localhost:3000/api/posts',post).subscribe((postData)=>{
      console.log(postData.message);
      this.posts.push(post);
      this.getPosts();
    })
  }
  deletePost(postId: string){
    this.http.delete('http://localhost:3000/api/posts/'+postId).subscribe(()=>{
      console.log('Deleted');
      this.getPosts();
    });
  }
}
