import { Observable } from "rxjs";
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movie} from "../models/movie.model";

@Injectable({
    providedIn: 'root'
  })

  export class MoviesService {
    constructor (private httpClient: HttpClient) {}

    getMovieList(): Observable<Movie[]>{
        return this.httpClient.get<Movie[]>('/movies');
    }

    getMovieById(movieId: string): Observable<Movie>{
        return this.httpClient.get<Movie>(`/movies/${movieId}`)
    }

  }
