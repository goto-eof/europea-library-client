import { Component, OnInit } from '@angular/core';
import PostService from '../../../service/PostService';
import { environment } from '../../../../environments/environment';
import Post from '../../../model/Post';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import SnackBarService from '../../../service/SnackBarService';
import ApplicationSettingsService from '../../../service/ApplicationSettingsService';
import ApplicationSettings from '../../../model/ApplicationSettings';

@Component({
  selector: 'app-cp-home-page-editor',
  templateUrl: './cp-home-page-editor.component.html',
  styleUrl: './cp-home-page-editor.component.css',
})
export class CpHomePageEditorComponent implements OnInit {
  settings?: ApplicationSettings;

  constructor(
    private postService: PostService,
    private formBuilder: FormBuilder,
    private snackBarService: SnackBarService,
    private applicationSettingsService: ApplicationSettingsService
  ) {}

  articleForm: FormGroup<any> = this.formBuilder.group({
    title: ['', Validators.maxLength(100)],
    subtitle: ['', Validators.maxLength(100)],
    content: ['', Validators.maxLength(1000)],
    identifier: environment.IDENTIFIER_HOME_PAGE_ARTICLE,
    id: null,
  });

  ngOnInit(): void {
    this.applicationSettingsService.get().subscribe({
      next: (settings) => {
        this.settings = settings;
        if (settings.customDescriptionEnabled) {
          this.loadDescriptionForm();
        }
      },
      error: () => {
        this.snackBarService.showErrorWithMessage(
          'Something went wrong when trying to retrieve settings'
        );
      },
    });
  }

  loadDescriptionForm() {
    this.postService
      .getByIdentifier(environment.IDENTIFIER_HOME_PAGE_ARTICLE)
      .subscribe({
        next: (post) => {
          this.postToForm(post);
        },
        error: () => {
          // this.snackBarService.showErrorWithMessage('Unable to retrieve data');
        },
      });
  }

  postToForm(post: Post) {
    this.articleForm.patchValue({ id: post.id });
    this.articleForm.patchValue({ title: post.title });
    this.articleForm.patchValue({ subtitle: post.subtitle });
    this.articleForm.patchValue({ content: post.content });
    this.articleForm.patchValue({ identifier: post.identifier });
  }

  onSubmit(e: any) {
    e.preventDefault();
    if (this.articleForm.valid) {
      const post: Post = {
        id: this.articleForm.value.id,
        identifier: this.articleForm.value.identifier,
        title: this.articleForm.value.title,
        subtitle: this.articleForm.value.subtitle,
        content: this.articleForm.value.content,
      };
      this.postService.createOrUpdate(post).subscribe({
        next: (post) => {
          this.postToForm(post);
          this.snackBarService.showInfoWithMessage('Home Page updated');
        },
        error: () => {
          this.snackBarService.showErrorWithMessage('Something went wrong');
        },
      });
      return;
    }
    this.snackBarService.showErrorWithMessage('Invalid input');
  }

  update(propertyName: string, newValue: boolean) {
    if (propertyName === 'customDescriptionEnabled' && newValue) {
      this.loadDescriptionForm();
    }
    this.applicationSettingsService
      .update({
        ...this.settings,
        [propertyName]: newValue,
      })
      .subscribe({
        next: (settings) => {
          this.settings = settings;
          this.snackBarService.showInfoWithMessage('Saved');
        },
        error: () => {
          this.snackBarService.showErrorWithMessage(
            'Something went wrong when trying to update settings'
          );
        },
      });
  }
}
