import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import ApplicationConst from '../constants/ApplicationConst';
import Post from '../model/Post';

const baseUrl = ApplicationConst.API_ENDPOINT + '/api/v1/post';

@Injectable()
export default class PostService {
  constructor(private httpClient: HttpClient) {}

  getByIdentifier(identifier: string): Observable<Post> {
    return this.httpClient.get<Post>(`${baseUrl}/identifier/${identifier}`);
  }

  create(post: Post): Observable<Post> {
    return this.httpClient.post<Post>(`${baseUrl}`, post);
  }

  update(post: Post): Observable<Post> {
    return this.httpClient.put<Post>(`${baseUrl}/postId/${post.id}`, post);
  }

  createOrUpdate(post: Post) {
    if (post.id) {
      return this.update(post);
    }
    return this.create(post);
  }
}
