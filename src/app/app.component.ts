import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { RegisterService } from './services/register.service';
import { User } from './user-type';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'crud_prj2';
  public regcourse:any;

  public addNewdata: any;
  CrudForm:FormGroup;
  

  constructor(private fb:FormBuilder,private _registerService:RegisterService){
   this. CrudForm = this.fb.group({
      id:[0],
      firstName: ['',[Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      lastName: ['',[Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      age: ['',[Validators.required, Validators.min(16), Validators.max(60)]],
      email: ['', [Validators.required, Validators.email]],
      courseName: ['', [Validators.required]],
      password:['', [Validators.required, Validators.minLength(5),Validators.maxLength(15)]],
      confPassword:['', [Validators.required]]
  
  
    })
  }

  ngOnInit(){
    this.getUsersdata();
   this.userDataadd();
  
  }

  submitForm():void{
    console.log(this.CrudForm.value);
    
    const user = {
      firstName: this.CrudForm.value.firstName,
      lastName: this.CrudForm.value.lastName,
      age: this.CrudForm.value.age,
      email: this.CrudForm.value.email,
      courseName: this.CrudForm.value.courseName,
      password:this.CrudForm.value.password,
      confPassword:this.CrudForm.value.confPassword
    }

     // Send a POST request to add the new user to the database
     this._registerService.addUserdata(user).subscribe((result)=>{
        // alert("Item Add Successfully")
        this.CrudForm.reset();
     })
    this.getUsersdata();
   
  }

  Oncancel(){
    this.CrudForm.reset();
  }

  // To get short version for error 
  get f(){
    return this.CrudForm.controls;
  }

  // To get Data From Users Via Services 

  getUsersdata(){
    this._registerService.getUserdata().subscribe((res=>{
      this.regcourse=res
      console.log(this.regcourse);
    }));
  }

  // To Add Data From Form 
  
  userDataadd(){
   


    // this._registerService.addUserdata(this.addNewdata).subscribe((result)=>{
    //   alert("Data Add successfully");
    //   this.addNewdata.push(result);
    //   this.CrudForm.reset();
    //   this.getUsersdata();
      
    // })  
  }

  edit(userId:number){
    alert(userId)
  }

  delete(userId:number){
    this._registerService.deleteUser(userId).subscribe((res)=>{
      this.getUsersdata();
    })
  }

}
