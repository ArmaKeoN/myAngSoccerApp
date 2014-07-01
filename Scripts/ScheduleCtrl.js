soccerApp.controller('ScheduleCtrl', function ($scope, $route, SoccerFactory) {

    var schedules = [];

    getTeams();

    function getTeams() {
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

    getSchedules();

    function getSchedules() {
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
            intCalendar();
        })
            .error(function (error) {
                console.log('Error: ' + error.message);
            });
    };

    $scope.getTeamSchedule = function (teamName) {
        $scope.schedules = [];
        SoccerFactory.getGames()
        .success(function (data) {
            for (var schedule in data) {
                if (data[schedule].isGame && (data[schedule].Team1 == teamName || data[schedule].Team2 == teamName)) {
                    $scope.schedules.push(
                        {
                            title: data[schedule].Team1 + ' vs ' + data[schedule].Team2,
                            start: data[schedule].GameDate
                        });
                }
            }
        })
            .error(function (error) {
                console.log('Error: ' + error.message);
            });
    };

    function intCalendar() {
        $('#calendar').fullCalendar({
            aspectRatio: 1.9,
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