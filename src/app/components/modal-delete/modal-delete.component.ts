import {Component, OnInit} from '@angular/core';
import {RxPubSub} from 'rx-pubsub';
import {PostType} from '../../model/Post';
import {Config} from '../../config/config';
import {PubSub} from '../../util/pub-sub';
import {ApiResponse, ApiService} from '../../services/api.service';

declare var jQuery: any;

@Component({
  selector: 'app-modal-delete',
  templateUrl: './modal-delete.component.html',
  styleUrls: ['./modal-delete.component.css']
})
export class ModalDeleteComponent extends PubSub implements OnInit {
  post: PostType;
  error: string;
  loading: boolean = false;
  private modalSelector: string = '#deleteModal';

  constructor(private api: ApiService) {
    super();
  }

  ngOnInit() {
    this.initSubscriber();
  }

  private initSubscriber(): void {
    this.modalSubscriber = RxPubSub.subscribe(Config.pubSubEvents.deleteModal, (post: PostType) => {
      this.post = post;
      this.error = null;
      jQuery(this.modalSelector).modal('show');
    });
  }

  deleteAction() {
    this.loading = true;
    this.api.deletePost(this.post.id).subscribe((response: ApiResponse<null>) => {
      if (response.error) {
        this.error = response.error || 'Error occurred while running the request!';
      } else {
        RxPubSub.publish(Config.pubSubEvents.deleteConfirmed, true);
        jQuery(this.modalSelector).modal('hide');
      }
      this.loading = false;
    });
  }

}
