import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Game } from 'src/app/models/game.model';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  gameRating = 0;
  gameId?: number;
  game?: Game;

  constructor(private activatedRoute: ActivatedRoute, private httpService: HttpService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.gameId = +params['id'];
      this.getDetails(this.gameId);
    })
  }

  getDetails(id: number): void {
    this.httpService.getGameDetails(id).subscribe((gameResponse: Game) => {
      this.game = gameResponse;
      this.gameRating = this.game.metacritic;
    })
  }

  getColor(value: number): string {
    if (value > 75) return '#5ee432';
    else if (value > 50) return '#fffa50';
    else if (value > 30) return '#f7aa38';
    else return '#ef4655';
  }

}
