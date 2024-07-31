import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { DurationPipe } from '../../core/pipes/duration.pipe';
import { Movie } from '../../core/models/movie.model';
import { MoviesService } from '../../core/services/movies.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BoxOfficePipe } from '../../core/pipes/box-office.pipe';

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [CommonModule,DurationPipe, BoxOfficePipe],
  templateUrl: './movie-detail.component.html',
  styleUrl: './movie-detail.component.css'
})
export class MovieDetailComponent implements OnInit {

  movieSelected: Movie = {} as Movie;

  private moviesService = inject(MoviesService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  ngOnInit(){
    this.route.paramMap.subscribe(params => {
        const movieId = params.get('movieId');
        if(movieId){
          this.getMovieDetails(movieId);
        }
      });
  }

  getMovieDetails(movieId: string){
    console.log("sono qui");
    this.moviesService.getMovieById(movieId).subscribe({
      next: movie => this.movieSelected = movie,
      error: err => {
        console.error('Error fetching movie details:', err);
      }
    });
  }

  goBack(){
    this.router.navigate(['/']);
  }
}
