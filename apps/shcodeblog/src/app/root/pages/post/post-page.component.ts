import { Component, inject,  OnInit, signal, WritableSignal } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  standalone: false
})
export class PostPageComponent implements OnInit {

  private readonly _route: ActivatedRoute = inject(ActivatedRoute)

  postId: WritableSignal<string | undefined> = signal(undefined);
  savedBy: WritableSignal<{ uid: string }[] | undefined> = signal([]);
  likedBy: WritableSignal<{ uid: string }[] | undefined> = signal([]);
  userLike: WritableSignal<{ postId: string, userId: string } | undefined> = signal<{ postId: string, userId: string } | undefined>(undefined);
  userSave: WritableSignal<{ postId: string, userId: string } | undefined> = signal<{ postId: string, userId: string } | undefined>(undefined);


  ngOnInit(): void {
    this.postId.set(this._route.snapshot.paramMap.get('id') ?? undefined);
  }

  handleLikedBy(event: { uid: string }[]): void {
    this.likedBy.set(event);
  }

  handleSavedBy(event: { uid: string }[]): void {
    this.savedBy.set(event);
  }

  handleLikeEvent(event: { postId: string, userId: string }): void {
    this.userLike.set(event);
  }

  handleSaveEvent(event: { postId: string, userId: string }): void {
    this.userSave.set(event);
  }
}