import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Config } from '../config/config';
import { catchError, map } from 'rxjs/internal/operators';
import { Observable, of } from 'rxjs/index';
import { PostType } from '../model/Post';

export interface ApiResponse<T> {
  error: string;
  data: T;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };


  constructor(private http: HttpClient) {
  }

  getPosts(): Observable<ApiResponse<PostType[]>> {
    let {postsUrl} = Config;
    return this.get<PostType[]>(postsUrl, `Request ${postsUrl} failed`);
  }

  getPost(id: number): Observable<ApiResponse<PostType>> {
    let postUrl = `${Config.postsUrl}/${id}`;
    return this.get<PostType>(postUrl, `Request ${postUrl} failed`);
  }

  addPost(postData: PostType): Observable<ApiResponse<PostType>> {
    let {postsUrl} = Config;
    let payload = {
      post: postData
    };
    return this.post<PostType>(postsUrl, payload,`Request ${postsUrl} failed`);
  }

  editPost(id: number, postData: PostType): Observable<ApiResponse<PostType>> {
    let postUrl = `${Config.postsUrl}/${id}`;
    let payload = {
      post: postData
    };
    return this.put<PostType>(postUrl, payload,`Request ${postUrl} failed`);
  }

  deletePost(id: number): Observable<ApiResponse<PostType>> {
    let postUrl = `${Config.postsUrl}/${id}`;
    return this.delete<PostType>(postUrl,`Request ${postUrl} failed`);
  }

  private get<T>(url: string, errorMsg?: string, defaultResponse?: T): Observable<ApiResponse<T>> {
    return this.http.get<T>(url).pipe(
      map((response: T): ApiResponse<T> => this.formatResponse(response)),
      catchError(this.handleError<T>(errorMsg, defaultResponse))
    );
  }

  private post<T>(url: string, payload:{post:T}, errorMsg?: string, defaultResponse?: T): Observable<ApiResponse<T>> {
    return this.http.post<T>(url, payload, this.httpOptions).pipe(
      map((response: T): ApiResponse<T> => this.formatResponse(response)),
      catchError(this.handleError<T>(errorMsg, defaultResponse))
    );
  }

  private put<T>(url: string, payload:{post:T}, errorMsg?: string, defaultResponse?: T): Observable<ApiResponse<T>> {
    return this.http.put<T>(url, payload, this.httpOptions).pipe(
      map((response: T): ApiResponse<T> => this.formatResponse(response)),
      catchError(this.handleError<T>(errorMsg, defaultResponse))
    );
  }

  private delete<T>(url: string, errorMsg?: string, defaultResponse?: T): Observable<ApiResponse<T>> {
    return this.http.delete<T>(url, this.httpOptions).pipe(
      map((response: T): ApiResponse<T> => this.formatResponse(response)),
      catchError(this.handleError<T>(errorMsg, defaultResponse))
    );
  }

  private formatResponse<T>(response: T): ApiResponse<T> {
    return {
      error: null,
      data: response
    } as ApiResponse<T>;
  }

  /**
   * Handle Http operation that failed.
   * @param {string} errorMsg
   * @param {T} defaultResult
   * @returns {Observable<ApiResponse<T>>}
   */
  private handleError<T>(errorMsg: string, defaultResult: T) {
    return (error: any): Observable<ApiResponse<T>> => {
      console.error(error); // log the error

      let result: ApiResponse<T> = {
        error: errorMsg,
        data: defaultResult || null
      };
      // Let the app keep running by returning an empty result.
      return of(result);
    };
  }
}
