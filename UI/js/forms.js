// Login Form

const login = $(function () {
    const button = $('#loginButton');
    const box = $('#loginBox');
    const form = $('#loginForm');
    button.removeAttr('href');
    button.mouseup(function () {
        box.toggle();
        button.toggleClass('active');
    });
    form.mouseup(function () {
        return false;
    });
    $(this).mouseup(function (login) {
        if (!($(login.target).parent('#loginButton').length > 0)) {
            button.removeClass('active');
            box.hide();
        }
    });
});
newFunction();

function newFunction() {
    $(function () {
        const button = $('#signupButton');
        const box = $('#signupBox');
        const form = $('#signupForm');
        button.removeAttr('href');
        button.mouseup(function () {
            box.toggle();
            button.toggleClass('active');
        });
        form.mouseup(function () {
            return false;
        });
        $(this).mouseup(function (login) {
            if (!($(login.target).parent('#signupButton').length > 0)) {
                button.removeClass('active');
                box.hide();
            }
        });
    });
}