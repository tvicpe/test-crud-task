import {Component, OnInit} from '@angular/core';
import {ApiResponse, ApiService} from '../../services/api.service';
import {PostType} from '../../model/Post';
import {Config} from '../../config/config';
import {RxPubSub} from 'rx-pubsub';
import {PubSub} from '../../util/pub-sub';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent extends PubSub implements OnInit {
  posts: PostType[];
  error: string;
  loading: boolean = false;

  constructor(private api: ApiService) {
    super();
  }

  ngOnInit() {
    this.loadData();
    this.initSubscriber();
  }

  reloadData(): void {
    this.loadData();
  }

  private loadData(): void {
    this.loading = true;
    this.api.getPosts().subscribe((response: ApiResponse<PostType[]>) => {
      this.error = null;
      this.posts = null;
      if (response && response.data) {
        this.posts = response.data;
      }
      else if (response.error) {
        this.error = response.error || 'Error occurred during data loading!';
      }

      this.loading = false;
    });
  }

  initSubscriber() {
    this.modalSubscriber = RxPubSub.subscribe(Config.pubSubEvents.deleteConfirmed, () => {
      this.reloadData();
    });
  }


}
