
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  code = '';
  review = '';
  loading = false;

  constructor(private http: HttpClient) {}

  reviewCode() {
    if (!this.code.trim()) {
      this.review = 'Please enter some code to review.';
      return;
    }

    this.loading = true;
    this.review = '';

    this.http.post<any>(
      'http://127.0.0.1:5001/ai-code-reviewer-ce18e/us-central1/reviewCode',
      {
        code: this.code
      }
    ).subscribe({
      next: (response) => {
        this.review = response.message;
        this.loading = false;
      },
      error: (error) => {
        console.error(error);
        this.review = 'Something went wrong while reviewing the code.';
        this.loading = false;
      }
    });
  }
}

