$(function () {
    $("#mainButton").click(function () {
        $("#mainButton").addClass("onclic", 250, validate);
    });

    function validate() {
        setTimeout(function () {
            $("#mainButton").removeClass("onclic");
            $("#mainButton").addClass("validate", 450, callback);
        }, 2250);
    }

    function callback() {
        setTimeout(function () {
            $("#mainButton").removeClass("validate");
        }, 1250);
    }
});