import {Component, OnInit} from '@angular/core';
import {ApiResponse, ApiService} from '../../services/api.service';
import {PostType} from '../../model/Post';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Config} from '../../config/config';
import {RxPubSub} from 'rx-pubsub';
import {PubSub} from '../../util/pub-sub';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent extends PubSub implements OnInit {
  private postId: number;
  post: PostType;
  error: string;
  loading: boolean = false;

  constructor(private api: ApiService, private route: ActivatedRoute, private router: Router) {
    super();
  }

  ngOnInit() {
    this.route.paramMap.subscribe(
      (params: ParamMap) => {
        this.postId = +params.get('id');
        this.loadData();
      }
    );
    this.initSubscriber();
  }

  reloadData(): void {
    this.loadData();
  }

  private loadData(): void {
    this.loading = true;
    this.api.getPost(this.postId).subscribe((response: ApiResponse<PostType>) => {
      this.error = null;
      this.post = null;
      if (response && response.data) {
        this.post = response.data;

      }
      else if (response.error) {
        this.error = response.error || 'Error occurred during data loading!';
      }
      this.loading = false;
    });
  }

  initSubscriber(): void {
    this.modalSubscriber = RxPubSub.subscribe(Config.pubSubEvents.deleteConfirmed, (data: boolean) => {
      if(data) {
        // reset publish event
        RxPubSub.publish(Config.pubSubEvents.deleteConfirmed, false);
        this.router.navigate(['/dashboard']);
      }
    });
  }

}
