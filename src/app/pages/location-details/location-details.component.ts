import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from 'src/app/models/location';
import { LocationsService } from 'src/app/services/locations.service';

@Component({
  selector: 'app-location-details',
  templateUrl: './location-details.component.html',
  styleUrls: ['./location-details.component.css']
})
export class LocationDetailsComponent {
  public locationData!: Location;
  public dataLoaded: boolean = false;

  constructor (
    private _locationService: LocationsService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
  ) {
    this._activatedRoute.params.subscribe(params => {
      if (params['id']) {
        this._locationService.getLocationById(params['id']).subscribe(result => {
          this.locationData = result;
          this.dataLoaded = true;
        });
      } else this._router.navigate(['/']);
    });
  }
}
