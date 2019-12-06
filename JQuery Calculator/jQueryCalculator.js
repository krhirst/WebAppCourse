let value;
let counter = 0;

$(function () {
    $("#addButton").click(function () {
        calculate("+");
    });

    $("#subtractButton").click(function () {
        calculate("-");
    });

    $("#resetButton").click(function () {
        resetCounter();
    })
});

function calculate(operator) {
    let oldCounter = counter;
    value = parseInt($("#dropdown").val());
    let negatives = $("input[name='negatives']:checked").val();

    if (negatives === "n" && counter < 0) {
        resetCounter();
    } else {
        if (operator === "+") {
            counter += value;
            displayCalculation(oldCounter, operator);
        } else if (operator === "-") {
            if (negatives === "n") {
                if (counter - value < 0) {
                    alert("can't have negatives");
                } else if (counter - value == 0) {
                    counter -= value;
                    displayCalculation(oldCounter, operator);
                } else {
                    counter -= value;
                    displayCalculation(oldCounter, operator);
                }
            } else {
                counter -= value;
                displayCalculation(oldCounter, operator);
            }
        }

    }
    displayCounter();
}

function displayCalculation(oldCounter, operator) {
    let string = `${oldCounter} ${operator} ${value} = ${counter}`;
    $("#calculations").removeClass("d-none").addClass("d-inline").text(string);
    if (counter > 0) {
        $("#calculations").css('background-color', 'blue');
    } else if (counter < 0) {
        $("#calculations").css('background-color', 'red');
    } else {
        $("#calculations").css('background-color', 'gold');
    }
}

function displayCounter() {
    $("#counter").text(counter);
    if (counter > 0) {
        $("#counter").css('background-color', 'blue');
    } else if (counter < 0) {
        $("#counter").css('background-color', 'red');
    } else {
        $("#counter").css('background-color', 'gold');
    }
}

function resetCounter() {
    counter = 0;
    displayCounter();
    $("#calculations").css('background-color', 'gold');
    $("#calculations").removeClass("d-inline").addClass("d-none");
}
