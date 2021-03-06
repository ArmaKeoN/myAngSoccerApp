soccerApp.controller('TeamCtrl', function ($scope, $route, SoccerFactory, $timeout, $log) {
    
    $scope.getTeams = function() {
        $scope.teams = [];
        SoccerFactory.getTeams()
        .success(function (data) {
            for (var team in data) {
                if (data[team].isTeam) {
                    $scope.teams.push(
                        {
                            Id: team,
                            Name: data[team].Name
                        });
                };
            }
        })
            .error(function (error) {
                $log.error('Error: ' + error.message);
            });
    };
    
    $scope.getTeams();

    $scope.getTeam = function (id) {
        SoccerFactory.getTeam(id)
        .success(function (data) {
            $scope.teamEditId = id;
            $scope.teamEditName = data.Name;
        })
            .error(function (error) {
                $log.error('Error: ' + error.message);
            });
    };

    $scope.addTeam = function () {
        var newTeam = {
            Name: $scope.teamName,
            isTeam: true
        };
        SoccerFactory.postTeam(newTeam)
            .success(function (status) {
                $log.log(status);
            })
            .error(function (error) {
                $log.error('Error: ' + error.message);
            });
        $timeout(function () { $scope.getTeams() }, 500);
    };

    $scope.editTeam = function () {
        var id = $scope.teamEditId;
        var editedTeam = {
            Name: $scope.teamEditName,
            isTeam: true
        };
        SoccerFactory.putTeam(id, editedTeam)
          .success(function (status) {
              $log.log(status);
          })
          .error(function (error) {
              $log.error('Error: ' + error.message);
          });
        $timeout(function () { $scope.getTeams() }, 500);
    };

    $scope.removeTeam = function (id) {
        SoccerFactory.deleteTeam(id)
        .success(function (status) {
            $log.log(status);
        })
        .error(function (error) {
            $log.error('Error: ' + error.message);
        });
        $timeout(function () { $scope.getTeams() }, 1000);
    };
});

