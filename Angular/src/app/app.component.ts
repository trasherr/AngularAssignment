import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { LoaderService } from './services/loader-service/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy{
  title = 'Angular';

  subscription: Subscription | undefined;
  isLoading: boolean = false;

  constructor(private loadService: LoaderService, private cdr: ChangeDetectorRef) {
    
    this.subscription = this.loadService.onLoad().subscribe(res => this.isLoading = res );
  }

  ngAfterViewChecked(){
    //your code to update the model
    this.cdr.detectChanges();
 }

  ngOnDestroy() {
      this.subscription?.unsubscribe();
  }
}
