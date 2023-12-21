import { AsyncPipe, Location, NgFor, NgIf } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { MatFormFieldModule } from "@angular/material/form-field";
import {MatSelectModule} from '@angular/material/select';
import { SubjectService } from "../../services/subject.service";
import { PostService } from "../../services/post.service";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import PostCreate from "../../model/post.create";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";
import menuBar from "src/app/components/menu.component";

@Component({
    selector: 'create-post',
    templateUrl: './post.create.html',
    styleUrls: ['./post.create.scss'],
    standalone: true,
    imports: [NgIf, MatFormFieldModule, MatSelectModule, NgFor, AsyncPipe, ReactiveFormsModule, FormsModule, menuBar]
})
export default class CreatePost implements OnInit{

    public postGroup!: FormGroup;

    public message!:string;
    //Property to stock subscription
    public subscription!: Subscription;

    //Stock list of subject
    public subjectList$ = this.subjectService.getSubjectList();

    //Form initialization
    ngOnInit(): void {
        this.initForm();
    }
  
    constructor(private subjectService: SubjectService, private postService: PostService, private fb: FormBuilder, private location: Location, private router:Router){
    }

    //Create a post and return a message
    createPost(){
        //Loading values
        const postCreate: PostCreate = {
            title: this.postGroup.get('title')?.value,
            date: this.postGroup.get('date')?.value,
            author: this.postGroup.get('author')?.value,
            content: this.postGroup.get('content')?.value,
            comments: this.postGroup.get('comment')?.value
        }
    
        //Subject identity
        const id_subject = this.postGroup.get('idSubject')?.value;
        console.log("POSTCREATE: ", postCreate)
        
        if(postCreate == null){
            return "Body is not correct";
        }
        this.subscription = this.postService.createPost(postCreate, id_subject).subscribe(
            {
                next:()=> {
                    this.message = "Post created !!!";

                    setTimeout(()=>{
                        this.location.back();
                    }, 2000)
                },
            }
        )

        return this.subscription;
        }

        //Unsubscribe a subscription
        ngOnDestroy():void{
            if(this.subscription){
                this.subscription.unsubscribe();
            }
        }
    
         //Redirect menu for navigation
    navigateMenu():void{
        this.router.navigate(['menu'])
    }

    //Redirect route though arrow left
    arrowLeftDirection():void{
        this.location.back();
    }

      //Request form required field for post creation validation
      initForm():void{
        //Stock a group of fields
        this.postGroup = this.fb.group({
            idSubject: [
                [Validators.required]
            ],
            title:[
                '',
                [Validators.required]
            ],
        
            date: [
                 new Date().toISOString()
            ],
        
            author:[
                 ''
            ],
            content: [
                '',
                [Validators.required]
            ],
            comments: [
                '',
            ]
        });

      }
}