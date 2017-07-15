'use strict';

export default class AdminController {
  $http;
  /*@ngInject*/
  constructor(User,$http) {
  	this.$http = $http;
    // Use the User $resource to fetch all users
    this.users = User.query();
  }

  delete(user) {
    user.$remove();
    this.users.splice(this.users.indexOf(user), 1);
  }


  mkadmin(user){

  	console.log("-----mkadm------",user);
    this.$http.put(`/api/users/mkadm/${user._id}`).then((res)=> console.log(res));
    console.log("\nadmin\n");
  }
}
