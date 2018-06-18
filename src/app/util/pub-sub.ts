import {OnDestroy} from '@angular/core';
import {RxPubSub, Subscription} from 'rx-pubsub';

export class PubSub implements OnDestroy {
  protected modalSubscriber: Subscription;
  ngOnDestroy() {
    if (this.modalSubscriber) {
      RxPubSub.unsubscribe(this.modalSubscriber);
    }
  }
}
