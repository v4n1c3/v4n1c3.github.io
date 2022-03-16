var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var PixiVisualizer = /** @class */ (function (_super) {
    __extends(PixiVisualizer, _super);
    function PixiVisualizer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.canvasWidth = 640;
        _this.canvasHeight = 640;
        _this.isPointerDown = false;
        _this.lastX = -1;
        _this.lastY = -1;
        return _this;
    }
    PixiVisualizer.prototype.clamp = function (num, min, max) {
        return Math.min(Math.max(num, min), max);
    };
    PixiVisualizer.prototype.invokeOnCellClick = function (e) {
        var _a = e.data.global, x = _a.x, y = _a.y;
        x = Math.floor(this.clamp(x, 0, this.canvasWidth - 1) / this.cellWidth);
        y = Math.floor(this.clamp(y, 0, this.canvasHeight - 1) / this.cellHeight);
        if (x != this.lastX || y != this.lastY) {
            this.dotnet.invokeMethodAsync("OnCellClick", y, x);
            this.lastX = x;
            this.lastY = y;
        }
    };
    PixiVisualizer.prototype.resizeGrid = function (rows, columns) {
        this.rows = rows;
        this.columns = columns;
        this.cellWidth = this.canvasWidth / this.columns;
        this.cellHeight = this.canvasHeight / this.rows;
        var stage = this.app.stage;
        for (var i = stage.children.length - 1; i >= 0; i--) {
            stage.removeChild(stage.children[i]);
        }
        this.spriteGrid = new Array(this.rows * this.columns);
        for (var column = 0; column < this.columns; ++column) {
            for (var row = 0; row < this.rows; row++) {
                var child = new PIXI.Sprite(PIXI.Texture.WHITE);
                child.anchor.set(0, 0);
                child.width = this.cellWidth - 1;
                child.height = this.cellHeight - 1;
                child.x = column * this.cellWidth;
                child.y = row * this.cellHeight;
                child.tint = 0x0;
                child.interactive = false;
                this.spriteGrid[row * this.columns + column] = child;
                stage.addChild(child);
            }
        }
    };
    PixiVisualizer.prototype.mount = function (mountPoint) {
        var _this = this;
        this.cellWidth = this.canvasWidth / this.columns;
        this.cellHeight = this.canvasHeight / this.rows;
        this.app = new PIXI.Application({
            width: this.canvasWidth,
            height: this.canvasHeight,
            backgroundColor: 0xcecece,
            antialias: true,
        });
        var stage = this.app.stage;
        if (this.interactive) {
            var that_1 = this;
            stage.interactive = true;
            stage.on("pointerdown", function (e) {
                that_1.isPointerDown = true;
                that_1.invokeOnCellClick(e);
            });
            stage.on("pointerup", function (e) {
                that_1.isPointerDown = false;
            });
            stage.on("pointermove", function (e) {
                if (that_1.isPointerDown) {
                    that_1.invokeOnCellClick(e);
                }
            });
        }
        this.spriteGrid = new Array(this.rows * this.columns);
        for (var column = 0; column < this.columns; ++column) {
            for (var row = 0; row < this.rows; row++) {
                var child = new PIXI.Sprite(PIXI.Texture.WHITE);
                child.anchor.set(0, 0);
                child.width = this.cellWidth - 1;
                child.height = this.cellHeight - 1;
                child.x = column * this.cellWidth;
                child.y = row * this.cellHeight;
                child.tint = 0x0;
                child.interactive = false;
                this.spriteGrid[row * this.columns + column] = child;
                stage.addChild(child);
            }
        }
        document.getElementById(mountPoint).appendChild(this.app.view);
        window.onresize = function () { return _this.resize(_this.app); };
        this.resize(this.app);
    };
    PixiVisualizer.prototype.resize = function (app) {
        var parent = app.view.parentNode;
        this.canvasWidth = parent.clientWidth;
        this.canvasHeight = parent.clientHeight;
        app.renderer.resize(this.canvasWidth, this.canvasHeight);
        this.cellWidth = this.canvasWidth / this.columns;
        this.cellHeight = this.canvasHeight / this.rows;
        for (var column = 0; column < this.columns; ++column) {
            for (var row = 0; row < this.rows; row++) {
                var child = this.spriteGrid[row * this.columns + column];
                child.width = this.cellWidth - 1;
                child.height = this.cellHeight - 1;
                child.x = column * this.cellWidth;
                child.y = row * this.cellHeight;
            }
        }
    };
    PixiVisualizer.prototype.render = function (grid) {
        for (var index = 0; index < grid.length; index++) {
            this.spriteGrid[index].tint = this.stateColorMap[grid[index]];
        }
    };
    PixiVisualizer.prototype.clear = function () {
    };
    PixiVisualizer.prototype.destroy = function () {
        this.app.destroy();
        window.onresize = null;
    };
    return PixiVisualizer;
}(GameVisualizer));
var Visualizer = new PixiVisualizer();
