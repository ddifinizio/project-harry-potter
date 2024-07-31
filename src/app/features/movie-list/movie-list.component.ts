import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MoviesService } from '../../core/services/movies.service';
import { Movie } from '../../core/models/movie.model';
import { DurationPipe } from '../../core/pipes/duration.pipe';
import { FormsModule } from '@angular/forms';
import { Subject, catchError, of, takeUntil } from 'rxjs';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [CommonModule, DurationPipe, FormsModule,RouterOutlet],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.css'
})
export class MovieListComponent implements OnInit {

  movies : Movie[] = [];
  filterTitle: string = '';
  filterYear: string = '';
  error: string | null = null;

  private unsubscribe$ = new Subject<void>();

  private moviesService = inject(MoviesService);
  private router = inject(Router);

  ngOnInit() {
    this.moviesService.getMovieList().pipe(
      takeUntil(this.unsubscribe$),
      catchError(err => {
        this.error = 'Failed to load movies';
        console.error(err);
        return of([]); 
      })
    ).subscribe(data => this.movies = data);
  }

  filteredMovies(): Movie[] {
    return this.movies.filter(movie => {
      const titleMatches = this.filterTitle ? movie.title.toLowerCase().includes(this.filterTitle.toLowerCase()) : true;
      const yearMatches = this.filterYear ? this.extractYear(movie.release_date).startsWith(this.filterYear) : true;
      return titleMatches && yearMatches;
    });
  }

  extractYear(releaseDate: string): string {
    return releaseDate.split('-')[0];
  }

  viewDetails(movieId: string) {
    this.router.navigate(['/movies',movieId]);
  }

  ngOnDestroy() {
    this.unsubscribe$.next(); 
    this.unsubscribe$.complete();
  }

}
