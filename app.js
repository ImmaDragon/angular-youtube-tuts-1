Parties = new Mongo.Collection("parties");

if (Meteor.isClient) {
  angular.module('socially', ['angular-meteor']);

  angular.module('socially').controller('PartiesListCtrl', ['$scope', '$meteor',
    function ($scope, $meteor) {
        $scope.parties = $meteor.collection(Parties, false);
//remove logic to the controller
        $scope.remove = function(party){
            $scope.parties.remove(party); //remove
        };

        $scope.removeAll = function(){
            $scope.parties.remove();
        };
  }]);
}


// This line declares a new $scope.parties variable
// (so we don't need to do something like $scope.parties = []; )
// and then binds it to the Parties Mongo collection.




if (Meteor.isServer) {
  Meteor.startup(function () {
    if (Parties.find().count() === 0) {
      var parties = [
        {'name': 'Dubstep-Free Zone',
          'description': 'Fast just got faster with Nexus S.'},
        {'name': 'All dubstep all the time',
          'description': 'Get it on!'},
        {'name': 'Savage lounging',
          'description': 'Leisure suit required. And only fiercest manners.'}
      ];
      for (var i = 0; i < parties.length; i++)
        Parties.insert(parties[i]);
    }
  });
}