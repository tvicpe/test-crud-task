import { Component, OnInit } from '@angular/core';
import { ApiResponse, ApiService } from '../../services/api.service';
import { PostType } from '../../model/Post';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  posts: PostType[];
  error: string;
  loading: boolean = false;

  constructor(private api: ApiService) {
  }

  ngOnInit() {
    this.loadData();
  }

  reloadData():void{
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

}
