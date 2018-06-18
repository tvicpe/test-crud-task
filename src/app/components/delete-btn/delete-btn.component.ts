import {Component, Input, OnInit} from '@angular/core';
import {PostType} from '../../model/Post';
import {RxPubSub} from 'rx-pubsub';
import {Config} from '../../config/config';

@Component({
  selector: 'app-delete-btn',
  templateUrl: './delete-btn.component.html',
  styleUrls: ['./delete-btn.component.css']
})
export class DeleteBtnComponent implements OnInit {
  @Input() deletePost: PostType;

  constructor() {
  }

  ngOnInit() {
  }

  openModal(): void {
    RxPubSub.publish(Config.pubSubEvents.deleteModal, this.deletePost);
  }

}
