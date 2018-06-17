import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ApiResponse, ApiService } from '../../services/api.service';
import { PostType } from '../../model/Post';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  postId: number;
  post: PostType;
  postForm: FormGroup;
  submited: boolean = false;
  added: boolean = false;
  edited: boolean = false;
  error: string;
  loading: boolean = false;

  constructor(private fb: FormBuilder, private api: ApiService,
              private route: ActivatedRoute, private router: Router) {

  }

  ngOnInit() {
    this.route.paramMap.subscribe(
      (params: ParamMap) => {
        let id = params.get('id');
        if (id) {
          this.postId = +id;
          this.loadData();
        }
        else {
          this.createForm();
        }
      }
    );
  }

  resetForm() {
    if (this.postId) {
      this.router.navigate(['/add']);
    }
    else {
      this.added = false;
      this.edited = false;
      this.error = null;
      this.loading = false;
      this.submited = false;
      this.post = null;
      this.createForm()
    }
  }

  setValue() {
    this.createForm();
    const { title, content, lat, long, image_url } = this.post;
    this.postForm.setValue({
      title,
      content,
      lat,
      long,
      image_url
    });
  }

  onSubmit() {
    this.submited = true;
    if (this.postForm.status === 'VALID') {
      this.loading = true;
      let request = this.post ? this.api.editPost(this.post.id, this.postForm.value) : this.api.addPost(this.postForm.value);
      request.subscribe((response: ApiResponse<PostType>) => {
        // it was added or edited
        this.checkAddedEdited();

        this.error = null;
        // get the new post's data
        if (response && response.data) {
          this.post = response.data;
        }
        else if (response.error) {
          this.error = response.error || 'Error occurred while running the request!';
        }
        else if(response) {
          this.post = {...this.post, ...this.postForm.value};
        }

        this.loading = false;
      });
    }
  }

  private loadData(): void {
    this.loading = true;
    this.api.getPost(this.postId).subscribe((response: ApiResponse<PostType>) => {
      this.error = null;
      this.post = null;
      if (response && response.data) {
        this.post = response.data;
        // create form with values
        this.setValue();
      }
      else if (response.error) {
        // create form without values
        this.createForm();
        this.error = response.error || 'Error occurred during data loading!';
      }

      this.loading = false;
    });
  }

  private createForm() {
    this.postForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      lat: ['', Validators.required],
      long: ['', Validators.required],
      image_url: ['', Validators.required],
    });
  }

  private checkAddedEdited(): void {
    if (this.post) {
      this.edited = true;
    }
    else {
      this.added = true;
    }
  }

}
