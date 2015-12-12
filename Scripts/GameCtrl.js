soccerApp.controller('GameCtrl', function ($scope, $route, SoccerFactory, $log, $timeout) {

    Date.parseDate = function (input, format) {
        return moment(input, format).toDate();
    };

    Date.prototype.dateFormat = function (format) {
        return moment(this).format(format);
    };

    var initDTPAddGame = function () {
        jQuery('#datetimepicker1').datetimepicker({
            format: 'YYYY-MM-DD HH:mm',
            formatTime: 'HH:mm',
            formatDate: 'YYYY-MM-DD'
        });
    };

    var initDTPEditGame = function () {
        jQuery('#datetimepicker2').datetimepicker({
            format: 'YYYY-MM-DD HH:mm',
            formatTime: 'HH:mm',
            formatDate: 'YYYY-MM-DD'
        });
    };

    $scope.getGames = function () {
        $scope.games = [];
        SoccerFactory.getGames()
        .success(function (data) {
            for (var game in data) {
                if (data[game].isGame) {
                    $scope.games.push(
                    {
                        Id: game,
                        Team1: data[game].Team1,
                        Team2: data[game].Team2,
                        GameDate: data[game].GameDate
                    });
                }
            }
        })
        .error(function (error) {
                $log.error('Error: ' + error.message);
        });
    };

    $scope.getGames();

    $scope.getGame = function (id) {
        initDTPEditGame();
        $scope.teamSelection = [];
        SoccerFactory.getTeams()
                .success(function (data) {
                    for (var team in data) {
                        if (data[team].isTeam) {
                            $scope.teamSelection.push(
                                {
                                    Id: team,
                                    Name: data[team].Name
                                });
                        }
                    }
                })
                    .error(function (error) {
                        $log.log('Error: ' + error.message);
                    });
        SoccerFactory.getGame(id)
        .success(function (data) {
            $scope.gameEdit = data;
            $scope.gameEditId = id;
        })
            .error(function (error) {
                $log.error('Error: ' + error.message);
            });
    };

    $scope.getTeams = function () {
        initDTPAddGame();
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
                }
            }
        })
            .error(function (error) {
                $log.error('Error: ' + error.message);
            });
    };

    $scope.addGame = function () {
        var newGame = {
            Team1: $scope.team1,
            Team2: $scope.team2,
            GameDate: $scope.gameDate,
            isGame: true
        };

        SoccerFactory.postGame(newGame)
            .success(function (status) {
                $log.info(status);
            })
            .error(function (error) {
                $log.error('Error: ' + error.message);
            });
        $timeout(function () { getGames() }, 500);
    };

    $scope.editGame = function () {
        var id = $scope.gameEditId;
        var editedGame = {};
        editedGame = {
            Team1: $scope.gameTeamOneEdit,
            Team2: $scope.gameTeamTwoEdit,
            GameDate: $scope.gameDateEdit,
            isGame: true
        };
        SoccerFactory.putGame(id, editedGame)
          .success(function () {
              $log.info(status);
          })
          .error(function (error) {
              $log.error('Error: ' + error.message);
          });
        $timeout(function () { getGames() }, 500);
    };

    $scope.removeGame = function (id) {
        SoccerFactory.deleteGame(id)
        .success(function (status) {
            $log.info(status);
        })
        .error(function (error) {
            $log.error('Error: ' + error.message);
        });
        $timeout(function () { getGames() }, 500);
    };
});