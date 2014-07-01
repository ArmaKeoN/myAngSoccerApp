soccerApp.factory("SoccerFactory", function ($http) {

    var urlBase = 'https://soccerapp.firebaseio.com/';

    var factory = {};

    factory.getTeams = function () {
        return $http.get(urlBase + '.json');
    };

    factory.getTeam = function (id) {
        return $http.get(urlBase + id + '.json');
    };

    factory.postTeam = function (newTeam) {
        return $http.post(urlBase + '.json', newTeam);
    };

    factory.putTeam = function (id, editedTeam) {
        return $http.put(urlBase + id + '.json', editedTeam);
    };

    factory.deleteTeam = function (id) {
        return $http.delete(urlBase + id + '.json');
    };

    factory.getGames = function () {
        return $http.get(urlBase + '.json');
    };

    factory.getGame = function (id) {
        return $http.get(urlBase + id + '.json');
    };

    factory.postGame = function (newGame) {
        return $http.post(urlBase + '.json', newGame);
    };

    factory.putGame = function (id, editedGame) {
        return $http.put(urlBase + id + '.json', editedGame);
    };

    factory.deleteGame = function (id) {
        return $http.delete(urlBase + id + '.json');
    };
    return factory;

});