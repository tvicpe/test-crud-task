import { Component, OnInit } from '@angular/core';
import { ApiResponse, ApiService } from '../../services/api.service';
import { PostType } from '../../model/Post';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  private postId:number;
  post: PostType;
  error: string;
  loading: boolean = false;

  constructor(private api: ApiService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(
      (params: ParamMap) => {
        this.postId = +params.get('id');
        this.loadData();
      }
    );
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

}
