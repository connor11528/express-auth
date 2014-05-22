'use strict';

app.service('Auth', ['$http', '$q', function ($http, $q){
	var current_user;

	return {
		signIn: function(){
			// check password on server, get user data
		},
		signOut: function(){
			// clear current_user data, unset logged in status
		},
		isSignedIn: function(){
			// logic to check if current user has signed in
		},
		currentUser: function(){
			// return the current_user object
			// handle if user's not signed in
		}
	};
}])