import { Component, OnInit } from '@angular/core';
import { TheGamesDBAPIService } from '../APIs/TheGamesDB/TheGamesDBAPI.service';
import { GETPlatformsRequest } from '../APIs/TheGamesDB/TheGamesDBAPIEntities';

@Component({
  selector: 'api-interface-screen-one',
  templateUrl: './api-interface-screen-one.component.html',
  styleUrls: ['./api-interface-screen-one.component.less']
})
export class ApiInterfaceScreenOneComponent implements OnInit {

  constructor(private theGamesDbAPIService: TheGamesDBAPIService) { }

  ngOnInit(): void {
    // TODO: don't store the API key in this file lol
    let request: GETPlatformsRequest = {
      apikey: ''
    };

    this.theGamesDbAPIService.getAllPlatforms(request)
      .subscribe(x => console.log(x));
  }

}
