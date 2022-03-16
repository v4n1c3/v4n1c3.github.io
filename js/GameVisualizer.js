var GameVisualizer = /** @class */ (function () {
    function GameVisualizer() {
    }
    GameVisualizer.prototype.setup = function (dotnetReference, mountPoint, interactive, rows, columns, stateColorMap) {
        this.dotnet = dotnetReference;
        this.interactive = interactive;
        this.rows = rows;
        this.columns = columns;
        this.stateColorMap = stateColorMap;
        this.mount(mountPoint);
    };
    return GameVisualizer;
}());
