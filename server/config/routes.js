module.exports = function(app){

    app.get("/partials/*", function(req, res){
        console.log('Partials Route Requests : (' + req.method + ') ' + req.url);
        res.render('../../public/app/' + req.params[0]);
    });

    app.get('*', function(req, res){
        console.log('Default Route Requests : (' + req.method + ') ' + req.url);
        res.render('index');
    });
};