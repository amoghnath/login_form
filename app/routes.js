module.exports = (app, passport) => {

    app.get("/", (req, res) => {
        res.render("index.ejs");
    });

    app.get("/profile", loginAuth, (req, res) => {
        res.render("profile.ejs", {
            user: req.user,
        });
    });

    app.get("/logout", (req, res) => {
        req.logout();
        res.redirect("/");
    });

    app.get("/login", (req, res) => {
        res.render("login.ejs", { message: req.flash("loginMessage") });
    });

    app.post(
        "/login",
        passport.authenticate("local-login", {
            successRedirect: "/profile",
            failureRedirect: "/login",
            failureFlash: true,
        })
    );

    app.get("/signup", (req, res) => {
        res.render("signup.ejs", { message: req.flash("loginMessage") });
    });

    app.post(
        "/signup",
        passport.authenticate("local-signup", {
            successRedirect: "/",
            failureRedirect: "/signup",
            failureFlash: true,
        })
    );

    //facebook

    app.get("/auth/facebook", passport.authenticate("facebook", { scope: "email" }));
    app.get(
        "/auth/facebook/callback",
        passport.authenticate("facebook", {
            successRedirect: "/profile",
            failureRedirect: "/",
        })
    );

    app.get("/connect/facebook", passport.authorize("facebook", { scope: "email" }));
    app.get(
        "/connect/facebook/callback",
        passport.authorize("facebook", {
            successRedirect: "/profile",
            failureRedirect: "/",
        })
    );

    // twitter

    app.get("/auth/twitter", passport.authenticate("twitter", { scope: "email" }));
    app.get(
        "/auth/twitter/callback",
        passport.authenticate("twitter", {
            successRedirect: "/profile",
            failureRedirect: "/",
        })
    );

    app.get("/connect/twitter", passport.authorize("twitter", { scope: "email" }));
    app.get(
        "/connect/twitter/callback",
        passport.authorize("twitter", {
            successRedirect: "/profile",
            failureRedirect: "/",
        })
    );

    // google

    app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));
    app.get(
        "/auth/google/callback",
        passport.authenticate("google", {
            successRedirect: "/profile",
            failureRedirect: "/",
        })
    );

    app.get("/connect/google", passport.authorize("google", { scope: ["profile", "email"] }));
    app.get(
        "/connect/google/callback",
        passport.authorize("google", {
            successRedirect: "/profile",
            failureRedirect: "/",
        })
    );

    app.get("/connect/local", (req, res) => {
        res.render("connect-local.ejs", { message: req.flash("loginMessage") });
    });
    
    app.post(
        "/connect/local",
        passport.authenticate("local-signup", {
            successRedirect: "/profile",
            failureRedirect: "/connect/local",
            failureFlash: true,
        })
    );
};

const loginAuth = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    res.redirect("/");
};
