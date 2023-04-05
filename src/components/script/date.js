exports.getCurrentDate = async () => {
    var actualDate = new Date();
    actualDate.setHours(actualDate.getHours() + (-(actualDate.getTimezoneOffset() / 60)));
    var actualDateHours = actualDate.toISOString();

    return actualDateHours
}