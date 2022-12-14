import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder,FormGroup,Validators} from '@angular/forms';
import { UserModel } from './user.model';



@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  formValue !: FormGroup;
  userModelObj : UserModel = new UserModel;
  users: any;
  closeResult = '';
  localUsers :any =[]

  constructor(private http :HttpClient , private modal : NgbModal ,private formBuilder : FormBuilder) { }
  
  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      name :['',Validators.required],
      work : ['',Validators.required],
      email : ['',Validators.required],
      yob :['', Validators.required],
      address :['',Validators.required],
      city :['',Validators.required]
    })
  }

async getUserData(){
  const res:any = await this.http.get('../../assets/userData.json')
  .toPromise();
  console.log(res)
  this.users = res;
}



open(content:any) {
  this.modal.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
    (result) => {
      this.closeResult = `Closed with: ${result}`;
      this.onUserUpdate();
      
    },
    (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    },
  );
}

private getDismissReason(reason: any): string {
  if (reason === ModalDismissReasons.ESC) {
    return 'by pressing ESC';
  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    return 'by clicking on a backdrop';
  } else {
    return `with: ${reason}`;
  }

}

onEdit(user:any){
console.log('on edit clicked')
this.userModelObj.id = user.id;
this.formValue.controls['name'].setValue(user.name);
this.formValue.controls['work'].setValue(user.work);
this.formValue.controls['email'].setValue(user.email);
this.formValue.controls['yob'].setValue(user.yob);
this.formValue.controls['address'].setValue(user.address);
this.formValue.controls['city'].setValue(user.city);
}

onUserUpdate(){
console.log("user Update")
this.userModelObj.name = this.formValue.value.name;
this.userModelObj.work = this.formValue.value.work;
this.userModelObj.email = this.formValue.value.email;
this.userModelObj.yob = this.formValue.value.yob;
this.userModelObj.address = this.formValue.value.address;
this.userModelObj.city = this.formValue.value.city;

console.log("this.userModelObj",this.userModelObj)
this.localUsers= this.users;


for (var i = 0; i < this.localUsers.length; i++) {
  if(this.userModelObj.id === this.localUsers[i].id){  
    this.localUsers[i].name = this.userModelObj.name
    this.localUsers[i].work = this.userModelObj.work
    this.localUsers[i].email = this.userModelObj.email
    this.localUsers[i].yob = this.userModelObj.yob
    this.localUsers[i].address = this.userModelObj.address
    this.localUsers[i].city = this.userModelObj.city
      break;
 }
}
 this.users = this.localUsers;
}



}