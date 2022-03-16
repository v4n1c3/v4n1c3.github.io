
const tourDriver = new Driver({
    animate: true,
    opacity: 0.0,
    padding: 16,
    showButtons: true,
    doneBtnText: "✓"
});

let _tourSteps = [];

let _previousBtnText = "previousBtnText";
let _nextBtnText = "nextBtnText";
let _closeBtnText = "closeBtnText";

function SetupDriver(buttonText)
{
    _previousBtnText = buttonText.previous;
    _nextBtnText = buttonText.next;
    _closeBtnText = buttonText.close;
    tourDriver.options.doneBtnText = buttonText.done;
}

function RegisterTourStep(element, title, description, position)
{
    _tourSteps.push({
        element: "#" + element,
        popover: {
            className: "scoped-driver-popover",
            title: title,
            description: description,
            position: position,
            prevBtnText: _previousBtnText,
            nextBtnText: _nextBtnText,
            closeBtnText: _closeBtnText
        }
    });
}

function ResetTour()
{
    _tourSteps = [];
}

function ResetDriver()
{
    tourDriver.reset();
}

function StartTour()
{
    if(_tourSteps.length > 0) {
        setTimeout(() => {
            tourDriver.defineSteps(_tourSteps);
            tourDriver.start();
        }, 1);
    }
    else
    {
        console.debug("Cannot start Tour. No steps defined");
    }
}