import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { APIResponse, Game } from 'src/app/models/game.model';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public sort?: string;
  public games: Array<Game> = [];

  constructor(private httpService: HttpService, private activateRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.activateRoute.params.subscribe((params: Params) => 
      params['game-search'] ? 
        this.searchGames('metacrit', params['game-search']) : 
        this.searchGames('metacrit'))
  }

  searchGames(sort: string, search?: string): void {
    this.httpService.getGameList(sort, search).subscribe(((gameList: APIResponse<Game>) => {
      this.games = gameList.results;
    }))
  }

  openGameDetailes(id: number): void {
    this.router.navigate(['details', id]);
  }
}
