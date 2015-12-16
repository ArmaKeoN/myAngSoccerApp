soccerApp.controller('ScheduleCtrl', function ($scope, $route, SoccerFactory, $log) {

    var schedules = [];

    $scope.getTeams= function() {
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
            console.log('Error: ' + error.message);
        });
    };

    $scope.getTeams();

    $scope.getSchedules = function() {
        SoccerFactory.getGames()
        .success(function (data) {
            for (var schedule in data) {
                if (data[schedule].isGame) {
                    schedules.push(
                    {
                        title: data[schedule].Team1 + ' vs ' + data[schedule].Team2,
                        start: data[schedule].GameDate,
                        editable: false
                    });
                }
            }
//            $log.log(schedules);
            intCalendar();
        })
        .error(function (error) {
            console.log('Error: ' + error.message);
        });
    };
    
    $scope.getSchedules();

    $scope.getTeamSchedule = function (teamName) {
        $scope.schedules = [];
        SoccerFactory.getGames()
        .success(function (data) {
            for (var schedule in data) {
                if (data[schedule].isGame && (data[schedule].Team1 == teamName || data[schedule].Team2 == teamName)) {
                    $scope.schedules.push(
                    {
                        title: data[schedule].Team1 + ' vs ' + data[schedule].Team2,
                        start: moment(data[schedule].GameDate).format('YYYY-MM-DD hh:mm A')
                    });
                }
            }
//            $log.log($scope.schedules);
        })
        .error(function (error) {
            console.log('Error: ' + error.message);
        });
    };

    function intCalendar() {
        $('#calendar').fullCalendar({
            aspectRatio: 2,
            header: {
                left: 'prev, next, today',
                center: 'title',
                right: 'month, agendaWeek, agendaDay'
            },
            defaultDate: Date.now(),
            events: schedules
        });
    };

});